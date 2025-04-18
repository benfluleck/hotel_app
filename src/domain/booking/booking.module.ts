import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Room } from 'src/domain/room/entities/room.entity';
import { Payment } from 'src/domain/payment/entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Room, Payment])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
