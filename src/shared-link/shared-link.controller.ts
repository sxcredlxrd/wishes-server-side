import { Controller } from '@nestjs/common';
import { SharedLinkService } from './shared-link.service';

@Controller('shared-link')
export class SharedLinkController {
  constructor(private readonly sharedLinkService: SharedLinkService) {}
}
