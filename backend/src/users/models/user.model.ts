import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserRole } from '../../common/enums/index.js';

@ObjectType('User')
export class User {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  phone?: string | null;

  @Field(() => UserRole)
  role!: UserRole;

  @Field(() => String, { nullable: true })
  organization?: string | null;

  @Field(() => String, { nullable: true })
  address?: string | null;

  @Field(() => String, { nullable: true })
  city?: string | null;

  @Field(() => String, { nullable: true })
  bio?: string | null;

  @Field(() => String, { nullable: true })
  vehicleType?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
