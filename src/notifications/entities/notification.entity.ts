import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  type: string;  // 'system' | 'prayer' | 'dua' | 'custom'

  @Column()
  timestamp: Date;
}