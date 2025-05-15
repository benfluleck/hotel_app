import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { EntityManager, Repository } from 'typeorm';
import { Hotel } from '../hotel/entities/hotel.entity';
import { DOMAIN_ENTITIES } from 'src/common/constants/entities';
import { ERROR_CODES } from 'src/common/component-entities/error-context';
import { RoomTypeResponseDto } from './dto/room-type-response.dto';

@Injectable()
export class RoomTypeService {
  @InjectRepository(RoomType)
  private readonly roomTypeRepository!: Repository<RoomType>;

  constructor(private readonly entityManager: EntityManager) {}

  async create(
    createRoomTypeDto: CreateRoomTypeDto,
  ): Promise<RoomTypeResponseDto> {
    const response = await this.entityManager
      .transaction(async (transactionalEntityManager) => {
        const roomType = new RoomType(createRoomTypeDto);

        const hotel = await transactionalEntityManager.findOne(Hotel, {
          where: { id: createRoomTypeDto.hotelId },
          relations: ['roomTypes'],
        });

        if (!hotel) {
          throw new HttpException(
            `${DOMAIN_ENTITIES.HOTEL} ${ERROR_CODES.NOT_FOUND}`,
            HttpStatus.NOT_FOUND,
          );
        }

        roomType.hotel = hotel;

        const savedRoomType = await transactionalEntityManager.save(
          RoomType,
          roomType,
        );

        return {
          id: savedRoomType.id,
          name: savedRoomType.name,
          description: savedRoomType.description,
          pricePerNight: savedRoomType.pricePerNight,
        };
      })
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : ERROR_CODES.BAD_REQUEST;
        throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
      });

    return response;
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
