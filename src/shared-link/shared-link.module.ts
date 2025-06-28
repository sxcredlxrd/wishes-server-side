import { Module } from '@nestjs/common';
import { SharedLinkService } from './shared-link.service';
import { SharedLinkController } from './shared-link.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SharedLinkController],
  providers: [SharedLinkService, PrismaService]
})
export class SharedLinkModule {}
