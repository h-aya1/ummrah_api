import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import type { Step } from './step.entity';

@Entity('guides')
export class Guide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column('json', { nullable: true })
  media?: { image?: string; video?: string; audio?: string };

  @Column('json', { nullable: true })
  translations?: { english: string; amharic: string; oromo: string };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany('Step', 'guide', { cascade: true })
  steps: Step[];
}