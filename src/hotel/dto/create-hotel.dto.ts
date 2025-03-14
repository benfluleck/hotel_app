import z from 'zod';

export const CreateHotelDtoSchema = z.object({
  name: z.string(),
  street_address: z.string().min(5, { message: 'Address is too short' }),
  state: z.string(),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  phone: z.string(),
});

export type CreateHotelDto = z.infer<typeof CreateHotelDtoSchema>;
