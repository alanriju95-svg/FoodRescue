var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException, ForbiddenException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { DonationStatus, PickupStatus, RequestStatus, } from '../common/enums/index.js';
let PickupsService = class PickupsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAvailableTasks() {
        return this.prisma.donation.findMany({
            where: {
                status: { in: [DonationStatus.REQUESTED, DonationStatus.AVAILABLE] },
                expiryDeadline: { gt: new Date() },
            },
            orderBy: { createdAt: 'desc' },
            include: {
                donor: true,
                requests: {
                    include: { receiver: true },
                    orderBy: { createdAt: 'desc' },
                },
                pickupTasks: {
                    include: { volunteer: true },
                },
            },
        });
    }
    async getMyTasks(volunteerId) {
        return this.prisma.pickupTask.findMany({
            where: {
                volunteerId,
                status: { in: [PickupStatus.ASSIGNED, PickupStatus.PICKED_UP] },
            },
            orderBy: { createdAt: 'desc' },
            include: {
                volunteer: true,
                delivery: true,
                donation: {
                    include: {
                        donor: true,
                        requests: {
                            include: { receiver: true },
                            orderBy: { createdAt: 'desc' },
                        },
                    },
                },
            },
        });
    }
    async getMyHistory(volunteerId) {
        return this.prisma.pickupTask.findMany({
            where: {
                volunteerId,
                status: { in: [PickupStatus.DELIVERED] },
            },
            orderBy: { deliveredAt: 'desc' },
            include: {
                volunteer: true,
                delivery: true,
                donation: {
                    include: {
                        donor: true,
                        requests: {
                            include: { receiver: true },
                            orderBy: { createdAt: 'desc' },
                        },
                    },
                },
            },
        });
    }
    async getTaskById(id) {
        const task = await this.prisma.pickupTask.findUnique({
            where: { id },
            include: {
                volunteer: true,
                delivery: true,
                donation: {
                    include: {
                        donor: true,
                        requests: {
                            include: { receiver: true },
                            orderBy: { createdAt: 'desc' },
                        },
                    },
                },
            },
        });
        if (!task) {
            throw new NotFoundException(`Pickup task with ID ${id} not found`);
        }
        return task;
    }
    async acceptPickup(volunteerId, donationId, notes) {
        const donation = await this.prisma.donation.findUnique({
            where: { id: donationId },
            include: { pickupTasks: true },
        });
        if (!donation) {
            throw new NotFoundException('Donation not found');
        }
        if (donation.status !== DonationStatus.REQUESTED &&
            donation.status !== DonationStatus.AVAILABLE) {
            throw new BadRequestException(`Cannot accept pickup task: donation is currently ${donation.status}`);
        }
        const activeTask = donation.pickupTasks.find((t) => t.status === PickupStatus.ASSIGNED || t.status === PickupStatus.PICKED_UP);
        if (activeTask) {
            throw new BadRequestException('A volunteer has already been assigned to this donation');
        }
        const [task] = await this.prisma.$transaction([
            this.prisma.pickupTask.create({
                data: {
                    donationId,
                    volunteerId,
                    status: PickupStatus.ASSIGNED,
                    notes,
                },
                include: {
                    volunteer: true,
                    donation: {
                        include: {
                            donor: true,
                            requests: { include: { receiver: true } },
                        },
                    },
                },
            }),
            this.prisma.donation.update({
                where: { id: donationId },
                data: { status: DonationStatus.PICKUP_ASSIGNED },
            }),
        ]);
        return task;
    }
    async updatePickupStatus(volunteerId, taskId, status) {
        const task = await this.getTaskById(taskId);
        if (task.volunteerId !== volunteerId) {
            throw new ForbiddenException('You are not assigned to this pickup task');
        }
        if (status === PickupStatus.PICKED_UP) {
            if (task.donation.status !== DonationStatus.PICKUP_ASSIGNED) {
                throw new BadRequestException(`Invalid state transition: Cannot mark food PICKED_UP when current state is ${task.donation.status}`);
            }
            const [updatedTask] = await this.prisma.$transaction([
                this.prisma.pickupTask.update({
                    where: { id: taskId },
                    data: {
                        status: PickupStatus.PICKED_UP,
                        pickedUpAt: new Date(),
                    },
                    include: {
                        volunteer: true,
                        delivery: true,
                        donation: {
                            include: {
                                donor: true,
                                requests: { include: { receiver: true } },
                            },
                        },
                    },
                }),
                this.prisma.donation.update({
                    where: { id: task.donationId },
                    data: { status: DonationStatus.PICKED_UP },
                }),
            ]);
            return updatedTask;
        }
        throw new BadRequestException(`Direct transition to status ${status} is not supported via this mutation`);
    }
    async confirmDelivery(volunteerId, taskId, proofNotes) {
        const task = await this.getTaskById(taskId);
        if (task.volunteerId !== volunteerId) {
            throw new ForbiddenException('You are not assigned to this pickup task');
        }
        if (task.donation.status !== DonationStatus.PICKED_UP) {
            throw new BadRequestException(`Invalid state transition: Cannot confirm delivery before food has been marked PICKED_UP. Current status: ${task.donation.status}`);
        }
        const now = new Date();
        const [updatedTask] = await this.prisma.$transaction([
            this.prisma.pickupTask.update({
                where: { id: taskId },
                data: {
                    status: PickupStatus.DELIVERED,
                    deliveredAt: now,
                },
                include: {
                    volunteer: true,
                    donation: {
                        include: {
                            donor: true,
                            requests: { include: { receiver: true } },
                        },
                    },
                },
            }),
            this.prisma.donation.update({
                where: { id: task.donationId },
                data: { status: DonationStatus.DELIVERED },
            }),
            this.prisma.delivery.upsert({
                where: { taskId },
                create: {
                    taskId,
                    proofNotes,
                    recipientConfirmation: false,
                },
                update: {
                    proofNotes,
                },
            }),
        ]);
        return this.getTaskById(taskId);
    }
    async confirmReceipt(receiverId, donationId, notes) {
        const donation = await this.prisma.donation.findUnique({
            where: { id: donationId },
            include: {
                requests: { where: { receiverId } },
                pickupTasks: { include: { delivery: true } },
            },
        });
        if (!donation) {
            throw new NotFoundException('Donation not found');
        }
        if (donation.requests.length === 0) {
            throw new ForbiddenException('You have not requested this donation');
        }
        if (donation.status !== DonationStatus.DELIVERED) {
            throw new BadRequestException(`Cannot confirm receipt: food has not been delivered yet. Current status is ${donation.status}`);
        }
        const activeTask = donation.pickupTasks[0];
        const requestId = donation.requests[0].id;
        const now = new Date();
        const ops = [
            this.prisma.donation.update({
                where: { id: donationId },
                data: { status: DonationStatus.COMPLETED },
            }),
            this.prisma.donationRequest.update({
                where: { id: requestId },
                data: { status: RequestStatus.FULFILLED },
            }),
        ];
        if (activeTask) {
            ops.push(this.prisma.delivery.upsert({
                where: { taskId: activeTask.id },
                create: {
                    taskId: activeTask.id,
                    recipientConfirmation: true,
                    confirmedAt: now,
                    proofNotes: notes,
                },
                update: {
                    recipientConfirmation: true,
                    confirmedAt: now,
                    proofNotes: notes,
                },
            }));
        }
        await this.prisma.$transaction(ops);
        return this.prisma.donation.findUnique({
            where: { id: donationId },
            include: {
                donor: true,
                requests: { include: { receiver: true } },
                pickupTasks: { include: { volunteer: true, delivery: true } },
            },
        });
    }
    async getVolunteerStats(volunteerId) {
        const availableTasks = await this.prisma.donation.count({
            where: {
                status: { in: [DonationStatus.REQUESTED, DonationStatus.AVAILABLE] },
                expiryDeadline: { gt: new Date() },
            },
        });
        const activeTasks = await this.prisma.pickupTask.count({
            where: {
                volunteerId,
                status: { in: [PickupStatus.ASSIGNED, PickupStatus.PICKED_UP] },
            },
        });
        const completedPickups = await this.prisma.pickupTask.count({
            where: {
                volunteerId,
                status: PickupStatus.DELIVERED,
            },
        });
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTasks = await this.prisma.pickupTask.count({
            where: {
                volunteerId,
                createdAt: { gte: today },
            },
        });
        return {
            availableTasks,
            activeTasks,
            completedPickups,
            todayTasks,
        };
    }
};
PickupsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], PickupsService);
export { PickupsService };
//# sourceMappingURL=pickups.service.js.map