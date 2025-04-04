import { createZodDto } from 'nestjs-zod';
import { RoomDtoSchema } from './room.dto';

export const RoomResponseDtoSchema = RoomDtoSchema.omit({
  createdAt: true,
  updatedAt: true,
}).required();
export class RoomResponseDto extends createZodDto(RoomResponseDtoSchema) {}
