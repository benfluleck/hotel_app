import { AbstractEntity } from 'src/connection/entities/abstract.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import {
  PaymentDto,
  PaymentMethodType,
  paymentMethod,
  PaymentStatusType,
  paymentStatus,
} from '../dto/payment.dto';
import { Booking } from 'src/booking/entities/booking.entity';

@Entity({ name: 'payment' })
export class Payment extends AbstractEntity<Payment> implements PaymentDto {
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount!: number;

  @Column({ type: 'text', nullable: false })
  transactionDate!: Date;

  @Column({
    type: 'enum',
    enum: [
      paymentStatus.enum.PENDING,
      paymentStatus.enum.COMPLETED,
      paymentStatus.enum.FAILED,
      paymentStatus.enum.REFUNDED,
    ],
    default: paymentStatus.enum.PENDING,
  })
  status!: PaymentStatusType;

  @Column({
    type: 'enum',
    enum: [
      paymentMethod.enum.CREDIT_CARD,
      paymentMethod.enum.BANK_TRANSFER,
      paymentMethod.enum.PAYPAL,
      paymentMethod.enum.CASH,
    ],
    default: paymentMethod.enum.BANK_TRANSFER,
  })
  method!: PaymentMethodType;

  @OneToOne(() => Booking, (booking) => booking.payment, {
    cascade: true,
  })
  @JoinColumn({ name: 'booking_id' })
  booking!: Booking;
}
