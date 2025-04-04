import { createZodDto } from 'nestjs-zod';
import { CustomerDtoSchema } from './customer.dto';

export const CreateCustomerDtoSchema = CustomerDtoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class CreateCustomerDto extends createZodDto(CreateCustomerDtoSchema) {}
