import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CollectionModule } from './collection/collection.module';
import { WishModule } from './wish/wish.module';
import { SharedLinkModule } from './shared-link/shared-link.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, CollectionModule, WishModule, SharedLinkModule]
})
export class AppModule {}
