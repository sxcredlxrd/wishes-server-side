import { IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class WishDto {
  @IsString({ message: 'Название обязательно!' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Описание должно быть строкой' })
  description?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Неверный формат ссылки' })
  link?: string;

  @IsOptional()
  @IsUrl({}, { message: 'Неверный формат ссылки на изображение' })
  picture?: string;

  @IsOptional()
  @IsInt({ message: 'Цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  price?: number;
}
