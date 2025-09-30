import { IsNotEmpty, IsObject, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsObject()
  name: { en: string; am: string; or: string };

  @IsNotEmpty()
  @IsObject()
  description: { en: string; am: string; or: string };

  @IsNotEmpty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  imageUrl: string;
}
