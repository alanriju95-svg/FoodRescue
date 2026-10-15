import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterInput } from './dto/register.input.js';
import { LoginInput } from './dto/login.input.js';
import { AuthResponse } from './dto/auth-response.type.js';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(input: RegisterInput): Promise<AuthResponse>;
    login(input: LoginInput): Promise<AuthResponse>;
    validateUser(userId: string): Promise<{
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
    } | null>;
}
