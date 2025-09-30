import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('duas')
export class Dua {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: string;

  @Column('text')
  arabic: string;

  @Column('text')
  transliteration: string;

  @Column('json')
  translation: { en: string; am: string; or: string };

  @Column()
  audioUrl: string;
}