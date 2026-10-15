import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
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
    updateProfile(userId: string, input: UpdateProfileInput): Promise<{
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
