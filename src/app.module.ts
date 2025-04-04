import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './domain/hotel/hotel.module';
import { DatabaseModule } from './database/database.module';
import { CustomerModule } from './domain/customer/customer.module';
import { RoomModule } from './domain/room/room.module';
import { RoomTypeModule } from './domain/room-type/room-type.module';
import { BookingModule } from './domain/booking/booking.module';
import { PaymentsModule } from './domain/payment/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    HotelModule,
    CustomerModule,
    RoomModule,
    RoomTypeModule,
    BookingModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
