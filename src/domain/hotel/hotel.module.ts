import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './entities/hotel.entity';
import { Room } from '../room/entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Room])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
