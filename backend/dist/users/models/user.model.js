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
import { UserRole } from '../../common/enums/index.js';
let User = class User {
    id;
    email;
    name;
    phone;
    role;
    organization;
    address;
    city;
    bio;
    vehicleType;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "phone", void 0);
__decorate([
    Field(() => UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "organization", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "address", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "city", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "bio", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "vehicleType", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    Field(() => Date),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
User = __decorate([
    ObjectType('User')
], User);
export { User };
//# sourceMappingURL=user.model.js.map