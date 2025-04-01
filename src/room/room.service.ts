import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { ContextWrapper } from 'src/common/context-wrapper';
import { ERROR_CODES } from 'src/common/component-entities/error-context';
import { RoomType } from 'src/room-type/entities/room-type.entity';

@Injectable()
export class RoomService {
  @InjectRepository(Room)
  private readonly roomsRepository!: Repository<Room>;
  @InjectRepository(RoomType)
  private readonly roomTypeRepository!: Repository<RoomType>;
  @InjectRepository(Hotel)
  private readonly hotelRepository!: Repository<Hotel>;
  constructor(private readonly entityManager: EntityManager) {}

  async create(
    createRoomDto: CreateRoomDto,
  ): Promise<ContextWrapper<Partial<Room>>> {
    const room = new Room(createRoomDto);

    const hotel = await this.hotelRepository.findOneBy({
      id: createRoomDto.hotelId,
    });

    if (!hotel) {
      return new ContextWrapper<Room>(undefined, {
        code: ERROR_CODES.NOT_FOUND,
        ids: { hotelId: createRoomDto.hotelId },
      });
    }

    const roomType = await this.roomTypeRepository.findOneBy({
      id: createRoomDto.roomTypeId,
    });

    if (!roomType) {
      return new ContextWrapper<RoomType>(undefined, {
        code: ERROR_CODES.NOT_FOUND,
        ids: { roomTypeId: createRoomDto.roomTypeId },
      });
    }

    roomType.rooms = [room];
    await this.roomTypeRepository.save(roomType);

    hotel.rooms = [room];
    await this.hotelRepository.save(hotel);

    const savedRoom = await this.entityManager.save(Room, room);

    return new ContextWrapper<Partial<Room>>(
      {
        id: savedRoom.id,
        isAvailable: savedRoom.isAvailable,
        roomNumber: savedRoom.roomNumber,
      },
      undefined,
    );
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
