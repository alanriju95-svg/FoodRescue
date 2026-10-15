import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { FoodCategory, DonationStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
import { DonationRequest } from '../../requests/models/request.model.js';
import { PickupTask } from '../../pickups/models/pickup-task.model.js';

@ObjectType('Donation')
export class Donation {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  donorId!: string;

  @Field(() => String)
  foodName!: string;

  @Field(() => String)
  description!: string;

  @Field(() => FoodCategory)
  category!: FoodCategory;

  @Field(() => Float)
  quantity!: number;

  @Field(() => String)
  unit!: string;

  @Field(() => String)
  pickupLocation!: string;

  @Field(() => String)
  pickupAvailableTime!: string;

  @Field(() => Date)
  pickupDeadline!: Date;

  @Field(() => Date)
  expiryDeadline!: Date;

  @Field(() => DonationStatus)
  status!: DonationStatus;

  @Field(() => String, { nullable: true })
  storageNotes?: string | null;

  @Field(() => String, { nullable: true })
  imageUrl?: string | null;

  @Field(() => User, { nullable: true })
  donor?: User;

  @Field(() => [DonationRequest], { nullable: 'itemsAndList' })
  requests?: DonationRequest[];

  @Field(() => [PickupTask], { nullable: 'itemsAndList' })
  pickupTasks?: PickupTask[];

  @Field(() => DonationRequest, { nullable: true })
  currentRequest?: DonationRequest | null;

  @Field(() => PickupTask, { nullable: true })
  currentTask?: PickupTask | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
