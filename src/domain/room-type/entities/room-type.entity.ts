import { AbstractEntity } from '../../../common/component-entities/abstract.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { RoomTypeDto } from '../dto/room-type.dto';
import { Room } from '../../room/entities/room.entity';
import { Hotel } from '../../hotel/entities/hotel.entity';

@Entity({ name: 'room_type' })
@Unique(['name', 'hotel'])
export class RoomType extends AbstractEntity<RoomType> implements RoomTypeDto {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string;

  @Column({
    type: 'decimal',
    name: 'price_per_night',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  pricePerNight!: number;

  @Column({ type: 'int', name: 'max_guests', nullable: false })
  maxGuests!: number;

  @OneToMany(() => Room, (room) => room.roomType, {
    cascade: ['remove'],
  })
  rooms!: Room[];

  @ManyToOne(() => Hotel, (hotel) => hotel.roomTypes, {
    cascade: ['insert', 'update'],
  })
  hotel!: Hotel;
}
