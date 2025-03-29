import { createZodDto } from 'nestjs-zod';
import { RoomTypeDtoSchema } from './room-type.dto';

export const CreateRoomTypeDtoSchema = RoomTypeDtoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateRoomTypeDto extends createZodDto(CreateRoomTypeDtoSchema) {}
