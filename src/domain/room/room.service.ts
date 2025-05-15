import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Hotel } from '../hotel/entities/hotel.entity';
import { RoomType } from '../room-type/entities/room-type.entity';
import { RoomResponseDto } from './dto/room-response.dto';
import { ERROR_CODES } from '../../common/component-entities/error-context';
import { DOMAIN_ENTITIES } from '../../common/constants/entities';

@Injectable()
export class RoomService {
  @InjectRepository(Room)
  private readonly roomsRepository!: Repository<Room>;
  constructor(private readonly entityManager: EntityManager) {}

  async create(createRoomDto: CreateRoomDto): Promise<RoomResponseDto> {
    const response = await this.entityManager
      .transaction(async (transactionalEntityManager) => {
        const room = new Room(createRoomDto);
        const hotel = await transactionalEntityManager.findOne(Hotel, {
          where: { id: createRoomDto.hotelId },
          relations: ['rooms'],
        });

        if (!hotel) {
          throw new HttpException(
            `${DOMAIN_ENTITIES.HOTEL} ${ERROR_CODES.NOT_FOUND}`,
            HttpStatus.NOT_FOUND,
          );
        }

        const roomType = await transactionalEntityManager.findOne(RoomType, {
          where: { id: createRoomDto.roomTypeId },
          relations: ['rooms'],
        });

        if (!roomType) {
          throw new HttpException(
            `${DOMAIN_ENTITIES.ROOM_TYPE} ${ERROR_CODES.NOT_FOUND}`,
            HttpStatus.NOT_FOUND,
          );
        }

        room.roomType = roomType;
        room.hotel = hotel;

        const savedRoom = await transactionalEntityManager.save(Room, room);

        roomType.rooms = [...roomType.rooms, savedRoom];
        await transactionalEntityManager.save(roomType);

        hotel.rooms = [...hotel.rooms, savedRoom];
        await transactionalEntityManager.save(hotel);

        return {
          id: savedRoom.id,
          isAvailable: savedRoom.isAvailable,
          roomNumber: savedRoom.roomNumber,
        };
      })
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : ERROR_CODES.BAD_REQUEST;
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      });

    return response;
  }

  async findAll(hotelId: string): Promise<Room[]> {
    const hotel = await this.entityManager.findOneByOrFail(Hotel, {
      id: hotelId,
    });

    if (!hotel) {
      throw new HttpException(
        `${DOMAIN_ENTITIES.HOTEL} ${ERROR_CODES.NOT_FOUND}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.roomsRepository.find({
      relations: {
        hotel: true,
      },
      where: {
        hotel: { id: hotelId },
      },
    });
  }

  async findOne(id: string): Promise<Room | null> {
    const room = await this.roomsRepository.findOneBy({ id });

    if (!room) {
      throw new HttpException(
        `${DOMAIN_ENTITIES.ROOM} ${ERROR_CODES.NOT_FOUND}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomsRepository.findOneByOrFail({ id });

    Object.assign(room, updateRoomDto);
    return this.entityManager.save(Room, room);
  }

  async remove(id: string): Promise<{ message: string; statusCode: number }> {
    const response = await this.roomsRepository.delete({ id });

    if (response.affected === 0) {
      throw new HttpException(
        `${DOMAIN_ENTITIES.ROOM} ${ERROR_CODES.NOT_FOUND}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: `${DOMAIN_ENTITIES.ROOM} deleted successfully`,
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
