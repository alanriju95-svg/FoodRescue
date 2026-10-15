import { Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service.js';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validate(payload: {
        sub: string;
        email: string;
        role: string;
    }): Promise<{
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        phone: string | null;
        organization: string | null;
        address: string | null;
        city: string | null;
        vehicleType: string | null;
        id: string;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
        passwordHash: string;
    }>;
}
export {};
