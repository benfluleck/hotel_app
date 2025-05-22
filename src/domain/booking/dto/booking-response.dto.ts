import { createZodDto } from 'nestjs-zod';
import { BookingDtoSchema } from './booking.dto';

export const BookingResponseDtoSchema = BookingDtoSchema.omit({
  createdAt: true,
  updatedAt: true,
  id: true,
});

export class BookingResponseDto extends createZodDto(
  BookingResponseDtoSchema,
) {}
