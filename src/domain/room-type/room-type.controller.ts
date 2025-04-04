import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomTypeService } from './room-type.service';
import { CreateRoomTypeDto } from './dto/create-room-type.dto';
import { UpdateRoomTypeDto } from './dto/update-room-type.dto';

@Controller('room-type')
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @Post()
  create(@Body() body: CreateRoomTypeDto) {
    return this.roomTypeService.create(body);
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
