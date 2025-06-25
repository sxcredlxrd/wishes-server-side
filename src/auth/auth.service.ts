import { BadGatewayException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma.service';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';

type JwtPayload = {
  id: string;
  username: string;
  email: string;
};

type TokenPair = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.userService.getByEmail(dto.email);

    if (oldUser) throw new BadGatewayException('Пользователь уже существует');

    const user = await this.userService.createUser(dto);
    const tokens = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    let payload: JwtPayload;

    try {
      payload = await this.jwt.verifyAsync(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Невалидный или истекший refreshToken', error);
    }

    if (!payload || !payload.id) {
      throw new UnauthorizedException('Невалидный refreshToken');
    }

    const user = await this.userService.getById(payload.id);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const tokens: TokenPair = this.issueTokens(user.id);

    return { user, ...tokens };
  }

  issueTokens(userId: string): TokenPair {
    const data = { id: userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h'
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d'
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);

    if (!user) throw new NotFoundException('Пользователь не найден');

    return user;
  }

  async validateOAuthLogin(req: any) {
    let user = await this.userService.getByEmail(req.user.email);

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: req.user.email,
          username: req.user.username,
          avatar: req.user.avatar
        },
        include: {
          collections: true,
          sharedLinks: true
        }
      });
    }

    const tokens = this.issueTokens(user.id);
    return { user, ...tokens };
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: expiresIn,
      secure: true,
      sameSite: 'none'
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: this.configService.get('SERVER_DOMAIN'),
      expires: new Date(0),
      secure: true,
      sameSite: 'none'
    });
  }
}
