import { Column, Entity, ManyToOne } from 'typeorm';
import { RoomDto } from '../dto/room.dto';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { AbstractEntity } from 'src/connection/entities/abstract.entity';

@Entity({ name: 'room' })
export class Room extends AbstractEntity<Room> implements RoomDto {
  @Column({ name: 'room_number', type: 'text', nullable: false })
  roomNumber!: string;

  @Column({ name: 'room_type', type: 'text', nullable: false })
  roomType!: string;

  @Column({ name: 'price_per_night', type: 'decimal', nullable: false })
  pricePerNight!: number;

  @Column({ name: 'max_guests', type: 'integer', nullable: false })
  maxGuests!: number;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  isAvailable!: boolean;

  @Column({ name: 'hotel_id', type: 'uuid', nullable: true })
  hotelId!: string;

  @ManyToOne(() => Hotel, (hotel) => hotel.rooms, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  hotel!: Hotel;
}
