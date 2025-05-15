import { createZodDto } from 'nestjs-zod';
import { RoomTypeDtoSchema } from './room-type.dto';

export const RoomTypeResponseDtoSchema = RoomTypeDtoSchema.omit({
  createdAt: true,
  updatedAt: true,
  maxGuests: true,
  id: true,
}).required();
export class RoomTypeResponseDto extends createZodDto(
  RoomTypeResponseDtoSchema,
) {}
