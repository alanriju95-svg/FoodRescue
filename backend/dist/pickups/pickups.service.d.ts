import { PrismaService } from '../prisma/prisma.service.js';
import { PickupStatus } from '../common/enums/index.js';
import { VolunteerStats } from '../common/dto/stats.type.js';
export declare class PickupsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAvailableTasks(): Promise<({
        pickupTasks: ({
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
        requests: ({
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
        })[];
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
    })[]>;
    getMyTasks(volunteerId: string): Promise<({
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
            requests: ({
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
            })[];
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
    })[]>;
    getMyHistory(volunteerId: string): Promise<({
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
            requests: ({
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
            })[];
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
    })[]>;
    getTaskById(id: string): Promise<{
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
            requests: ({
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
            })[];
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
    }>;
    acceptPickup(volunteerId: string, donationId: string, notes?: string): Promise<{
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
            requests: ({
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
            })[];
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
    }>;
    updatePickupStatus(volunteerId: string, taskId: string, status: PickupStatus): Promise<{
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
            requests: ({
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
            })[];
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
    }>;
    confirmDelivery(volunteerId: string, taskId: string, proofNotes?: string): Promise<{
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
            requests: ({
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
            })[];
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
    }>;
    confirmReceipt(receiverId: string, donationId: string, notes?: string): Promise<({
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
        requests: ({
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
        })[];
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
    }) | null>;
    getVolunteerStats(volunteerId: string): Promise<VolunteerStats>;
}
