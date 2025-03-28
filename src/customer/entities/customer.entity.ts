import { Column, Entity, Unique } from 'typeorm';
import { CustomerDto } from '../dto/customer.dto';
import { AbstractEntity } from 'src/connection/entities/abstract.entity';

@Entity({ name: 'customer' })
export class Customer extends AbstractEntity<Customer> implements CustomerDto {
  @Column({ name: 'first_name', type: 'text', nullable: false })
  firstName!: string;

  @Unique('UNIQ_USER_NAME', ['firstName', 'lastName'])
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

  @Column({ type: 'text', nullable: false, unique: true })
  email!: string;

  @Column({ type: 'text', nullable: false })
  phone!: string;
}
