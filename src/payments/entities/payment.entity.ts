import { AbstractEntity } from 'src/connection/entities/abstract.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import {
  PaymentDto,
  PaymentMethod,
  paymentMethod,
  PaymentStatus,
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
    enum: paymentStatus,
    default: paymentStatus.enum.PENDING,
  })
  status!: PaymentStatus;

  @Column({
    type: 'enum',
    enum: paymentMethod,
    default: paymentMethod.enum.BANK_TRANSFER,
  })
  method!: PaymentMethod;

  @OneToOne(() => Booking, (booking) => booking.payment, {
    cascade: true,
  })
  @JoinColumn({ name: 'booking_id' })
  booking!: Booking;
}
