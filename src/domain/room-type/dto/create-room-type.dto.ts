import { createZodDto } from 'nestjs-zod';
import { RoomTypeDtoSchema } from './room-type.dto';
import { z } from 'zod';

export const CreateRoomTypeDtoSchema = RoomTypeDtoSchema.extend({
  hotelId: z.string().uuid({ message: 'Hotel ID must be a valid UUID' }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateRoomTypeDto extends createZodDto(CreateRoomTypeDtoSchema) {}
