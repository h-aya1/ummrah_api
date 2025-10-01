import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import type { Guide } from './guide.entity';

@Entity('steps')
export class Step {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('json')
  translations: {
    english: { title: string; description: string };
    amharic: { title: string; description: string };
    oromo: { title: string; description: string };
  };

  @Column('text', { nullable: true })
  arabicText?: string;

  @Column()
  image?: string;

  @Column({ nullable: true })
  video?: string;

  @Column({ nullable: true })
  audio?: string;

  @Column({ nullable: true })
  duration?: string;

  @Column({ nullable: true })
  location?: string;

  @ManyToOne('Guide', 'steps', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'guideId' })
  guide: Guide;

  @Column()
  guideId: string;
}
