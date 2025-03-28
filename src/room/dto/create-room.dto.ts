import { createZodDto } from 'nestjs-zod';
import { RoomDtoSchema } from './room.dto';

export const CreateRoomDtoSchema = RoomDtoSchema.omit({
  room_id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateRoomDto extends createZodDto(CreateRoomDtoSchema) {}
