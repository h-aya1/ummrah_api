import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['system', 'prayer', 'dua', 'custom'])
  type: string;
}
