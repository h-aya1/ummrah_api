import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  role: string;  // 'pilgrim' | 'amir' | 'admin'

  @Column()
  passwordHash: string;

  @Column()
  languagePref: string;
}
