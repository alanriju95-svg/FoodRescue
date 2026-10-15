import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Delivery')
export class Delivery {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  taskId!: string;

  @Field(() => Boolean)
  recipientConfirmation!: boolean;

  @Field(() => Date, { nullable: true })
  confirmedAt?: Date | null;

  @Field(() => String, { nullable: true })
  proofNotes?: string | null;

  @Field(() => Date)
  createdAt!: Date;
}
