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
  Query,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomService } from './room.service';
import { ERROR_CODES } from '../../common/component-entities/error-context';

@Controller('room')
@UsePipes(ZodValidationPipe)
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateRoomDto))
    body: CreateRoomDto,
  ) {
    const room = await this.roomService.create(body);

    if (!room) {
      throw new HttpException(ERROR_CODES.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }

    return room;
  }

  @Get()
  async findAll(@Query('hotelId') hotelId: string) {
    return await this.roomService.findAll(hotelId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(id);
  }
}
