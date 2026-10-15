import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    let dbUrl = process.env.DATABASE_URL;

    // Auto-interpolate DB_PASSWORD if provided
    if (process.env.DB_PASSWORD && process.env.DB_PASSWORD !== 'YOUR_PASSWORD_HERE') {
      if (dbUrl && dbUrl.includes('YOUR_PASSWORD_HERE')) {
        dbUrl = dbUrl.replace('YOUR_PASSWORD_HERE', encodeURIComponent(process.env.DB_PASSWORD));
      } else if (!dbUrl) {
        const user = process.env.DB_USER || 'postgres';
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || '5432';
        const db = process.env.DB_NAME || 'foodrescue';
        dbUrl = `postgresql://${user}:${encodeURIComponent(process.env.DB_PASSWORD)}@${host}:${port}/${db}?schema=public`;
      }
    }

    super({
      datasources: dbUrl ? { db: { url: dbUrl } } : undefined,
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Successfully connected to PostgreSQL database.');
    } catch (error: any) {
      this.logger.warn(
        `Database notice: PostgreSQL connection waiting for valid credentials in backend/.env (${error?.message ?? error}).`
      );
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
