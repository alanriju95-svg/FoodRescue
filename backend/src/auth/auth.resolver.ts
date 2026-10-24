import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthResponse } from './dto/auth-response.type.js';
import { RegisterInput } from './dto/register.input.js';
import { LoginInput } from './dto/login.input.js';
import { User } from '../users/models/user.model.js';
import { GqlAuthGuard } from './guards/gql-auth.guard.js';
import { CurrentUser } from './decorators/current-user.decorator.js';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { description: 'Register a new user (Donor, Volunteer, or Receiver)' })
  async register(@Args('input', { type: () => RegisterInput }) input: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(input);
  }

  @Mutation(() => AuthResponse, { description: 'Authenticate user and receive JWT access token' })
  async login(@Args('input', { type: () => LoginInput }) input: LoginInput): Promise<AuthResponse> {
    return this.authService.login(input);
  }

  @Query(() => User, { description: 'Get currently authenticated user profile' })
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: any): Promise<User> {
    return user;
  }
}
