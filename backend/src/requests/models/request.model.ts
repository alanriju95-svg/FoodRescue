import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RequestStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';

@ObjectType('DonationRequest')
export class DonationRequest {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  donationId!: string;

  @Field(() => String)
  receiverId!: string;

  @Field(() => String)
  deliveryAddress!: string;

  @Field(() => RequestStatus)
  status!: RequestStatus;

  @Field(() => String, { nullable: true })
  notes?: string | null;

  @Field(() => User, { nullable: true })
  receiver?: User;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
