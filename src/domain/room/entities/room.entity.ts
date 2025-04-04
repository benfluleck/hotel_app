import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { RoomDto } from '../dto/room.dto';
import { Hotel } from 'src/domain/hotel/entities/hotel.entity';
import { AbstractEntity } from 'src/common/component-entities/abstract.entity';
import { RoomType } from 'src/domain/room-type/entities/room-type.entity';
import { Booking } from 'src/domain/booking/entities/booking.entity';

@Entity({ name: 'room' })
export class Room extends AbstractEntity<Room> implements RoomDto {
  @Column({ name: 'room_number', type: 'text', nullable: false })
  roomNumber!: string;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable!: boolean;

  @ManyToOne(() => RoomType, (roomType) => roomType.rooms, {
    cascade: ['insert', 'update', 'recover'],
  })
  @JoinColumn({ name: 'room_type_id' })
  roomType!: RoomType;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, {
    cascade: ['insert', 'update', 'recover'],
  })
  @JoinColumn({ name: 'hotel_id' })
  hotel!: Hotel;

  @OneToMany(() => Booking, (booking) => booking.room, {
    cascade: ['insert', 'update', 'remove'],
  })
  booking!: Booking[];
}
