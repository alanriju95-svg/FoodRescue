import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PickupsService } from './pickups.service.js';
import { PickupTask } from './models/pickup-task.model.js';
import { Donation } from '../donations/models/donation.model.js';
import { VolunteerStats } from '../common/dto/stats.type.js';
import { UserRole, PickupStatus } from '../common/enums/index.js';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';

@Resolver(() => PickupTask)
export class PickupsResolver {
  constructor(private readonly pickupsService: PickupsService) {}

  @Query(() => [Donation], { description: 'Get surplus food donations waiting for volunteer pickup assignment' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.VOLUNTEER)
  async availablePickupTasks(): Promise<Donation[]> {
    return this.pickupsService.getAvailableTasks() as any;
  }

  @Query(() => [PickupTask], { description: 'Get active pickup tasks assigned to the current volunteer' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.VOLUNTEER)
  async myTasks(@CurrentUser() user: any): Promise<PickupTask[]> {
    return this.pickupsService.getMyTasks(user.id) as any;
  }

  @Query(() => [PickupTask], { description: 'Get completed tasks history for the current volunteer' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.VOLUNTEER)
  async myTaskHistory(@CurrentUser() user: any): Promise<PickupTask[]> {
    return this.pickupsService.getMyHistory(user.id) as any;
  }

  @Query(() => PickupTask, { description: 'Get task details by ID' })
  @UseGuards(GqlAuthGuard)
  async pickupTask(@Args('id', { type: () => ID }) id: string): Promise<PickupTask> {
    return this.pickupsService.getTaskById(id) as any;
  }

  @Query(() => VolunteerStats, { description: 'Get volunteer dashboard statistics' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.VOLUNTEER)
  async volunteerStats(@CurrentUser() user: any): Promise<VolunteerStats> {
    return this.pickupsService.getVolunteerStats(user.id);
  }

  @Mutation(() => PickupTask, { description: 'Accept a pickup task for a surplus food donation' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.VOLUNTEER)
  async acceptPickup(
    @CurrentUser() user: any,
    @Args('donationId', { type: () => ID }) donationId: string,
    @Args('notes', { type: () => String, nullable: true }) notes?: string,
  ): Promise<PickupTask> {
    return this.pickupsService.acceptPickup(user.id, donationId, notes) as any;
  }

  @Mutation(() => PickupTask, { description: 'Update pickup status (e.g. mark food PICKED_UP from donor)' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.VOLUNTEER)
  async updatePickupStatus(
    @CurrentUser() user: any,
    @Args('taskId', { type: () => ID }) taskId: string,
    @Args('status', { type: () => PickupStatus }) status: PickupStatus,
  ): Promise<PickupTask> {
    return this.pickupsService.updatePickupStatus(user.id, taskId, status) as any;
  }

  @Mutation(() => PickupTask, { description: 'Confirm that food has been safely delivered to receiver' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.VOLUNTEER)
  async confirmDelivery(
    @CurrentUser() user: any,
    @Args('taskId', { type: () => ID }) taskId: string,
    @Args('proofNotes', { type: () => String, nullable: true }) proofNotes?: string,
  ): Promise<PickupTask> {
    return this.pickupsService.confirmDelivery(user.id, taskId, proofNotes) as any;
  }

  @Mutation(() => Donation, { description: 'Receiver confirms receipt of delivered food, completing the journey' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RECEIVER)
  async confirmReceipt(
    @CurrentUser() user: any,
    @Args('donationId', { type: () => ID }) donationId: string,
    @Args('notes', { type: () => String, nullable: true }) notes?: string,
  ): Promise<Donation> {
    return this.pickupsService.confirmReceipt(user.id, donationId, notes) as any;
  }
}
