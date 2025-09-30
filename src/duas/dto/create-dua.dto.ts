import { IsNotEmpty, IsString, IsObject, IsUrl } from 'class-validator';

export class CreateDuaDto {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  arabic: string;

  @IsNotEmpty()
  @IsString()
  transliteration: string;

  @IsNotEmpty()
  @IsObject()
  translation: { en: string; am: string; or: string };

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  audioUrl: string;
}
