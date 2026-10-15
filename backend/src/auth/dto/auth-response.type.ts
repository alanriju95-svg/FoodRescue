import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/models/user.model.js';

@ObjectType('AuthResponse')
export class AuthResponse {
  @Field(() => String)
  accessToken!: string;

  @Field(() => User)
  user!: User;
}
