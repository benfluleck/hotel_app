import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const HotelDtoSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string({ required_error: 'Hotel name is required' }),
    street_address: z.string().min(5, { message: 'Address is too short' }),
    state: z.string({ required_error: 'State is required' }),
    email: z
      .string()
      .min(1, { message: 'City is required' })
      .email('This is not a valid email.'),
    phone: z.string({ required_error: 'Phone number is required' }),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class HotelDto extends createZodDto(HotelDtoSchema) {}
