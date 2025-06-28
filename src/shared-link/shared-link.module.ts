import { Module } from '@nestjs/common';
import { SharedLinkService } from './shared-link.service';
import { SharedLinkController } from './shared-link.controller';

@Module({
  controllers: [SharedLinkController],
  providers: [SharedLinkService],
})
export class SharedLinkModule {}
