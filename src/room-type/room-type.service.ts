import { Injectable } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class RoomTypeService {
  @InjectRepository(RoomType)
  private readonly roomTypeRepository!: Repository<RoomType>;

  constructor(private readonly entityManager: EntityManager) {}

  async create(createRoomTypeDto: CreateRoomTypeDto): Promise<RoomType> {
    const roomType = new RoomType(createRoomTypeDto);
    return this.entityManager.save(RoomType, roomType);
  }

  async findAll(): Promise<RoomType[]> {
    return this.roomTypeRepository.find();
  }

  async findOne(id: string): Promise<RoomType | null> {
    return this.roomTypeRepository.findOneBy({ id });
  }

  async balls(id: string): Promise<RoomType | null> {
    return this.roomTypeRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateRoomTypeDto: UpdateRoomTypeDto,
  ): Promise<RoomType> {
    const roomType = await this.roomTypeRepository.findOneByOrFail({ id });
    Object.assign(roomType, updateRoomTypeDto);
    return this.entityManager.save(RoomType, roomType);
  }

  async remove(id: string) {
    await this.roomTypeRepository.delete({ id });
  }
}
