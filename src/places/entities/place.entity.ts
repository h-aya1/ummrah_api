import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  name: { en: string; am: string; or: string };

  @Column('json')
  description: { en: string; am: string; or: string };

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column()
  imageUrl: string;
}