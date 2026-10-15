import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRequestInput } from './dto/create-request.input.js';
import { DonationStatus, RequestStatus, PickupStatus } from '../common/enums/index.js';
import { ReceiverStats } from '../common/dto/stats.type.js';

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRequest(receiverId: string, input: CreateRequestInput) {
    const donation = await this.prisma.donation.findUnique({
      where: { id: input.donationId },
    });

    if (!donation) {
      throw new NotFoundException('Donation not found');
    }

    if (donation.status !== DonationStatus.AVAILABLE) {
      throw new BadRequestException(
        `Cannot request this food item: it is currently ${donation.status}`
      );
    }

    // Create the request and transition donation status to REQUESTED
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

  async findByReceiver(receiverId: string) {
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

  async findById(id: string) {
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

  async cancelRequest(receiverId: string, id: string) {
    const request = await this.findById(id);
    if (request.receiverId !== receiverId) {
      throw new ForbiddenException('Not authorized to cancel this request');
    }

    if (
      request.donation.status === DonationStatus.PICKED_UP ||
      request.donation.status === DonationStatus.DELIVERED ||
      request.donation.status === DonationStatus.COMPLETED
    ) {
      throw new BadRequestException(
        'Cannot cancel request: the food is already in transit or has been delivered'
      );
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

  async getReceiverStats(receiverId: string): Promise<ReceiverStats> {
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
}
