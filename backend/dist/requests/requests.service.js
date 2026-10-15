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
import { DonationStatus, RequestStatus } from '../common/enums/index.js';
let RequestsService = class RequestsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRequest(receiverId, input) {
        const donation = await this.prisma.donation.findUnique({
            where: { id: input.donationId },
        });
        if (!donation) {
            throw new NotFoundException('Donation not found');
        }
        if (donation.status !== DonationStatus.AVAILABLE) {
            throw new BadRequestException(`Cannot request this food item: it is currently ${donation.status}`);
        }
        const [request] = await this.prisma.$transaction([
            this.prisma.donationRequest.create({
                data: {
                    donationId: input.donationId,
                    receiverId,
                    deliveryAddress: input.deliveryAddress,
                    notes: input.notes,
                    status: RequestStatus.PENDING,
                },
                include: {
                    receiver: true,
                    donation: {
                        include: { donor: true },
                    },
                },
            }),
            this.prisma.donation.update({
                where: { id: input.donationId },
                data: { status: DonationStatus.REQUESTED },
            }),
        ]);
        return request;
    }
    async findByReceiver(receiverId) {
        return this.prisma.donationRequest.findMany({
            where: { receiverId },
            orderBy: { createdAt: 'desc' },
            include: {
                receiver: true,
                donation: {
                    include: {
                        donor: true,
                        pickupTasks: {
                            include: { volunteer: true, delivery: true },
                        },
                    },
                },
            },
        });
    }
    async findById(id) {
        const req = await this.prisma.donationRequest.findUnique({
            where: { id },
            include: {
                receiver: true,
                donation: {
                    include: {
                        donor: true,
                        pickupTasks: {
                            include: { volunteer: true, delivery: true },
                        },
                    },
                },
            },
        });
        if (!req) {
            throw new NotFoundException(`Donation request with ID ${id} not found`);
        }
        return req;
    }
    async cancelRequest(receiverId, id) {
        const request = await this.findById(id);
        if (request.receiverId !== receiverId) {
            throw new ForbiddenException('Not authorized to cancel this request');
        }
        if (request.donation.status === DonationStatus.PICKED_UP ||
            request.donation.status === DonationStatus.DELIVERED ||
            request.donation.status === DonationStatus.COMPLETED) {
            throw new BadRequestException('Cannot cancel request: the food is already in transit or has been delivered');
        }
        const [updated] = await this.prisma.$transaction([
            this.prisma.donationRequest.update({
                where: { id },
                data: { status: RequestStatus.CANCELLED },
                include: { receiver: true, donation: true },
            }),
            this.prisma.donation.update({
                where: { id: request.donationId },
                data: { status: DonationStatus.AVAILABLE },
            }),
        ]);
        return updated;
    }
    async getReceiverStats(receiverId) {
        const availableFood = await this.prisma.donation.count({
            where: {
                status: DonationStatus.AVAILABLE,
                expiryDeadline: { gt: new Date() },
            },
        });
        const pendingRequests = await this.prisma.donationRequest.count({
            where: {
                receiverId,
                status: RequestStatus.PENDING,
            },
        });
        const activeDeliveries = await this.prisma.donationRequest.count({
            where: {
                receiverId,
                donation: {
                    status: {
                        in: [
                            DonationStatus.REQUESTED,
                            DonationStatus.PICKUP_ASSIGNED,
                            DonationStatus.PICKED_UP,
                            DonationStatus.DELIVERED,
                        ],
                    },
                },
                status: { not: RequestStatus.CANCELLED },
            },
        });
        const completedRequests = await this.prisma.donationRequest.count({
            where: {
                receiverId,
                donation: {
                    status: DonationStatus.COMPLETED,
                },
            },
        });
        return {
            availableFood,
            pendingRequests,
            activeDeliveries,
            completedRequests,
        };
    }
};
RequestsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], RequestsService);
export { RequestsService };
//# sourceMappingURL=requests.service.js.map