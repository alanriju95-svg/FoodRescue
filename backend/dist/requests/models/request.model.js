var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RequestStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
let DonationRequest = class DonationRequest {
    id;
    donationId;
    receiverId;
    deliveryAddress;
    status;
    notes;
    receiver;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => ID),
    __metadata("design:type", String)
], DonationRequest.prototype, "id", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], DonationRequest.prototype, "donationId", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], DonationRequest.prototype, "receiverId", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], DonationRequest.prototype, "deliveryAddress", void 0);
__decorate([
    Field(() => RequestStatus),
    __metadata("design:type", String)
], DonationRequest.prototype, "status", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], DonationRequest.prototype, "notes", void 0);
__decorate([
    Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], DonationRequest.prototype, "receiver", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], DonationRequest.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], DonationRequest.prototype, "updatedAt", void 0);
DonationRequest = __decorate([
    ObjectType('DonationRequest')
], DonationRequest);
export { DonationRequest };
//# sourceMappingURL=request.model.js.map