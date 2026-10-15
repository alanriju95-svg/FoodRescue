import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateRequestInput {
  @Field(() => ID)
  @IsNotEmpty()
  donationId!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  deliveryAddress!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;
}
