import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './hotel/hotel.module';
import { ConnectionModule } from './connection/connection.module';
import { CustomerModule } from './customer/customer.module';
import { RoomModule } from './room/room.module';
import { RoomTypeModule } from './room-type/room-type.module';
import { BookingModule } from './booking/booking.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConnectionModule,
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
