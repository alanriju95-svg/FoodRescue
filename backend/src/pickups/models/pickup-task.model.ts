import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PickupStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
import { Delivery } from '../../deliveries/models/delivery.model.js';

@ObjectType('PickupTask')
export class PickupTask {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  donationId!: string;

  @Field(() => String)
  volunteerId!: string;

  @Field(() => PickupStatus)
  status!: PickupStatus;

  @Field(() => String, { nullable: true })
  notes?: string | null;

  @Field(() => Date, { nullable: true })
  pickedUpAt?: Date | null;

  @Field(() => Date, { nullable: true })
  deliveredAt?: Date | null;

  @Field(() => User, { nullable: true })
  volunteer?: User;

  @Field(() => Delivery, { nullable: true })
  delivery?: Delivery | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
