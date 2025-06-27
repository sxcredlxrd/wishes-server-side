import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CollectionDto } from './dto/collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CollectionDto) {
    return this.prisma.collection.create({
      data: {
        ...dto,
        userId
      }
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.collection.findMany({
      where: { userId },
      include: {
        wishes: true
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.collection.findUnique({
      where: { id },
      include: {
        wishes: true
      }
    });
  }

  async updateCollection(id: string, dto: UpdateCollectionDto) {
    return this.prisma.collection.update({
      where: { id },
      data: dto
    });
  }

  async removeCollection(id: string) {
    return this.prisma.collection.delete({
      where: { id }
    });
  }
}
