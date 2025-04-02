import { createZodDto } from 'nestjs-zod';
import { PaymentDtoSchema } from './payment.dto';

export const CreatePaymentDtoSchema = PaymentDtoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export class CreatePaymentDto extends createZodDto(CreatePaymentDtoSchema) {}
