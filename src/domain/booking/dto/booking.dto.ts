import { isBefore } from 'date-fns';
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
    checkInDate: z.coerce
      .date({
        required_error: 'Check-in date is required',
        invalid_type_error: 'Check-in date must be a valid date',
      })
      .refine(
        (date) => {
          const today = new Date();

          return !isBefore(today, date);
        },
        {
          message: 'Check-in date must be today or in the future',
        },
      ),
    checkOutDate: z.coerce
      .date({
        required_error: 'Check-out date is required',
        invalid_type_error: 'Check-out date must be a valid date',
      })
      .refine(
        (date) => {
          const today = new Date();
          return isBefore(today, date);
        },
        {
          message: 'Check-out date must be after today',
        },
      ),
    totalPrice: z
      .number({
        required_error: 'Total price is required',
        invalid_type_error: 'Total price must be a number',
      })
      .positive(),
    numberOfGuests: z.number().positive().optional(),
    status: bookingStatus,
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class BookingDto extends createZodDto(BookingDtoSchema) {}
