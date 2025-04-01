import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const paymentStatus = z.enum(['PENDING', 'COMPLETED', 'FAILED']);
export type PaymentStatus = z.infer<typeof paymentStatus>;

export const paymentMethod = z.enum([
  'CREDIT_CARD',
  'DEBIT_CARD',
  'PAYPAL',
  'BANK_TRANSFER',
]);
export type PaymentMethod = z.infer<typeof paymentMethod>;

export const PaymentDtoSchema = z
  .object({
    id: z.string().uuid(),
    amount: z
      .number()
      .positive({ message: 'Amount must be a positive number' }),
    method: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER']),
    status: z.enum(['PENDING', 'COMPLETED', 'FAILED']),
    transactionDate: z.date({
      required_error: 'Transaction date is required',
      invalid_type_error: 'Transaction date must be a valid date',
    }),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export class PaymentDto extends createZodDto(PaymentDtoSchema) {}
