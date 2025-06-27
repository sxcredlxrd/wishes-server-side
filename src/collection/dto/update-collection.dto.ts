import { IsOptional, IsString } from 'class-validator';

export class UpdateCollectionDto {
  @IsOptional()
  @IsString({
    message: 'Название коллекции должно быть строкой'
  })
  title?: string;

  @IsOptional()
  @IsString({
    message: 'Описание должно быть строкой'
  })
  description?: string | null;
}
