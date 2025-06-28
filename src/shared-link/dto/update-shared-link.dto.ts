import { PartialType } from '@nestjs/mapped-types';
import { SharedLinkDto } from './shared-link.dto';

export class UpdateSharedLinkDto extends PartialType(SharedLinkDto) {}
