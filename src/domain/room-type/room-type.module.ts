import { Module } from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { RoomTypeController } from './room-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomType } from './entities/room-type.entity';
import { Room } from '../room/entities/room.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Hotel } from '../hotel/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomType, Room, Booking, Hotel])],
  controllers: [RoomTypeController],
  providers: [RoomTypeService],
})
export class RoomTypeModule {}
