import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
// import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('admin/login')
  async adminLogin(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user || user.role !== 'admin') {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(user); // now you will see the user
    return this.authService.login(user);
  }

  @Post('user/login')
  async userLogin(@Body() body: { phone: string; password: string }) {
    const user = await this.authService.validateUser(body.phone, body.password);
    if (!user || !['pilgrim', 'amir'].includes(user.role)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(user); // now you will see the user
    return this.authService.login(user);
  }
  

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async register(@Body() createUserDto: any) {
    return this.authService.register(createUserDto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }
}