import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { hash } from 'argon2';
import { AuthDto } from '../auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { collections: true, sharedLinks: true }
    });

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { collections: true, sharedLinks: true }
    });

    return user;
  }

  async createUser(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: await hash(dto.password)
      }
    });
  }
}
