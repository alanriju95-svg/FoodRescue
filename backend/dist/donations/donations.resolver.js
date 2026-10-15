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
import { DonationsService } from './donations.service.js';
import { Donation } from './models/donation.model.js';
import { CreateDonationInput } from './dto/create-donation.input.js';
import { UpdateDonationInput } from './dto/update-donation.input.js';
import { DonationStatus, FoodCategory, UserRole } from '../common/enums/index.js';
import { DonorStats, PlatformStats } from '../common/dto/stats.type.js';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
let DonationsResolver = class DonationsResolver {
    donationsService;
    constructor(donationsService) {
        this.donationsService = donationsService;
    }
    async donations(status, category, search) {
        return this.donationsService.findAll({ status, category, search });
    }
    async availableDonations() {
        return this.donationsService.findAvailable();
    }
    async donation(id) {
        return this.donationsService.findById(id);
    }
    async myDonations(user) {
        return this.donationsService.findByDonor(user.id);
    }
    async donorStats(user) {
        return this.donationsService.getDonorStats(user.id);
    }
    async platformStats() {
        return this.donationsService.getPlatformStats();
    }
    async createDonation(user, input) {
        return this.donationsService.create(user.id, input);
    }
    async updateDonation(user, id, input) {
        return this.donationsService.update(user.id, id, input);
    }
    async cancelDonation(user, id) {
        return this.donationsService.cancel(user.id, id);
    }
};
__decorate([
    Query(() => [Donation], { description: 'Get all donations with optional filters' }),
    __param(0, Args('status', { type: () => DonationStatus, nullable: true })),
    __param(1, Args('category', { type: () => FoodCategory, nullable: true })),
    __param(2, Args('search', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DonationsResolver.prototype, "donations", null);
__decorate([
    Query(() => [Donation], { description: 'Get all available surplus food donations for claim/pickup' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonationsResolver.prototype, "availableDonations", null);
__decorate([
    Query(() => Donation, { description: 'Get a single food donation by ID with full lifecycle relations' }),
    __param(0, Args('id', { type: () => ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonationsResolver.prototype, "donation", null);
__decorate([
    Query(() => [Donation], { description: 'Get donations created by the currently authenticated donor' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonationsResolver.prototype, "myDonations", null);
__decorate([
    Query(() => DonorStats, { description: 'Get donor-specific dashboard statistics' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DonationsResolver.prototype, "donorStats", null);
__decorate([
    Query(() => PlatformStats, { description: 'Get platform-wide sustainability impact statistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonationsResolver.prototype, "platformStats", null);
__decorate([
    Mutation(() => Donation, { description: 'Create a new surplus food donation' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    __param(0, CurrentUser()),
    __param(1, Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateDonationInput]),
    __metadata("design:returntype", Promise)
], DonationsResolver.prototype, "createDonation", null);
__decorate([
    Mutation(() => Donation, { description: 'Update an existing food donation' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    __param(0, CurrentUser()),
    __param(1, Args('id', { type: () => ID })),
    __param(2, Args('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateDonationInput]),
    __metadata("design:returntype", Promise)
], DonationsResolver.prototype, "updateDonation", null);
__decorate([
    Mutation(() => Donation, { description: 'Cancel an active food donation' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    __param(0, CurrentUser()),
    __param(1, Args('id', { type: () => ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DonationsResolver.prototype, "cancelDonation", null);
DonationsResolver = __decorate([
    Resolver(() => Donation),
    __metadata("design:paramtypes", [DonationsService])
], DonationsResolver);
export { DonationsResolver };
//# sourceMappingURL=donations.resolver.js.map