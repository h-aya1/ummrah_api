import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('guides')
export class Guide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  stepName: string;

  @Column('json')
  description: { en: string; am: string; or: string };

  @Column('simple-array')
  images: string[];

  @Column()
  audioUrl: string;

  @Column()
  order: number;
}