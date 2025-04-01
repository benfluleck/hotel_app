import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RoomDtoSchema = z
  .object({
    id: z.string().uuid(),
    roomNumber: z.string().min(1, { message: 'Room number is required' }),
    isAvailable: z.boolean().default(true),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class RoomDto extends createZodDto(RoomDtoSchema) {}
