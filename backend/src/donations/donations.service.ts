import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateDonationInput } from './dto/create-donation.input.js';
import { UpdateDonationInput } from './dto/update-donation.input.js';
import {
  DonationStatus,
  FoodCategory,
  UserRole,
  RequestStatus,
} from '../common/enums/index.js';
import { DonorStats, PlatformStats } from '../common/dto/stats.type.js';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(donorId: string, input: CreateDonationInput) {
    return this.prisma.donation.create({
      data: {
        donorId,
        foodName: input.foodName,
        description: input.description,
        category: input.category,
        quantity: input.quantity,
        unit: input.unit,
        pickupLocation: input.pickupLocation,
        pickupAvailableTime: input.pickupAvailableTime,
        pickupDeadline: input.pickupDeadline,
        expiryDeadline: input.expiryDeadline,
        status: DonationStatus.AVAILABLE,
        storageNotes: input.storageNotes,
        imageUrl: input.imageUrl,
      },
      include: {
        donor: true,
      },
    });
  }

  async findAll(filter?: {
    status?: DonationStatus;
    category?: FoodCategory;
    search?: string;
  }) {
    const where: any = {};
    if (filter?.status) {
      where.status = filter.status;
    }
    if (filter?.category) {
      where.category = filter.category;
    }
    if (filter?.search) {
      where.OR = [
        { foodName: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
        { pickupLocation: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    const items = await this.prisma.donation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        donor: true,
        requests: {
          include: { receiver: true },
          orderBy: { createdAt: 'desc' },
        },
        pickupTasks: {
          include: { volunteer: true, delivery: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return items.map((item) => this.attachActiveRelations(item));
  }

  async findAvailable() {
    const items = await this.prisma.donation.findMany({
      where: {
        status: DonationStatus.AVAILABLE,
        expiryDeadline: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        donor: true,
        requests: {
          include: { receiver: true },
        },
        pickupTasks: {
          include: { volunteer: true, delivery: true },
        },
      },
    });

    return items.map((item) => this.attachActiveRelations(item));
  }

  async findByDonor(donorId: string) {
    const items = await this.prisma.donation.findMany({
      where: { donorId },
      orderBy: { createdAt: 'desc' },
      include: {
        donor: true,
        requests: {
          include: { receiver: true },
          orderBy: { createdAt: 'desc' },
        },
        pickupTasks: {
          include: { volunteer: true, delivery: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return items.map((item) => this.attachActiveRelations(item));
  }

  async findById(id: string) {
    const item = await this.prisma.donation.findUnique({
      where: { id },
      include: {
        donor: true,
        requests: {
          include: { receiver: true },
          orderBy: { createdAt: 'desc' },
        },
        pickupTasks: {
          include: { volunteer: true, delivery: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!item) {
      throw new NotFoundException(`Donation with ID ${id} not found`);
    }

    return this.attachActiveRelations(item);
  }

  async update(donorId: string, id: string, input: UpdateDonationInput) {
    const donation = await this.findById(id);
    if (donation.donorId !== donorId) {
      throw new ForbiddenException('You are not authorized to modify this donation');
    }

    if (
      donation.status === DonationStatus.COMPLETED ||
      donation.status === DonationStatus.DELIVERED
    ) {
      throw new BadRequestException('Cannot edit a delivered or completed donation');
    }

    const updated = await this.prisma.donation.update({
      where: { id },
      data: {
        ...(input.foodName && { foodName: input.foodName }),
        ...(input.description && { description: input.description }),
        ...(input.category && { category: input.category }),
        ...(input.quantity !== undefined && { quantity: input.quantity }),
        ...(input.unit && { unit: input.unit }),
        ...(input.pickupLocation && { pickupLocation: input.pickupLocation }),
        ...(input.pickupAvailableTime && { pickupAvailableTime: input.pickupAvailableTime }),
        ...(input.pickupDeadline && { pickupDeadline: input.pickupDeadline }),
        ...(input.expiryDeadline && { expiryDeadline: input.expiryDeadline }),
        ...(input.storageNotes !== undefined && { storageNotes: input.storageNotes }),
        ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
      },
      include: {
        donor: true,
        requests: { include: { receiver: true } },
        pickupTasks: { include: { volunteer: true, delivery: true } },
      },
    });

    return this.attachActiveRelations(updated);
  }

  async cancel(donorId: string, id: string) {
    const donation = await this.findById(id);
    if (donation.donorId !== donorId) {
      throw new ForbiddenException('You are not authorized to cancel this donation');
    }

    if (
      donation.status === DonationStatus.PICKED_UP ||
      donation.status === DonationStatus.DELIVERED ||
      donation.status === DonationStatus.COMPLETED
    ) {
      throw new BadRequestException(
        `Cannot cancel donation that is currently ${donation.status}. The food has already been collected.`
      );
    }

    const updated = await this.prisma.donation.update({
      where: { id },
      data: {
        status: DonationStatus.CANCELLED,
      },
      include: {
        donor: true,
        requests: { include: { receiver: true } },
        pickupTasks: { include: { volunteer: true, delivery: true } },
      },
    });

    return this.attachActiveRelations(updated);
  }

  async getDonorStats(donorId: string): Promise<DonorStats> {
    const totalDonations = await this.prisma.donation.count({
      where: { donorId },
    });

    const activeDonations = await this.prisma.donation.count({
      where: {
        donorId,
        status: {
          in: [
            DonationStatus.AVAILABLE,
            DonationStatus.REQUESTED,
            DonationStatus.PICKUP_ASSIGNED,
            DonationStatus.PICKED_UP,
          ],
        },
      },
    });

    const completedDonations = await this.prisma.donation.count({
      where: {
        donorId,
        status: DonationStatus.COMPLETED,
      },
    });

    const pendingRequests = await this.prisma.donationRequest.count({
      where: {
        donation: { donorId },
        status: RequestStatus.PENDING,
      },
    });

    const completedItems = await this.prisma.donation.findMany({
      where: {
        donorId,
        status: DonationStatus.COMPLETED,
      },
      select: { quantity: true },
    });

    const totalMealsSaved = Math.round(
      completedItems.reduce((acc, curr) => acc + (curr.quantity || 0), 0)
    );

    return {
      totalDonations,
      activeDonations,
      completedDonations,
      pendingRequests,
      totalMealsSaved,
    };
  }

  async getPlatformStats(): Promise<PlatformStats> {
    const totalDonations = await this.prisma.donation.count();
    const completedItems = await this.prisma.donation.findMany({
      where: { status: DonationStatus.COMPLETED },
      select: { quantity: true },
    });
    const totalMealsRescued = Math.round(
      completedItems.reduce((acc, curr) => acc + (curr.quantity || 0), 0)
    );
    const activeVolunteers = await this.prisma.user.count({
      where: { role: UserRole.VOLUNTEER },
    });
    const communityPartners = await this.prisma.user.count({
      where: { role: { in: [UserRole.DONOR, UserRole.RECEIVER] } },
    });

    return {
      totalDonations,
      totalMealsRescued,
      activeVolunteers,
      communityPartners,
    };
  }

  private attachActiveRelations(donation: any) {
    const activeRequest =
      donation.requests && donation.requests.length > 0
        ? donation.requests[0]
        : null;
    const activeTask =
      donation.pickupTasks && donation.pickupTasks.length > 0
        ? donation.pickupTasks[0]
        : null;

    return {
      ...donation,
      currentRequest: activeRequest,
      currentTask: activeTask,
    };
  }
}
