import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class BookingService {
  @InjectRepository(Booking)
  private readonly bookingRepository!: Repository<Booking>;

  constructor(private readonly entityManager: EntityManager) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const booking = new Booking(createBookingDto);
    return this.entityManager.save(Booking, booking);
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
