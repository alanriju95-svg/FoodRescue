var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { User } from './models/user.model.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
let UsersResolver = class UsersResolver {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    async user(id) {
        const user = await this.usersService.findById(id);
        return user;
    }
    async updateProfile(user, input) {
        const updated = await this.usersService.updateProfile(user.id, input);
        return updated;
    }
};
__decorate([
    Query(() => User, { description: 'Get user details by ID' }),
    UseGuards(GqlAuthGuard),
    __param(0, Args('id', { type: () => ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "user", null);
__decorate([
    Mutation(() => User, { description: 'Update current user profile information' }),
    UseGuards(GqlAuthGuard),
    __param(0, CurrentUser()),
    __param(1, Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateProfileInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateProfile", null);
UsersResolver = __decorate([
    Resolver(() => User),
    __metadata("design:paramtypes", [UsersService])
], UsersResolver);
export { UsersResolver };
//# sourceMappingURL=users.resolver.js.map