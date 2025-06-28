import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SharedLinkService } from './shared-link.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SharedLinkDto } from './dto/shared-link.dto';
import { CurrentUser } from '../user/decorators/user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('shared-link')
export class SharedLinkController {
  constructor(private readonly sharedLinkService: SharedLinkService) {}

  @Post()
  async createSharedLink(@CurrentUser('id') userId: string, @Body() dto: SharedLinkDto) {
    return this.sharedLinkService.createSharedLink(userId, dto);
  }

  @Get(':token')
  async findByToken(@Param('token') token: string) {
    return this.sharedLinkService.findByToken(token);
  }

  @Delete(':token')
  async deleteSharedLink(@Param('token') token: string) {
    return this.sharedLinkService.delete(token);
  }
}
