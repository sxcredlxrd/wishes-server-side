import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { WishService } from './wish.service';
import { AuthGuard } from '@nestjs/passport';
import { WishDto } from './dto/wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@UseGuards(AuthGuard)
@Controller('wish')
export class WishController {
  constructor(private readonly wishService: WishService) {}

  @Post(':collectionId')
  async createWish(@Param('collectionId') collectionId: string, @Body() dto: WishDto) {
    return this.wishService.createWish(collectionId, dto);
  }

  @Get('by-collection/:collectionId')
  async findAllByCollection(@Param('collectionId') collectionId: string) {
    return this.wishService.findAllByCollection(collectionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.wishService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateWishDto) {
    return this.wishService.updateWish(id, dto);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.wishService.deleteWish(id);
  }
}
