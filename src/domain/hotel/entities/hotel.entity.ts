import { Column, Entity, OneToMany } from 'typeorm';
import { HotelDto } from '../dto/hotel.dto';
import { Room } from 'src/domain/room/entities/room.entity';
import { AbstractEntity } from 'src/common/component-entities/abstract.entity';

@Entity({ name: 'hotel' })
export class Hotel extends AbstractEntity<Hotel> implements HotelDto {
  @Column({ type: 'text', unique: true })
  name!: string;

  @Column({ type: 'text', nullable: false })
  street_address!: string;

  @Column({ type: 'text', nullable: false })
  state!: string;

  @Column({ type: 'text', nullable: false })
  email!: string;

  @Column({ type: 'text', nullable: false })
  phone!: string;

  @OneToMany(() => Room, (room) => room.hotel, {
    cascade: true,
  })
  rooms!: Room[];
}
