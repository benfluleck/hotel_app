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
import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { ERROR_CODES } from 'src/common/component-entities/error-context';

@Controller('room-type')
@UsePipes(ZodValidationPipe)
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateRoomTypeDto)) body: CreateRoomTypeDto,
  ) {
    const roomType = await this.roomTypeService.create(body);

    if (!roomType) {
      throw new HttpException(ERROR_CODES.BAD_REQUEST, HttpStatus.BAD_REQUEST);
    }
    return roomType;
  }

  @Get()
  findAll() {
    return this.roomTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoomTypeDto: UpdateRoomTypeDto,
  ) {
    return this.roomTypeService.update(id, updateRoomTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomTypeService.remove(id);
  }
}
