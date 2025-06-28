import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WishDto } from './dto/wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishService {
  constructor(private readonly prisma: PrismaService) {}

  async createWish(collectionId: string, dto: WishDto) {
    return this.prisma.wish.create({
      data: {
        ...dto,
        collectionId
      }
    });
  }

  async findAllByCollection(collectionId: string) {
    return this.prisma.wish.findMany({
      where: {
        collectionId: collectionId
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.wish.findUnique({
      where: {
        id
      }
    });
  }

  async updateWish(id: string, dto: UpdateWishDto) {
    return this.prisma.wish.update({
      where: { id },
      data: dto
    });
  }

  async deleteWish(id: string) {
    return this.prisma.wish.delete({
      where: { id }
    });
  }
}
