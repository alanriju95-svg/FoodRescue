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
import { IsOptional, IsEnum, IsNumber, Min, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FoodCategory, DonationStatus } from '../../common/enums/index.js';
let UpdateDonationInput = class UpdateDonationInput {
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
    status;
};
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateDonationInput.prototype, "foodName", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateDonationInput.prototype, "description", void 0);
__decorate([
    Field(() => FoodCategory, { nullable: true }),
    IsOptional(),
    IsEnum(FoodCategory),
    __metadata("design:type", String)
], UpdateDonationInput.prototype, "category", void 0);
__decorate([
    Field(() => Float, { nullable: true }),
    IsOptional(),
    IsNumber(),
    Min(0.1),
    __metadata("design:type", Number)
], UpdateDonationInput.prototype, "quantity", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateDonationInput.prototype, "unit", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateDonationInput.prototype, "pickupLocation", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateDonationInput.prototype, "pickupAvailableTime", void 0);
__decorate([
    Field(() => Date, { nullable: true }),
    IsOptional(),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], UpdateDonationInput.prototype, "pickupDeadline", void 0);
__decorate([
    Field(() => Date, { nullable: true }),
    IsOptional(),
    Type(() => Date),
    IsDate(),
    __metadata("design:type", Date)
], UpdateDonationInput.prototype, "expiryDeadline", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateDonationInput.prototype, "storageNotes", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], UpdateDonationInput.prototype, "imageUrl", void 0);
__decorate([
    Field(() => DonationStatus, { nullable: true }),
    IsOptional(),
    IsEnum(DonationStatus),
    __metadata("design:type", String)
], UpdateDonationInput.prototype, "status", void 0);
UpdateDonationInput = __decorate([
    InputType()
], UpdateDonationInput);
export { UpdateDonationInput };
//# sourceMappingURL=update-donation.input.js.map