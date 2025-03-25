import { createZodDto } from 'nestjs-zod';
import { HotelDtoSchema } from './hotel.dto';

export const CreateHotelDtoSchema = HotelDtoSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export class CreateHotelDto extends createZodDto(CreateHotelDtoSchema) {}
