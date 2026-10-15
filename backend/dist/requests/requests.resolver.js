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
import { RequestsService } from './requests.service.js';
import { DonationRequest } from './models/request.model.js';
import { CreateRequestInput } from './dto/create-request.input.js';
import { ReceiverStats } from '../common/dto/stats.type.js';
import { UserRole } from '../common/enums/index.js';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
let RequestsResolver = class RequestsResolver {
    requestsService;
    constructor(requestsService) {
        this.requestsService = requestsService;
    }
    async myRequests(user) {
        return this.requestsService.findByReceiver(user.id);
    }
    async donationRequest(id) {
        return this.requestsService.findById(id);
    }
    async receiverStats(user) {
        return this.requestsService.getReceiverStats(user.id);
    }
    async requestDonation(user, input) {
        return this.requestsService.createRequest(user.id, input);
    }
    async cancelRequest(user, id) {
        return this.requestsService.cancelRequest(user.id, id);
    }
};
__decorate([
    Query(() => [DonationRequest], { description: 'Get all requests made by the currently authenticated receiver' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RequestsResolver.prototype, "myRequests", null);
__decorate([
    Query(() => DonationRequest, { description: 'Get request details by ID' }),
    UseGuards(GqlAuthGuard),
    __param(0, Args('id', { type: () => ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RequestsResolver.prototype, "donationRequest", null);
__decorate([
    Query(() => ReceiverStats, { description: 'Get receiver dashboard statistics' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RequestsResolver.prototype, "receiverStats", null);
__decorate([
    Mutation(() => DonationRequest, { description: 'Request available surplus food for pickup and delivery' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
    __param(0, CurrentUser()),
    __param(1, Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateRequestInput]),
    __metadata("design:returntype", Promise)
], RequestsResolver.prototype, "requestDonation", null);
__decorate([
    Mutation(() => DonationRequest, { description: 'Cancel an active pending food request' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
    __param(0, CurrentUser()),
    __param(1, Args('id', { type: () => ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RequestsResolver.prototype, "cancelRequest", null);
RequestsResolver = __decorate([
    Resolver(() => DonationRequest),
    __metadata("design:paramtypes", [RequestsService])
], RequestsResolver);
export { RequestsResolver };
//# sourceMappingURL=requests.resolver.js.map