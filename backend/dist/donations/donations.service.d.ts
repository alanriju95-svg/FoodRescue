import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDonationInput } from './dto/create-donation.input.js';
import { UpdateDonationInput } from './dto/update-donation.input.js';
import { DonationStatus, FoodCategory } from '../common/enums/index.js';
import { DonorStats, PlatformStats } from '../common/dto/stats.type.js';
export declare class DonationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(donorId: string, input: CreateDonationInput): Promise<{
        donor: {
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
        };
    } & {
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        foodName: string;
        category: import("@prisma/client").$Enums.FoodCategory;
        quantity: number;
        unit: string;
        pickupLocation: string;
        pickupAvailableTime: string;
        pickupDeadline: Date;
        expiryDeadline: Date;
        storageNotes: string | null;
        imageUrl: string | null;
        status: import("@prisma/client").$Enums.DonationStatus;
        donorId: string;
    }>;
    findAll(filter?: {
        status?: DonationStatus;
        category?: FoodCategory;
        search?: string;
    }): Promise<any[]>;
    findAvailable(): Promise<any[]>;
    findByDonor(donorId: string): Promise<any[]>;
    findById(id: string): Promise<any>;
    update(donorId: string, id: string, input: UpdateDonationInput): Promise<any>;
    cancel(donorId: string, id: string): Promise<any>;
    getDonorStats(donorId: string): Promise<DonorStats>;
    getPlatformStats(): Promise<PlatformStats>;
    private attachActiveRelations;
}
