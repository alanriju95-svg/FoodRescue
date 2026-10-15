import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRequestInput } from './dto/create-request.input.js';
import { ReceiverStats } from '../common/dto/stats.type.js';
export declare class RequestsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createRequest(receiverId: string, input: CreateRequestInput): Promise<{
        donation: {
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
        };
        receiver: {
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        donationId: string;
        notes: string | null;
        receiverId: string;
        deliveryAddress: string;
    }>;
    findByReceiver(receiverId: string): Promise<({
        donation: {
            pickupTasks: ({
                delivery: {
                    id: string;
                    createdAt: Date;
                    taskId: string;
                    recipientConfirmation: boolean;
                    confirmedAt: Date | null;
                    proofNotes: string | null;
                } | null;
                volunteer: {
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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("@prisma/client").$Enums.PickupStatus;
                donationId: string;
                volunteerId: string;
                notes: string | null;
                pickedUpAt: Date | null;
                deliveredAt: Date | null;
            })[];
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
        };
        receiver: {
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        donationId: string;
        notes: string | null;
        receiverId: string;
        deliveryAddress: string;
    })[]>;
    findById(id: string): Promise<{
        donation: {
            pickupTasks: ({
                delivery: {
                    id: string;
                    createdAt: Date;
                    taskId: string;
                    recipientConfirmation: boolean;
                    confirmedAt: Date | null;
                    proofNotes: string | null;
                } | null;
                volunteer: {
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
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: import("@prisma/client").$Enums.PickupStatus;
                donationId: string;
                volunteerId: string;
                notes: string | null;
                pickedUpAt: Date | null;
                deliveredAt: Date | null;
            })[];
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
        };
        receiver: {
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        donationId: string;
        notes: string | null;
        receiverId: string;
        deliveryAddress: string;
    }>;
    cancelRequest(receiverId: string, id: string): Promise<{
        donation: {
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
        };
        receiver: {
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.RequestStatus;
        donationId: string;
        notes: string | null;
        receiverId: string;
        deliveryAddress: string;
    }>;
    getReceiverStats(receiverId: string): Promise<ReceiverStats>;
}
