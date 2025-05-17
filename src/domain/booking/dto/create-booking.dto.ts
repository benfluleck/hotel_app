import { createZodDto } from 'nestjs-zod';
import { BookingDtoSchema } from './booking.dto';
import { z } from 'zod';

export const CreateBookingDtoSchema = BookingDtoSchema.extend({
  customerId: z.string().uuid({
    message: 'Customer ID must be a valid UUID',
  }),
  roomId: z.string().uuid({
    message: 'Room ID must be a valid UUID',
  }),
  hotelId: z.string().uuid({
    message: 'Hotel ID must be a valid UUID',
  }),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateBookingDto extends createZodDto(CreateBookingDtoSchema) {}
