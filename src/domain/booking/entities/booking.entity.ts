import { AbstractEntity } from '../../../common/component-entities/abstract.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BookingDto, bookingStatus, BookingStatus } from '../dto/booking.dto';
import { Customer } from '../../customer/entities/customer.entity';
import { Room } from '../../room/entities/room.entity';
import { Payment } from '../../payment/entities/payment.entity';
import { Hotel } from 'src/domain/hotel/entities/hotel.entity';

@Entity({ name: 'booking' })
export class Booking extends AbstractEntity<Booking> implements BookingDto {
  @Column({ name: 'check_in_date', type: 'date', nullable: false })
  checkInDate!: Date;

  @Column({ name: 'check_out_date', type: 'date', nullable: false })
  checkOutDate!: Date;
  @Column({ name: 'number_of_guests', type: 'int', nullable: false })
  numberOfGuests!: number;
  @Column({
    name: 'total_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  totalPrice!: number;

  @Column({
    type: 'enum',
    enum: [
      bookingStatus.enum.PENDING,
      bookingStatus.enum.CONFIRMED,
      bookingStatus.enum.CANCELLED,
      bookingStatus.enum.COMPLETED,
    ],
    default: bookingStatus.enum.PENDING,
  })
  status!: BookingStatus;

  @ManyToOne(() => Customer, (customer) => customer.bookings, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'customer_id' })
  customer!: Customer;

  @ManyToOne(() => Room, (room) => room.bookings, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'room_id' })
  room!: Room;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'hotel_id' })
  hotel!: Hotel;

  @OneToOne(() => Payment, (payment) => payment.booking, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'payment_id' })
  payment!: Payment;
}
