import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const paymentStatus = z.enum([
  'PENDING',
  'COMPLETED',
  'FAILED',
  'REFUNDED',
]);
export type PaymentStatusType = z.infer<typeof paymentStatus>;

export const paymentMethod = z.enum([
  'CREDIT_CARD',
  'DEBIT_CARD',
  'PAYPAL',
  'BANK_TRANSFER',
  'CASH',
]);
export type PaymentMethodType = z.infer<typeof paymentMethod>;

export const PaymentDtoSchema = z
  .object({
    id: z.string().uuid(),
    amount: z.number(),
    method: paymentMethod,
    status: paymentStatus,
    transactionDate: z.date({
      required_error: 'Transaction date is required',
      invalid_type_error: 'Transaction date must be a valid date',
    }),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class PaymentDto extends createZodDto(PaymentDtoSchema) {}
