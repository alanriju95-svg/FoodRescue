var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../common/enums/index.js';
let RegisterInput = class RegisterInput {
    email;
    password;
    name;
    role;
    phone;
    organization;
    address;
    city;
    vehicleType;
};
__decorate([
    Field(() => String),
    IsEmail(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    Field(() => String),
    MinLength(6),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    Field(() => String),
    IsNotEmpty(),
    __metadata("design:type", String)
], RegisterInput.prototype, "name", void 0);
__decorate([
    Field(() => UserRole),
    IsEnum(UserRole),
    __metadata("design:type", String)
], RegisterInput.prototype, "role", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    __metadata("design:type", String)
], RegisterInput.prototype, "phone", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    __metadata("design:type", String)
], RegisterInput.prototype, "organization", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    __metadata("design:type", String)
], RegisterInput.prototype, "address", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    __metadata("design:type", String)
], RegisterInput.prototype, "city", void 0);
__decorate([
    Field(() => String, { nullable: true }),
    IsOptional(),
    __metadata("design:type", String)
], RegisterInput.prototype, "vehicleType", void 0);
RegisterInput = __decorate([
    InputType()
], RegisterInput);
export { RegisterInput };
//# sourceMappingURL=register.input.js.map