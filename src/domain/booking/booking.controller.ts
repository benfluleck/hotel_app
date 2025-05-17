import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { ERROR_CODES } from 'src/common/component-entities/error-context';

@Controller('booking')
@UsePipes(ZodValidationPipe)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateBookingDto))
    createBookingDto: CreateBookingDto,
  ) {
    const booking = await this.bookingService.create(createBookingDto);

    if (!booking) {
      throw new HttpException(ERROR_CODES.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return booking;
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
