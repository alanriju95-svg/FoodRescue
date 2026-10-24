import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DonationsService } from './donations.service.js';
import { Donation } from './models/donation.model.js';
import { CreateDonationInput } from './dto/create-donation.input.js';
import { UpdateDonationInput } from './dto/update-donation.input.js';
import { DonationStatus, FoodCategory, UserRole } from '../common/enums/index.js';
import { DonorStats, PlatformStats } from '../common/dto/stats.type.js';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';

@Resolver(() => Donation)
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Query(() => [Donation], { description: 'Get all donations with optional filters' })
  async donations(
    @Args('status', { type: () => DonationStatus, nullable: true }) status?: DonationStatus,
    @Args('category', { type: () => FoodCategory, nullable: true }) category?: FoodCategory,
    @Args('search', { type: () => String, nullable: true }) search?: string,
  ): Promise<Donation[]> {
    return this.donationsService.findAll({ status, category, search }) as any;
  }

  @Query(() => [Donation], { description: 'Get all available surplus food donations for claim/pickup' })
  async availableDonations(): Promise<Donation[]> {
    return this.donationsService.findAvailable() as any;
  }

  @Query(() => Donation, { description: 'Get a single food donation by ID with full lifecycle relations' })
  async donation(@Args('id', { type: () => ID }) id: string): Promise<Donation> {
    return this.donationsService.findById(id) as any;
  }

  @Query(() => [Donation], { description: 'Get donations created by the currently authenticated donor' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.DONOR)
  async myDonations(@CurrentUser() user: any): Promise<Donation[]> {
    return this.donationsService.findByDonor(user.id) as any;
  }

  @Query(() => DonorStats, { description: 'Get donor-specific dashboard statistics' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.DONOR)
  async donorStats(@CurrentUser() user: any): Promise<DonorStats> {
    return this.donationsService.getDonorStats(user.id);
  }

  @Query(() => PlatformStats, { description: 'Get platform-wide sustainability impact statistics' })
  async platformStats(): Promise<PlatformStats> {
    return this.donationsService.getPlatformStats();
  }

  @Mutation(() => Donation, { description: 'Create a new surplus food donation' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.DONOR)
  async createDonation(
    @CurrentUser() user: any,
    @Args('input', { type: () => CreateDonationInput }) input: CreateDonationInput,
  ): Promise<Donation> {
    return this.donationsService.create(user.id, input) as any;
  }

  @Mutation(() => Donation, { description: 'Update an existing food donation' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.DONOR)
  async updateDonation(
    @CurrentUser() user: any,
    @Args('id', { type: () => ID }) id: string,
    @Args('input', { type: () => UpdateDonationInput }) input: UpdateDonationInput,
  ): Promise<Donation> {
    return this.donationsService.update(user.id, id, input) as any;
  }

  @Mutation(() => Donation, { description: 'Cancel an active food donation' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.DONOR)
  async cancelDonation(
    @CurrentUser() user: any,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<Donation> {
    return this.donationsService.cancel(user.id, id) as any;
  }
}
