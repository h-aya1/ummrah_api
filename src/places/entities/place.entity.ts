import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('json')
  description: { english: string; amharic: string; oromo: string };

  @Column()
  city: string;

  @Column('json')
  images: string[];

  @Column()
  mapLocation: string;
}