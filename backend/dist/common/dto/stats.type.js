var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ObjectType, Field, Int } from '@nestjs/graphql';
let DonorStats = class DonorStats {
    totalDonations;
    activeDonations;
    completedDonations;
    pendingRequests;
    totalMealsSaved;
};
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], DonorStats.prototype, "totalDonations", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], DonorStats.prototype, "activeDonations", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], DonorStats.prototype, "completedDonations", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], DonorStats.prototype, "pendingRequests", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], DonorStats.prototype, "totalMealsSaved", void 0);
DonorStats = __decorate([
    ObjectType('DonorStats')
], DonorStats);
export { DonorStats };
let VolunteerStats = class VolunteerStats {
    availableTasks;
    activeTasks;
    completedPickups;
    todayTasks;
};
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], VolunteerStats.prototype, "availableTasks", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], VolunteerStats.prototype, "activeTasks", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], VolunteerStats.prototype, "completedPickups", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], VolunteerStats.prototype, "todayTasks", void 0);
VolunteerStats = __decorate([
    ObjectType('VolunteerStats')
], VolunteerStats);
export { VolunteerStats };
let ReceiverStats = class ReceiverStats {
    availableFood;
    pendingRequests;
    activeDeliveries;
    completedRequests;
};
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], ReceiverStats.prototype, "availableFood", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], ReceiverStats.prototype, "pendingRequests", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], ReceiverStats.prototype, "activeDeliveries", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], ReceiverStats.prototype, "completedRequests", void 0);
ReceiverStats = __decorate([
    ObjectType('ReceiverStats')
], ReceiverStats);
export { ReceiverStats };
let PlatformStats = class PlatformStats {
    totalDonations;
    totalMealsRescued;
    activeVolunteers;
    communityPartners;
};
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], PlatformStats.prototype, "totalDonations", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], PlatformStats.prototype, "totalMealsRescued", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], PlatformStats.prototype, "activeVolunteers", void 0);
__decorate([
    Field(() => Int),
    __metadata("design:type", Number)
], PlatformStats.prototype, "communityPartners", void 0);
PlatformStats = __decorate([
    ObjectType('PlatformStats')
], PlatformStats);
export { PlatformStats };
//# sourceMappingURL=stats.type.js.map