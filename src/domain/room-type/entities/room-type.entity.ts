import { AbstractEntity } from 'src/common/component-entities/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { RoomTypeDto } from '../dto/room-type.dto';
import { Room } from 'src/domain/room/entities/room.entity';

@Entity({ name: 'room_type' })
export class RoomType extends AbstractEntity<RoomType> implements RoomTypeDto {
  @Column({ type: 'varchar', unique: true })
  name!: string;

  @Column({ type: 'text', nullable: false })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  pricePerNight!: number;

  @Column({ type: 'int', nullable: false })
  maxGuests!: number;

  @OneToMany(() => Room, (room) => room.roomType, {
    cascade: true,
  })
  rooms!: Room[];
}
