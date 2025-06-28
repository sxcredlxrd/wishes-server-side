import { IsOptional, IsString } from 'class-validator';

export class SharedLinkDto {
  @IsOptional()
  @IsString()
  collectionId?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
