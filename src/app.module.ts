import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HotelModule } from './domain/hotel/hotel.module';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './domain/customer/customer.module';
import { RoomModule } from './domain/room/room.module';
import { RoomTypeModule } from './domain/room-type/room-type.module';
import { BookingModule } from './domain/booking/booking.module';
import { PaymentsModule } from './domain/payment/payment.module';
import { TasksService } from './domain/tasks/tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    HotelModule,
    CustomerModule,
    RoomModule,
    RoomTypeModule,
    BookingModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [TasksService],
})
export class AppModule {}
