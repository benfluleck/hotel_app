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
  id!: string;

  @Column({ name: 'name', type: 'text', nullable: false })
  name!: string;

  @Column({ name: 'number', type: 'text', nullable: false })
  number!: number;

  @Column({ name: 'bed', type: 'text', nullable: false })
  bed!: number;

  @Column({ name: 'smoking', type: 'text', nullable: true })
  smoking!: boolean;

  @Column({ name: 'breakfast', type: 'text', nullable: true })
  breakfast!: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  constructor(room: Partial<Room>) {
    Object.assign(this, room);
  }
}
