import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RoomDtoSchema = z
  .object({
    room_id: z.string(),
    room_number: z.string().max(10),
    room_type: z.string().max(20),
    price_per_night: z.number(),
    max_guests: z.number(),
    is_available: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class RoomDto extends createZodDto(RoomDtoSchema) {}
