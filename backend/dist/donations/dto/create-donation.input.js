var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum, IsNumber, Min, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FoodCategory } from '../../common/enums/index.js';
let CreateDonationInput = class CreateDonationInput {
    foodName;
    description;
    category;
    quantity;
    unit;
    pickupLocation;
    pickupAvailableTime;
    pickupDeadline;
    expiryDeadline;
    storageNotes;
    imageUrl;
};
__decorate([
    Field(() => String),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateDonationInput.prototype, "foodName", void 0);
__decorate([
    Field(() => String),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateDonationInput.prototype, "description", void 0);
__decorate([
    Field(() => FoodCategory),
    IsEnum(FoodCategory),
    __metadata("design:type", String)
], CreateDonationInput.prototype, "category", void 0);
__decorate([
    Field(() => Float),
    IsNumber(),
    Min(0.1),
    __metadata("design:type", Number)
], CreateDonationInput.prototype, "quantity", void 0);
__decorate([
    Field(() => String),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateDonationInput.prototype, "unit", void 0);
__decorate([
    Field(() => String),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateDonationInput.prototype, "pickupLocation", void 0);
__decorate([
    Field(() => String),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateDonationInput.prototype, "pickupAvailableTime", void 0);
__decorate([
    Field(() => Date),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], CreateDonationInput.prototype, "pickupDeadline", void 0);
__decorate([
    Field(() => Date),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], CreateDonationInput.prototype, "expiryDeadline", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateDonationInput.prototype, "storageNotes", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateDonationInput.prototype, "imageUrl", void 0);
CreateDonationInput = __decorate([
    InputType()
], CreateDonationInput);
export { CreateDonationInput };
//# sourceMappingURL=create-donation.input.js.map