import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RequestsService } from './requests.service.js';
import { DonationRequest } from './models/request.model.js';
import { Donation } from '../donations/models/donation.model.js';
import { CreateRequestInput } from './dto/create-request.input.js';
import { ReceiverStats } from '../common/dto/stats.type.js';
import { UserRole } from '../common/enums/index.js';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';

@Resolver(() => DonationRequest)
export class RequestsResolver {
  constructor(private readonly requestsService: RequestsService) {}

  @ResolveField(() => Donation, { nullable: true })
  async donation(@Parent() request: DonationRequest & { donation?: Donation }): Promise<Donation | null> {
    if (request.donation) {
      return request.donation;
    }
    return this.requestsService.getDonationForRequest(request.donationId) as any;
  }

  @Query(() => [DonationRequest], { description: 'Get all requests made by the currently authenticated receiver' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RECEIVER)
  async myRequests(@CurrentUser() user: any): Promise<DonationRequest[]> {
    return this.requestsService.findByReceiver(user.id) as any;
  }

  @Query(() => DonationRequest, { description: 'Get request details by ID' })
  @UseGuards(GqlAuthGuard)
  async donationRequest(@Args('id', { type: () => ID }) id: string): Promise<DonationRequest> {
    return this.requestsService.findById(id) as any;
  }

  @Query(() => ReceiverStats, { description: 'Get receiver dashboard statistics' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RECEIVER)
  async receiverStats(@CurrentUser() user: any): Promise<ReceiverStats> {
    return this.requestsService.getReceiverStats(user.id);
  }

  @Mutation(() => DonationRequest, { description: 'Request available surplus food for pickup and delivery' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RECEIVER)
  async requestDonation(
    @CurrentUser() user: any,
    @Args('input', { type: () => CreateRequestInput }) input: CreateRequestInput,
  ): Promise<DonationRequest> {
    return this.requestsService.createRequest(user.id, input) as any;
  }

  @Mutation(() => DonationRequest, { description: 'Cancel an active pending food request' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.RECEIVER)
  async cancelRequest(
    @CurrentUser() user: any,
    @Args('id', { type: () => ID }) id: string,
  ): Promise<DonationRequest> {
    return this.requestsService.cancelRequest(user.id, id) as any;
  }

  @Mutation(() => DonationRequest, { description: 'Donor accepts an incoming food request from a receiver' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(UserRole.DONOR)
  async acceptRequest(
    @CurrentUser() user: any,
    @Args('requestId', { type: () => ID }) requestId: string,
  ): Promise<DonationRequest> {
    return this.requestsService.acceptRequest(user.id, requestId) as any;
  }
}
