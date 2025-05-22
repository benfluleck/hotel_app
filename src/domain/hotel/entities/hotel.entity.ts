import { Column, Entity, Index, OneToMany } from 'typeorm';
import { HotelDto } from '../dto/hotel.dto';
import { Room } from '../../room/entities/room.entity';
import { AbstractEntity } from '../../../common/component-entities/abstract.entity';
import { RoomType } from 'src/domain/room-type/entities/room-type.entity';
import { Booking } from 'src/domain/booking/entities/booking.entity';

@Entity({ name: 'hotel' })
@Index(['email', 'name'], { unique: true })
export class Hotel extends AbstractEntity<Hotel> implements HotelDto {
  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', name: 'street_address', nullable: false })
  streetAddress!: string;

  @Column({ type: 'text', nullable: false })
  state!: string;

  @Column({ type: 'text', nullable: false })
  email!: string;

  @Column({ type: 'text', nullable: false })
  phone!: string;

  @OneToMany(() => Room, (room) => room.hotel, {
    cascade: ['insert', 'update', 'remove'],
  })
  rooms!: Room[];

  @OneToMany(() => Booking, (booking) => booking.hotel, {
    cascade: ['insert', 'update', 'remove'],
  })
  bookings!: Booking[];

  @OneToMany(() => RoomType, (roomType) => roomType.hotel, {
    cascade: ['insert', 'update'],
  })
  roomTypes!: RoomType[];
}
