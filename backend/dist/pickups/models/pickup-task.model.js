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
import { PickupStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
import { Delivery } from '../../deliveries/models/delivery.model.js';
let PickupTask = class PickupTask {
    id;
    donationId;
    volunteerId;
    status;
    notes;
    pickedUpAt;
    deliveredAt;
    volunteer;
    delivery;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => ID),
    __metadata("design:type", String)
], PickupTask.prototype, "id", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], PickupTask.prototype, "donationId", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], PickupTask.prototype, "volunteerId", void 0);
__decorate([
    Field(() => PickupStatus),
    __metadata("design:type", String)
], PickupTask.prototype, "status", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], PickupTask.prototype, "notes", void 0);
__decorate([
    Field(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], PickupTask.prototype, "pickedUpAt", void 0);
__decorate([
    Field(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], PickupTask.prototype, "deliveredAt", void 0);
__decorate([
    Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], PickupTask.prototype, "volunteer", void 0);
__decorate([
    Field(() => Delivery, { nullable: true }),
    __metadata("design:type", Object)
], PickupTask.prototype, "delivery", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], PickupTask.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], PickupTask.prototype, "updatedAt", void 0);
PickupTask = __decorate([
    ObjectType('PickupTask')
], PickupTask);
export { PickupTask };
//# sourceMappingURL=pickup-task.model.js.map