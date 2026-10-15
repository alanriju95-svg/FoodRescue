import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../common/enums/index.js';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @MinLength(6)
  password!: string;

  @Field(() => String)
  @IsNotEmpty()
  name!: string;

  @Field(() => UserRole)
  @IsEnum(UserRole)
  role!: UserRole;

  @Field(() => String, { nullable: true })
  @IsOptional()
  phone?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  organization?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  address?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  city?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  vehicleType?: string;
}
