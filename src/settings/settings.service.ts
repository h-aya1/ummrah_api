import { Injectable } from '@nestjs/common';
// Extend if needed for server-side settings
@Injectable()
export class SettingsService {
  getHello(): string {
    return 'Settings module ready';
  }
}