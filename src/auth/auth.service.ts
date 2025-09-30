import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';  // Import from users module

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: any) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      passwordHash: hashedPassword,
    });
    return this.userRepository.save(user);
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