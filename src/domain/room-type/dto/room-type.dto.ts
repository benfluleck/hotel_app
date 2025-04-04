import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RoomTypeDtoSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string({ required_error: 'Room type name is required' }),
    description: z.string().optional(),
    pricePerNight: z.number({ required_error: 'Price per night is required' }),
    maxGuests: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class RoomTypeDto extends createZodDto(RoomTypeDtoSchema) {}
