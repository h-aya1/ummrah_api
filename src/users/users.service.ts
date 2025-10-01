// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ phone });
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  //  Inline typed input: password is plain text, everything else matches User
  async create(
    user: Omit<User, 'id' | 'passwordHash'> & { password: string },
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = this.usersRepository.create({
      ...user,
      passwordHash: hashedPassword, // store only the hash
    });

    return this.usersRepository.save(newUser);
  }

  async updateProfile(
    id: string,
    updateDto: Partial<User>,
  ): Promise<User | null> {
    await this.usersRepository.update(id, updateDto);
    return this.findOne(id);
  }
}
