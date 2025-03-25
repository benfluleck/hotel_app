import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CustomerDtoSchema = z
  .object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirth: z.date().optional(),
    streetAddress: z.string().min(5, { message: 'Address is too short' }),
    city: z.string().optional(),
    postCode: z.string().optional(),
    country: z.string(),
    email: z
      .string()
      .min(1, { message: 'This field has to be filled.' })
      .email('This is not a valid email.'),
    phone: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class CustomerDto extends createZodDto(CustomerDtoSchema) {}
