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
let Delivery = class Delivery {
    id;
    taskId;
    recipientConfirmation;
    confirmedAt;
    proofNotes;
    createdAt;
};
__decorate([
    Field(() => ID),
    __metadata("design:type", String)
], Delivery.prototype, "id", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], Delivery.prototype, "taskId", void 0);
__decorate([
    Field(() => Boolean),
    __metadata("design:type", Boolean)
], Delivery.prototype, "recipientConfirmation", void 0);
__decorate([
    Field(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "confirmedAt", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], Delivery.prototype, "proofNotes", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], Delivery.prototype, "createdAt", void 0);
Delivery = __decorate([
    ObjectType('Delivery')
], Delivery);
export { Delivery };
//# sourceMappingURL=delivery.model.js.map