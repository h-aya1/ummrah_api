import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class CreateDuaDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  arabic: string;

  @IsNotEmpty()
  @IsObject()
  translation: { english: string; amharic: string; oromo: string };

  @IsNotEmpty()
  @IsString()
  audio: string;
}
