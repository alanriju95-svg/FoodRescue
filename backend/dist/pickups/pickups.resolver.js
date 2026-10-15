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
import { PickupsService } from './pickups.service.js';
import { PickupTask } from './models/pickup-task.model.js';
import { Donation } from '../donations/models/donation.model.js';
import { VolunteerStats } from '../common/dto/stats.type.js';
import { UserRole, PickupStatus } from '../common/enums/index.js';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
let PickupsResolver = class PickupsResolver {
    pickupsService;
    constructor(pickupsService) {
        this.pickupsService = pickupsService;
    }
    async availablePickupTasks() {
        return this.pickupsService.getAvailableTasks();
    }
    async myTasks(user) {
        return this.pickupsService.getMyTasks(user.id);
    }
    async myTaskHistory(user) {
        return this.pickupsService.getMyHistory(user.id);
    }
    async pickupTask(id) {
        return this.pickupsService.getTaskById(id);
    }
    async volunteerStats(user) {
        return this.pickupsService.getVolunteerStats(user.id);
    }
    async acceptPickup(user, donationId, notes) {
        return this.pickupsService.acceptPickup(user.id, donationId, notes);
    }
    async updatePickupStatus(user, taskId, status) {
        return this.pickupsService.updatePickupStatus(user.id, taskId, status);
    }
    async confirmDelivery(user, taskId, proofNotes) {
        return this.pickupsService.confirmDelivery(user.id, taskId, proofNotes);
    }
    async confirmReceipt(user, donationId, notes) {
        return this.pickupsService.confirmReceipt(user.id, donationId, notes);
    }
};
__decorate([
    Query(() => [Donation], { description: 'Get surplus food donations waiting for volunteer pickup assignment' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PickupsResolver.prototype, "availablePickupTasks", null);
__decorate([
    Query(() => [PickupTask], { description: 'Get active pickup tasks assigned to the current volunteer' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PickupsResolver.prototype, "myTasks", null);
__decorate([
    Query(() => [PickupTask], { description: 'Get completed tasks history for the current volunteer' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PickupsResolver.prototype, "myTaskHistory", null);
__decorate([
    Query(() => PickupTask, { description: 'Get task details by ID' }),
    UseGuards(GqlAuthGuard),
    __param(0, Args('id', { type: () => ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PickupsResolver.prototype, "pickupTask", null);
__decorate([
    Query(() => VolunteerStats, { description: 'Get volunteer dashboard statistics' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PickupsResolver.prototype, "volunteerStats", null);
__decorate([
    Mutation(() => PickupTask, { description: 'Accept a pickup task for a surplus food donation' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    __param(0, CurrentUser()),
    __param(1, Args('donationId', { type: () => ID })),
    __param(2, Args('notes', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PickupsResolver.prototype, "acceptPickup", null);
__decorate([
    Mutation(() => PickupTask, { description: 'Update pickup status (e.g. mark food PICKED_UP from donor)' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    __param(0, CurrentUser()),
    __param(1, Args('taskId', { type: () => ID })),
    __param(2, Args('status', { type: () => PickupStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PickupsResolver.prototype, "updatePickupStatus", null);
__decorate([
    Mutation(() => PickupTask, { description: 'Confirm that food has been safely delivered to receiver' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    __param(0, CurrentUser()),
    __param(1, Args('taskId', { type: () => ID })),
    __param(2, Args('proofNotes', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PickupsResolver.prototype, "confirmDelivery", null);
__decorate([
    Mutation(() => Donation, { description: 'Receiver confirms receipt of delivered food, completing the journey' }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
    __param(0, CurrentUser()),
    __param(1, Args('donationId', { type: () => ID })),
    __param(2, Args('notes', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], PickupsResolver.prototype, "confirmReceipt", null);
PickupsResolver = __decorate([
    Resolver(() => PickupTask),
    __metadata("design:paramtypes", [PickupsService])
], PickupsResolver);
export { PickupsResolver };
//# sourceMappingURL=pickups.resolver.js.map