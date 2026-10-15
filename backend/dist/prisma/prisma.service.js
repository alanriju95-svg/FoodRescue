var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PrismaService_1;
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
let PrismaService = PrismaService_1 = class PrismaService extends PrismaClient {
    logger = new Logger(PrismaService_1.name);
    constructor() {
        let dbUrl = process.env.DATABASE_URL;
        if (process.env.DB_PASSWORD && process.env.DB_PASSWORD !== 'YOUR_PASSWORD_HERE') {
            if (dbUrl && dbUrl.includes('YOUR_PASSWORD_HERE')) {
                dbUrl = dbUrl.replace('YOUR_PASSWORD_HERE', encodeURIComponent(process.env.DB_PASSWORD));
            }
            else if (!dbUrl) {
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
        }
        catch (error) {
            this.logger.warn(`Database notice: PostgreSQL connection waiting for valid credentials in backend/.env (${error?.message ?? error}).`);
        }
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
PrismaService = PrismaService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], PrismaService);
export { PrismaService };
//# sourceMappingURL=prisma.service.js.map