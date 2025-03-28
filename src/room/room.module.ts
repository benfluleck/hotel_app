import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Hotel } from 'src/hotel/entities/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Hotel])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
