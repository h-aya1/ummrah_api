import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
// Inject other services as needed

@Injectable()
export class AdminService {
  constructor(private usersService: UsersService) {}

  getAllUsers() {
    return this.usersService.findAll();
  }

  // Add more for groups, places management, etc.
}