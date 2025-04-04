import { CreateHotelDtoSchema } from './create-hotel.dto';
import z from 'zod';

export const UpdateHotelDtoSchema = CreateHotelDtoSchema.partial();

export type UpdateHotelDto = z.infer<typeof UpdateHotelDtoSchema>;
