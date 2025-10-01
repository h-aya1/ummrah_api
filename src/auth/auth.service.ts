import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';  // Import from users module
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    let user: User | null;
    if (username.includes('@')) {
      // Admin login with email
      user = await this.usersService.findByEmail(username);
    } else {
      // User login with phone
      user = await this.usersService.findByPhone(username);
    }
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, role: user.role, username: user.email || user.phone };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: any) {
    let password = createUserDto.password;
    if (!password || createUserDto.role !== 'admin') {
      // Generate password for users
      password = crypto.randomBytes(4).toString('hex'); // 8 character hex
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user) as any;
    // Return user without passwordHash, and include plain password for admin to give to user
    const { passwordHash, ...result } = savedUser;
    return { ...result, password: createUserDto.role === 'admin' ? undefined : password };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    // TODO: Send email with reset token (integrate email service like Nodemailer)
    const resetToken = this.jwtService.sign({ email }, { expiresIn: '1h' });
    return { message: 'Reset link sent', token: resetToken };  // In real, send via email
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const { email } = this.jwtService.verify(token);
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      user.passwordHash = await bcrypt.hash(newPassword, 10);
      await this.userRepository.save(user);
      return { message: 'Password reset successful' };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}