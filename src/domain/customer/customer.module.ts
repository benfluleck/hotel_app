import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Booking } from 'src/domain/booking/entities/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Booking])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
