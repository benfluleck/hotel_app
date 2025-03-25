import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto, CreateHotelDtoSchema } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('hotel')
@UsePipes(ZodValidationPipe)
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateHotelDtoSchema))
    body: CreateHotelDto,
  ) {
    return this.hotelService.create(body);
  }

  @Get()
  async findAll() {
    return this.hotelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hotelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.hotelService.remove(id);
  }
}
