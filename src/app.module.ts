import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DuasModule } from './duas/duas.module';
import { GuideModule } from './guide/guide.module';
import { PlacesModule } from './places/places.module';
import { ChatModule } from './chat/chat.module';
import { LocationModule } from './location/location.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsModule } from './settings/settings.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  // Loads .env
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,  // Auto-sync schema (use false in production)
      logging: true,  // For debugging
    }),
    AuthModule,
    UsersModule,
    DuasModule,
    GuideModule,
    PlacesModule,
    ChatModule,
    LocationModule,
    NotificationsModule,
    SettingsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}