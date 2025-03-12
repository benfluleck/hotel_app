import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './hotel/hotel.module';
import { ConnectionModule } from './connection/connection.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConnectionModule,
    HotelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
