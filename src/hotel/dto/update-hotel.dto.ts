import { CreateCustomerDtoSchema } from 'src/customer/dto/create-customer.dto';
import z from 'zod';

export const UpdateHotelDtoSchema = CreateCustomerDtoSchema.partial();

export type UpdateHotelDto = z.infer<typeof UpdateHotelDtoSchema>;
