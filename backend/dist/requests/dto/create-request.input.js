var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
let CreateRequestInput = class CreateRequestInput {
    donationId;
    deliveryAddress;
    notes;
};
__decorate([
    Field(() => ID),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateRequestInput.prototype, "donationId", void 0);
__decorate([
    Field(() => String),
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], CreateRequestInput.prototype, "deliveryAddress", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreateRequestInput.prototype, "notes", void 0);
CreateRequestInput = __decorate([
    InputType()
], CreateRequestInput);
export { CreateRequestInput };
//# sourceMappingURL=create-request.input.js.map