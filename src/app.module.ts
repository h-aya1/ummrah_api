import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DuasModule } from './duas/duas.module';
import { GuideModule } from './guide/guide.module';
import { PlacesModule } from './places/places.module';
import { ChatModule } from './chat/chat.module';
import { LocationModule } from './location/location.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsModule } from './settings/settings.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [UsersModule, AuthModule, DuasModule, GuideModule, PlacesModule, ChatModule, LocationModule, NotificationsModule, SettingsModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
