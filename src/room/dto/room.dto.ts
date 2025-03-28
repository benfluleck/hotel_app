import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const RoomDtoSchema = z
  .object({
    id: z.string().uuid(),
    roomNumber: z.string(),
    roomType: z.string(),
    pricePerNight: z.number(),
    maxGuests: z.number(),
    isAvailable: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    hotelId: z.string().uuid('Hotel ID must be a valid UUID'),
  })
  .required();

export class RoomDto extends createZodDto(RoomDtoSchema) {}
