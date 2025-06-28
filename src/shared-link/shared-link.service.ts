import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SharedLinkDto } from './dto/shared-link.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class SharedLinkService {
  constructor(private readonly prisma: PrismaService) {}

  async createSharedLink(userId: string, dto: SharedLinkDto) {
    const token = nanoid();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    return this.prisma.sharedLink.create({
      data: {
        token,
        userId,
        ...dto,
        expiresAt
      }
    });
  }

  async findByToken(token: string) {
    return this.prisma.sharedLink.findUnique({
      where: { token },
      include: {
        collection: {
          include: {
            wishes: true
          }
        }
      }
    });
  }

  async delete(token: string) {
    return this.prisma.sharedLink.delete({
      where: { token }
    });
  }
}
