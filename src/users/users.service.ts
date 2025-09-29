import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'User', role: 'user' },
    { id: 2, name: 'Admin', role: 'admin' },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  create(name: string, role: string) {
    const newUser = {
      id: this.users.length + 1,
      name,
      role,
    };
    this.users.push(newUser);
    return newUser;
  }
}
