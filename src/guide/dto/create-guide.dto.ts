import { IsNotEmpty, IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateGuideDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;

  @IsOptional()
  @IsObject()
  media?: { image?: string; video?: string; audio?: string };

  @IsOptional()
  @IsObject()
  translations?: { english: string; amharic: string; oromo: string };

  // Steps will be handled separately or in nested create
}
