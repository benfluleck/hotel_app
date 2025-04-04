import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Hotel } from 'src/domain/hotel/entities/hotel.entity';
import { RoomType } from 'src/domain/room-type/entities/room-type.entity';
import { RoomResponseDto } from './dto/room-response.dto';

@Injectable()
export class RoomService {
  @InjectRepository(Room)
  private readonly roomsRepository!: Repository<Room>;
  constructor(private readonly entityManager: EntityManager) {}

  async create(
    createRoomDto: CreateRoomDto,
  ): Promise<RoomResponseDto | undefined> {
    const response = await this.entityManager
      .transaction(async (transactionalEntityManager) => {
        const room = new Room(createRoomDto);
        const hotel = await transactionalEntityManager.findOneBy(Hotel, {
          id: createRoomDto.hotelId,
        });

        if (!hotel) {
          return undefined;
        }

        const roomType = await transactionalEntityManager.findOneBy(RoomType, {
          id: createRoomDto.roomTypeId,
        });

        if (!roomType) {
          return undefined;
        }

        room.roomType = roomType;
        room.hotel = hotel;

        const savedRoom = await transactionalEntityManager.save(Room, room);

        roomType.rooms = [savedRoom];
        await transactionalEntityManager.save(roomType);

        hotel.rooms = [savedRoom];
        await transactionalEntityManager.save(hotel);

        return {
          id: savedRoom.id,
          isAvailable: savedRoom.isAvailable,
          roomNumber: savedRoom.roomNumber,
        };
      })
      .catch(() => {
        return undefined;
      });

    return response;
  }

  async findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  async findOne(id: string): Promise<Room | null> {
    return this.roomsRepository.findOneBy({ id });
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomsRepository.findOneByOrFail({ id });

    Object.assign(room, updateRoomDto);
    return this.entityManager.save(Room, room);
  }

  async remove(id: string) {
    await this.roomsRepository.delete({ id });
  }
}
