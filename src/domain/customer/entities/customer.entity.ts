import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';
import { CustomerDto } from '../dto/customer.dto';
import { AbstractEntity } from '../../../common/component-entities/abstract.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity({ name: 'customer' })
@Unique('UNIQ_USER_NAME', ['firstName', 'lastName'])
@Index(['email', 'phone'], { unique: true })
export class Customer extends AbstractEntity<Customer> implements CustomerDto {
  @Column({ name: 'first_name', type: 'text', nullable: false })
  firstName!: string;

  @Column({ name: 'last_name', type: 'text', nullable: false })
  lastName!: string;

  @Column({ name: 'date_of_birth', type: 'text', nullable: true })
  dateOfBirth!: Date;

  @Column({ name: 'street_address', type: 'text', nullable: false })
  streetAddress!: string;

  @Column({ type: 'text', nullable: true })
  city!: string;

  @Column({ name: 'post_code', type: 'text', nullable: true })
  postCode!: string;

  @Column({ type: 'text', nullable: false })
  country!: string;

  @Column({ type: 'text', nullable: false })
  email!: string;

  @Column({ type: 'text', nullable: false })
  phone!: string;

  @OneToMany(() => Booking, (booking) => booking.customer, {
    cascade: ['insert', 'update', 'remove'],
  })
  bookings!: Booking[];
}
