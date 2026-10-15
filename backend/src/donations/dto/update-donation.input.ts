import { InputType, Field, Float } from '@nestjs/graphql';
import { IsOptional, IsEnum, IsNumber, Min, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FoodCategory, DonationStatus } from '../../common/enums/index.js';

@InputType()
export class UpdateDonationInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  foodName?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => FoodCategory, { nullable: true })
  @IsOptional()
  @IsEnum(FoodCategory)
  category?: FoodCategory;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  quantity?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  unit?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  pickupLocation?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  pickupAvailableTime?: string;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  pickupDeadline?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  expiryDeadline?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  storageNotes?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @Field(() => DonationStatus, { nullable: true })
  @IsOptional()
  @IsEnum(DonationStatus)
  status?: DonationStatus;
}
