import { createZodDto } from 'nestjs-zod';
import { BookingDtoSchema } from './booking.dto';

export const CreateBookingDtoSchema = BookingDtoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateBookingDto extends createZodDto(CreateBookingDtoSchema) {}
