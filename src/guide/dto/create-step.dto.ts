import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';

export class CreateStepDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsObject()
  translations: {
    english: { title: string; description: string };
    amharic: { title: string; description: string };
    oromo: { title: string; description: string };
  };

  @IsOptional()
  @IsString()
  arabicText?: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsString()
  audio?: string;

  @IsOptional()
  @IsString()
  duration?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsNotEmpty()
  @IsString()
  guideId: string;
}
