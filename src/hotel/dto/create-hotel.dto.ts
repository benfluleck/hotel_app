import { createZodDto } from 'nestjs-zod';
import { HotelDtoSchema } from './hotel.dto';

export const CreateHotelDtoSchema = HotelDtoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateHotelDto extends createZodDto(CreateHotelDtoSchema) {}
