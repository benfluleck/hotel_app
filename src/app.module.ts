import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HotelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
