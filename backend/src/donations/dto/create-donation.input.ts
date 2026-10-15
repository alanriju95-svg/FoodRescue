import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsNumber, Min, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FoodCategory } from '../../common/enums/index.js';

@InputType()
export class CreateDonationInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  foodName!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description!: string;

  @Field(() => FoodCategory)
  @IsEnum(FoodCategory)
  category!: FoodCategory;

  @Field(() => Float)
  @IsNumber()
  @Min(0.1)
  quantity!: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  unit!: string; // meals, kg, boxes, portions

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  pickupLocation!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  pickupAvailableTime!: string; // e.g. "10:00 AM - 2:00 PM"

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  pickupDeadline!: Date;

  @Field(() => Date)
  @Type(() => Date)
  @IsDate()
  expiryDeadline!: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  storageNotes?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
