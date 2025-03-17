import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { EntityManager, Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HotelService {
  @InjectRepository(Hotel)
  private readonly hotelsRepository: Repository<Hotel>;

  constructor(private readonly entityManager: EntityManager) {}

  async create(createHotelDto: CreateHotelDto) {
    const hotel = new Hotel(createHotelDto);

    return this.entityManager.save(Hotel, hotel);
  }

  async findAll() {
    return this.hotelsRepository.find();
  }

  async findOne(id: string) {
    return this.hotelsRepository.findOneBy({ id });
  }

  async update(id: string, updateHotelDto: UpdateHotelDto) {
    const hotel = await this.hotelsRepository.findOneByOrFail({ id });

    Object.assign(hotel, updateHotelDto);
    return this.entityManager.save(Hotel, hotel);
  }

  remove(id: string) {
    return this.hotelsRepository.delete({ id });
  }
}
