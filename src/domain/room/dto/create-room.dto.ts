import { createZodDto } from 'nestjs-zod';
import { RoomDtoSchema } from './room.dto';
import { z } from 'zod';

export const CreateRoomDtoSchema = RoomDtoSchema.extend({
  hotelId: z.string().uuid({ message: 'Hotel ID must be a valid UUID' }),
  roomTypeId: z.string().uuid({ message: 'Room Type ID must be a valid UUID' }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateRoomDto extends createZodDto(CreateRoomDtoSchema) {}
