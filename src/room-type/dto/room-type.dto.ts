import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RoomTypeDtoSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    pricePerNight: z.number(),
    maxGuests: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class RoomTypeDto extends createZodDto(RoomTypeDtoSchema) {}
