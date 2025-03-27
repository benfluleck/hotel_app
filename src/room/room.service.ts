import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  @InjectRepository(Room)
  private readonly roomsRepository!: Repository<Room>;
  constructor(private readonly entityManager: EntityManager) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = new Room(createRoomDto);

    return this.entityManager.save(Room, room);
  }

  async findAll(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  async findOne(id: string): Promise<Room | null> {
    return this.roomsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    const room = await this.roomsRepository.findOneByOrFail({ id });

    Object.assign(room, updateRoomDto);
    return this.entityManager.save(Room, room);
  }

  async remove(id: string) {
    await this.roomsRepository.delete({ id });
  }
}
