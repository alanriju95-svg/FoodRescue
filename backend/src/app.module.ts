import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { DonationsModule } from './donations/donations.module.js';
import { RequestsModule } from './requests/requests.module.js';
import { PickupsModule } from './pickups/pickups.module.js';

@Module({
  imports: [
    // Load .env variables globally and first, before any other module
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req, res }: { req: any; res: any }) => ({ req, res }),
    }),
    AuthModule,
    UsersModule,
    DonationsModule,
    RequestsModule,
    PickupsModule,
  ],
})
export class AppModule {}
