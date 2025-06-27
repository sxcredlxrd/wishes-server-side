import { IsOptional, IsString } from 'class-validator';

export class CollectionDto {
  @IsString({
    message: 'Название коллекции обязательно!'
  })
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
