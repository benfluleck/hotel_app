import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomDto } from '../dto/room.dto';

@Entity({ name: 'room' })
export class Room implements RoomDto {
  @PrimaryGeneratedColumn('uuid')
  room_id!: string;

  @Column({ name: 'room_number', type: 'text', nullable: false })
  room_number!: string;

  @Column({ name: 'room_type', type: 'text', nullable: false })
  room_type!: string;

  @Column({ name: 'price_per_night', type: 'decimal', nullable: false })
  price_per_night!: number;

  @Column({ name: 'max_guests', type: 'integer', nullable: false })
  max_guests!: number;

  @Column({ name: 'is_available', type: 'boolean', default: true })
  is_available!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  constructor(room: Partial<Room>) {
    Object.assign(this, room);
  }
}