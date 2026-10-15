import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType('DonorStats')
export class DonorStats {
  @Field(() => Int)
  totalDonations!: number;

  @Field(() => Int)
  activeDonations!: number;

  @Field(() => Int)
  completedDonations!: number;

  @Field(() => Int)
  pendingRequests!: number;

  @Field(() => Int)
  totalMealsSaved!: number;
}

@ObjectType('VolunteerStats')
export class VolunteerStats {
  @Field(() => Int)
  availableTasks!: number;

  @Field(() => Int)
  activeTasks!: number;

  @Field(() => Int)
  completedPickups!: number;

  @Field(() => Int)
  todayTasks!: number;
}

@ObjectType('ReceiverStats')
export class ReceiverStats {
  @Field(() => Int)
  availableFood!: number;

  @Field(() => Int)
  pendingRequests!: number;

  @Field(() => Int)
  activeDeliveries!: number;

  @Field(() => Int)
  completedRequests!: number;
}

@ObjectType('PlatformStats')
export class PlatformStats {
  @Field(() => Int)
  totalDonations!: number;

  @Field(() => Int)
  totalMealsRescued!: number;

  @Field(() => Int)
  activeVolunteers!: number;

  @Field(() => Int)
  communityPartners!: number;
}
