import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('duas')
export class Dua {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column('text')
  arabic: string;

  @Column('json')
  translation: { english: string; amharic: string; oromo: string };

  @Column()
  audio: string;
}