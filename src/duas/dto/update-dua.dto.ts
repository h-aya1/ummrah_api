import { PartialType } from '@nestjs/mapped-types';
import { CreateDuaDto } from './create-dua.dto';

export class UpdateDuaDto extends PartialType(CreateDuaDto) {}
