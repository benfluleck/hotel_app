import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const bookingStatus = z.enum([
  'PENDING',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
]);

export type BookingStatus = z.infer<typeof bookingStatus>;

export const BookingDtoSchema = z
  .object({
    id: z.string().uuid(),
    checkInDate: z.date({
      required_error: 'Check-in date is required',
      invalid_type_error: 'Check-in date must be a valid date',
    }),
    checkOutDate: z.date({
      required_error: 'Check-in date is required',
      invalid_type_error: 'Check-in date must be a valid date',
    }),
    totalPrice: z
      .number({
        required_error: 'Total price is required',
        invalid_type_error: 'Total price must be a number',
      })
      .positive(),
    numberOfGuests: z.number().positive(),
    status: bookingStatus,
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class BookingDto extends createZodDto(BookingDtoSchema) {}
