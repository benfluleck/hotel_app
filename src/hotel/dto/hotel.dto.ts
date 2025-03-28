import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const HotelDtoSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    street_address: z.string().min(5, { message: 'Address is too short' }),
    state: z.string(),
    email: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .email('This is not a valid email.'),
    phone: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class HotelDto extends createZodDto(HotelDtoSchema) {}
