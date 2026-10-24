import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { JwtStrategy } from './jwt.strategy.js';
import { GqlAuthGuard } from './guards/gql-auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Use registerAsync so JWT_SECRET is read after ConfigModule has loaded .env
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET') || 'foodrescue_super_secure_jwt_secret_key_2026_antigravity',
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard, RolesGuard],
  exports: [AuthService, GqlAuthGuard, RolesGuard, JwtModule, PassportModule],
})
export class AuthModule {}

