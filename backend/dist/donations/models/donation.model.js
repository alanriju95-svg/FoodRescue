var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { FoodCategory, DonationStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
import { DonationRequest } from '../../requests/models/request.model.js';
import { PickupTask } from '../../pickups/models/pickup-task.model.js';
let Donation = class Donation {
    id;
    donorId;
    foodName;
    description;
    category;
    quantity;
    unit;
    pickupLocation;
    pickupAvailableTime;
    pickupDeadline;
    expiryDeadline;
    status;
    storageNotes;
    imageUrl;
    donor;
    requests;
    pickupTasks;
    currentRequest;
    currentTask;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => ID),
    __metadata("design:type", String)
], Donation.prototype, "id", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Donation.prototype, "donorId", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Donation.prototype, "foodName", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Donation.prototype, "description", void 0);
__decorate([
    Field(() => FoodCategory),
    __metadata("design:type", String)
], Donation.prototype, "category", void 0);
__decorate([
    Field(() => Float),
    __metadata("design:type", Number)
], Donation.prototype, "quantity", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Donation.prototype, "unit", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Donation.prototype, "pickupLocation", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Donation.prototype, "pickupAvailableTime", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], Donation.prototype, "pickupDeadline", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], Donation.prototype, "expiryDeadline", void 0);
__decorate([
    Field(() => DonationStatus),
    __metadata("design:type", String)
], Donation.prototype, "status", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Donation.prototype, "storageNotes", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Donation.prototype, "imageUrl", void 0);
__decorate([
    Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], Donation.prototype, "donor", void 0);
__decorate([
    Field(() => [DonationRequest], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Donation.prototype, "requests", void 0);
__decorate([
    Field(() => [PickupTask], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Donation.prototype, "pickupTasks", void 0);
__decorate([
    Field(() => DonationRequest, { nullable: true }),
    __metadata("design:type", Object)
], Donation.prototype, "currentRequest", void 0);
__decorate([
    Field(() => PickupTask, { nullable: true }),
    __metadata("design:type", Object)
], Donation.prototype, "currentTask", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], Donation.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], Donation.prototype, "updatedAt", void 0);
Donation = __decorate([
    ObjectType('Donation')
], Donation);
export { Donation };
//# sourceMappingURL=donation.model.js.map