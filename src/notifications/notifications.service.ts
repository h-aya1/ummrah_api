import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
// TODO: Integrate FCM for push

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(createDto: any): Promise<Notification> {
    const notification = this.notificationRepository.create(createDto);
    // TODO: Send push via FCM
    return await (this.notificationRepository.save(notification) as unknown as Promise<Notification>);
  }

  findAll(): Promise<Notification[]> {
    return this.notificationRepository.find({ order: { timestamp: 'DESC' } });
  }
}