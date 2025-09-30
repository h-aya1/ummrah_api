import { IsNotEmpty, IsString, IsObject, IsArray, IsUrl, IsNumber } from 'class-validator';

export class CreateGuideDto {
  @IsNotEmpty()
  @IsString()
  stepName: string;

  @IsNotEmpty()
  @IsObject()
  description: { en: string; am: string; or: string };

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  audioUrl: string;

  @IsNotEmpty()
  @IsNumber()
  order: number;
}
