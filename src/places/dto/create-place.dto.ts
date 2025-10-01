import { IsNotEmpty, IsObject, IsString, IsArray, IsUrl } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsObject()
  description: { english: string; amharic: string; oromo: string };

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  mapLocation: string;
}
