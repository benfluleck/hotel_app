import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { EntityManager, Repository } from 'typeorm';
import { BookingResponseDto } from './dto/booking-response.dto';
import { DOMAIN_ENTITIES } from 'src/common/constants/entities';
import { ERROR_CODES } from 'src/common/component-entities/error-context';
import { Room } from '../room/entities/room.entity';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class BookingService {
  @InjectRepository(Booking)
  private readonly bookingRepository!: Repository<Booking>;

  constructor(private readonly entityManager: EntityManager) {}

  async create(
    createBookingDto: CreateBookingDto,
  ): Promise<BookingResponseDto> {
    const response = await this.entityManager
      .transaction(async (transactionalEntityManager) => {
        const booking = new Booking(createBookingDto);

        const room = await transactionalEntityManager.findOne(Room, {
          where: { id: createBookingDto.roomId },
          relations: ['bookings', 'hotel'],
        });

        if (!room) {
          throw new HttpException(
            `${DOMAIN_ENTITIES.ROOM} ${ERROR_CODES.NOT_FOUND}`,
            HttpStatus.NOT_FOUND,
          );
        }

        const hotelId = room.hotel.id;

        if (hotelId !== createBookingDto.hotelId) {
          throw new HttpException(
            `${DOMAIN_ENTITIES.HOTEL} DOES NOT MATCH THE ROOM SELECTED`,
            HttpStatus.NOT_FOUND,
          );
        }

        const customer = await transactionalEntityManager.findOne(Customer, {
          where: { id: createBookingDto.customerId },
          relations: ['bookings'],
        });

        if (!customer) {
          throw new HttpException(
            `${DOMAIN_ENTITIES.CUSTOMER} ${ERROR_CODES.NOT_FOUND}`,
            HttpStatus.NOT_FOUND,
          );
        }

        booking.customer = customer;
        booking.hotel = room.hotel;

        const savedBooking = await transactionalEntityManager.save(
          Booking,
          booking,
        );

        room.bookings = [...room.bookings, savedBooking];
        room.isAvailable = true;

        await transactionalEntityManager.save(room);
        customer.bookings = [...customer.bookings, savedBooking];
        await transactionalEntityManager.save(customer);

        return {
          id: savedBooking.id,
          customerId: savedBooking.customer.id,
          roomId: savedBooking.room.id,
          checkInDate: savedBooking.checkInDate,
          checkOutDate: savedBooking.checkOutDate,
          numberOfGuests: savedBooking.numberOfGuests,
          totalPrice: savedBooking.totalPrice,
          status: savedBooking.status,
        };
      })
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : ERROR_CODES.BAD_REQUEST;
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      });

    return response;
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  async findOne(id: string): Promise<Booking | null> {
    return this.bookingRepository.findOneBy({ id });
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingRepository.findOneByOrFail({ id });
    Object.assign(booking, updateBookingDto);
    return this.entityManager.save(Booking, booking);
  }

  async remove(id: string) {
    await this.bookingRepository.delete({ id });
  }
}
