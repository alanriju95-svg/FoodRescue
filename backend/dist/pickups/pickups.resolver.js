function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
        r = Reflect.decorate(decorators, target, key, desc);
    } else {
        for(var i = decorators.length - 1; i >= 0; i--){
            if (d = decorators[i]) {
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
            }
        }
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") {
        return Reflect.metadata(metadataKey, metadataValue);
    }
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
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
export class PickupsResolver {
    constructor(pickupsService){
        this.pickupsService = pickupsService;
    }
    async donation(task) {
        if (task.donation) {
            return task.donation;
        }
        return this.pickupsService.getDonationForTask(task.donationId);
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
}
_ts_decorate([
    ResolveField(()=>Donation, {
        nullable: true
    }),
    _ts_param(0, Parent()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "donation", null);
_ts_decorate([
    Query(()=>[
            Donation
        ], {
        description: 'Get surplus food donations waiting for volunteer pickup assignment'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "availablePickupTasks", null);
_ts_decorate([
    Query(()=>[
            PickupTask
        ], {
        description: 'Get active pickup tasks assigned to the current volunteer'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    _ts_param(0, CurrentUser()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "myTasks", null);
_ts_decorate([
    Query(()=>[
            PickupTask
        ], {
        description: 'Get completed tasks history for the current volunteer'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    _ts_param(0, CurrentUser()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "myTaskHistory", null);
_ts_decorate([
    Query(()=>PickupTask, {
        description: 'Get task details by ID'
    }),
    UseGuards(GqlAuthGuard),
    _ts_param(0, Args('id', {
        type: ()=>ID
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "pickupTask", null);
_ts_decorate([
    Query(()=>VolunteerStats, {
        description: 'Get volunteer dashboard statistics'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    _ts_param(0, CurrentUser()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "volunteerStats", null);
_ts_decorate([
    Mutation(()=>PickupTask, {
        description: 'Accept a pickup task for a surplus food donation'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('donationId', {
        type: ()=>ID
    })),
    _ts_param(2, Args('notes', {
        type: ()=>String,
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "acceptPickup", null);
_ts_decorate([
    Mutation(()=>PickupTask, {
        description: 'Update pickup status (e.g. mark food PICKED_UP from donor)'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('taskId', {
        type: ()=>ID
    })),
    _ts_param(2, Args('status', {
        type: ()=>PickupStatus
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String,
        typeof PickupStatus === "undefined" ? Object : PickupStatus
    ]),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "updatePickupStatus", null);
_ts_decorate([
    Mutation(()=>PickupTask, {
        description: 'Confirm that food has been safely delivered to receiver'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.VOLUNTEER),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('taskId', {
        type: ()=>ID
    })),
    _ts_param(2, Args('proofNotes', {
        type: ()=>String,
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "confirmDelivery", null);
_ts_decorate([
    Mutation(()=>Donation, {
        description: 'Receiver confirms receipt of delivered food, completing the journey'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('donationId', {
        type: ()=>ID
    })),
    _ts_param(2, Args('notes', {
        type: ()=>String,
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], PickupsResolver.prototype, "confirmReceipt", null);
PickupsResolver = _ts_decorate([
    Resolver(()=>PickupTask),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof PickupsService === "undefined" ? Object : PickupsService
    ])
], PickupsResolver);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9waWNrdXBzL3BpY2t1cHMucmVzb2x2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzb2x2ZXIsIFF1ZXJ5LCBNdXRhdGlvbiwgQXJncywgSUQsIFJlc29sdmVGaWVsZCwgUGFyZW50IH0gZnJvbSAnQG5lc3Rqcy9ncmFwaHFsJztcclxuaW1wb3J0IHsgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBQaWNrdXBzU2VydmljZSB9IGZyb20gJy4vcGlja3Vwcy5zZXJ2aWNlLmpzJztcclxuaW1wb3J0IHsgUGlja3VwVGFzayB9IGZyb20gJy4vbW9kZWxzL3BpY2t1cC10YXNrLm1vZGVsLmpzJztcclxuaW1wb3J0IHsgRG9uYXRpb24gfSBmcm9tICcuLi9kb25hdGlvbnMvbW9kZWxzL2RvbmF0aW9uLm1vZGVsLmpzJztcclxuaW1wb3J0IHsgVm9sdW50ZWVyU3RhdHMgfSBmcm9tICcuLi9jb21tb24vZHRvL3N0YXRzLnR5cGUuanMnO1xyXG5pbXBvcnQgeyBVc2VyUm9sZSwgUGlja3VwU3RhdHVzIH0gZnJvbSAnLi4vY29tbW9uL2VudW1zL2luZGV4LmpzJztcclxuaW1wb3J0IHsgR3FsQXV0aEd1YXJkIH0gZnJvbSAnLi4vYXV0aC9ndWFyZHMvZ3FsLWF1dGguZ3VhcmQuanMnO1xyXG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vYXV0aC9ndWFyZHMvcm9sZXMuZ3VhcmQuanMnO1xyXG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL2F1dGgvZGVjb3JhdG9ycy9yb2xlcy5kZWNvcmF0b3IuanMnO1xyXG5pbXBvcnQgeyBDdXJyZW50VXNlciB9IGZyb20gJy4uL2F1dGgvZGVjb3JhdG9ycy9jdXJyZW50LXVzZXIuZGVjb3JhdG9yLmpzJztcclxuXHJcbkBSZXNvbHZlcigoKSA9PiBQaWNrdXBUYXNrKVxyXG5leHBvcnQgY2xhc3MgUGlja3Vwc1Jlc29sdmVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHBpY2t1cHNTZXJ2aWNlOiBQaWNrdXBzU2VydmljZSkge31cclxuXHJcbiAgQFJlc29sdmVGaWVsZCgoKSA9PiBEb25hdGlvbiwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIGFzeW5jIGRvbmF0aW9uKEBQYXJlbnQoKSB0YXNrOiBQaWNrdXBUYXNrICYgeyBkb25hdGlvbj86IERvbmF0aW9uIH0pOiBQcm9taXNlPERvbmF0aW9uIHwgbnVsbD4ge1xyXG4gICAgaWYgKHRhc2suZG9uYXRpb24pIHtcclxuICAgICAgcmV0dXJuIHRhc2suZG9uYXRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5waWNrdXBzU2VydmljZS5nZXREb25hdGlvbkZvclRhc2sodGFzay5kb25hdGlvbklkKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW0RvbmF0aW9uXSwgeyBkZXNjcmlwdGlvbjogJ0dldCBzdXJwbHVzIGZvb2QgZG9uYXRpb25zIHdhaXRpbmcgZm9yIHZvbHVudGVlciBwaWNrdXAgYXNzaWdubWVudCcgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuVk9MVU5URUVSKVxyXG4gIGFzeW5jIGF2YWlsYWJsZVBpY2t1cFRhc2tzKCk6IFByb21pc2U8RG9uYXRpb25bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja3Vwc1NlcnZpY2UuZ2V0QXZhaWxhYmxlVGFza3MoKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW1BpY2t1cFRhc2tdLCB7IGRlc2NyaXB0aW9uOiAnR2V0IGFjdGl2ZSBwaWNrdXAgdGFza3MgYXNzaWduZWQgdG8gdGhlIGN1cnJlbnQgdm9sdW50ZWVyJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkLCBSb2xlc0d1YXJkKVxyXG4gIEBSb2xlcyhVc2VyUm9sZS5WT0xVTlRFRVIpXHJcbiAgYXN5bmMgbXlUYXNrcyhAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnkpOiBQcm9taXNlPFBpY2t1cFRhc2tbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja3Vwc1NlcnZpY2UuZ2V0TXlUYXNrcyh1c2VyLmlkKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW1BpY2t1cFRhc2tdLCB7IGRlc2NyaXB0aW9uOiAnR2V0IGNvbXBsZXRlZCB0YXNrcyBoaXN0b3J5IGZvciB0aGUgY3VycmVudCB2b2x1bnRlZXInIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlZPTFVOVEVFUilcclxuICBhc3luYyBteVRhc2tIaXN0b3J5KEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSk6IFByb21pc2U8UGlja3VwVGFza1tdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5waWNrdXBzU2VydmljZS5nZXRNeUhpc3RvcnkodXNlci5pZCkgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQFF1ZXJ5KCgpID0+IFBpY2t1cFRhc2ssIHsgZGVzY3JpcHRpb246ICdHZXQgdGFzayBkZXRhaWxzIGJ5IElEJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkKVxyXG4gIGFzeW5jIHBpY2t1cFRhc2soQEFyZ3MoJ2lkJywgeyB0eXBlOiAoKSA9PiBJRCB9KSBpZDogc3RyaW5nKTogUHJvbWlzZTxQaWNrdXBUYXNrPiB7XHJcbiAgICByZXR1cm4gdGhpcy5waWNrdXBzU2VydmljZS5nZXRUYXNrQnlJZChpZCkgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQFF1ZXJ5KCgpID0+IFZvbHVudGVlclN0YXRzLCB7IGRlc2NyaXB0aW9uOiAnR2V0IHZvbHVudGVlciBkYXNoYm9hcmQgc3RhdGlzdGljcycgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuVk9MVU5URUVSKVxyXG4gIGFzeW5jIHZvbHVudGVlclN0YXRzKEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSk6IFByb21pc2U8Vm9sdW50ZWVyU3RhdHM+IHtcclxuICAgIHJldHVybiB0aGlzLnBpY2t1cHNTZXJ2aWNlLmdldFZvbHVudGVlclN0YXRzKHVzZXIuaWQpO1xyXG4gIH1cclxuXHJcbiAgQE11dGF0aW9uKCgpID0+IFBpY2t1cFRhc2ssIHsgZGVzY3JpcHRpb246ICdBY2NlcHQgYSBwaWNrdXAgdGFzayBmb3IgYSBzdXJwbHVzIGZvb2QgZG9uYXRpb24nIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlZPTFVOVEVFUilcclxuICBhc3luYyBhY2NlcHRQaWNrdXAoXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygnZG9uYXRpb25JZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgZG9uYXRpb25JZDogc3RyaW5nLFxyXG4gICAgQEFyZ3MoJ25vdGVzJywgeyB0eXBlOiAoKSA9PiBTdHJpbmcsIG51bGxhYmxlOiB0cnVlIH0pIG5vdGVzPzogc3RyaW5nLFxyXG4gICk6IFByb21pc2U8UGlja3VwVGFzaz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja3Vwc1NlcnZpY2UuYWNjZXB0UGlja3VwKHVzZXIuaWQsIGRvbmF0aW9uSWQsIG5vdGVzKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBATXV0YXRpb24oKCkgPT4gUGlja3VwVGFzaywgeyBkZXNjcmlwdGlvbjogJ1VwZGF0ZSBwaWNrdXAgc3RhdHVzIChlLmcuIG1hcmsgZm9vZCBQSUNLRURfVVAgZnJvbSBkb25vciknIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlZPTFVOVEVFUilcclxuICBhc3luYyB1cGRhdGVQaWNrdXBTdGF0dXMoXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygndGFza0lkJywgeyB0eXBlOiAoKSA9PiBJRCB9KSB0YXNrSWQ6IHN0cmluZyxcclxuICAgIEBBcmdzKCdzdGF0dXMnLCB7IHR5cGU6ICgpID0+IFBpY2t1cFN0YXR1cyB9KSBzdGF0dXM6IFBpY2t1cFN0YXR1cyxcclxuICApOiBQcm9taXNlPFBpY2t1cFRhc2s+IHtcclxuICAgIHJldHVybiB0aGlzLnBpY2t1cHNTZXJ2aWNlLnVwZGF0ZVBpY2t1cFN0YXR1cyh1c2VyLmlkLCB0YXNrSWQsIHN0YXR1cykgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQE11dGF0aW9uKCgpID0+IFBpY2t1cFRhc2ssIHsgZGVzY3JpcHRpb246ICdDb25maXJtIHRoYXQgZm9vZCBoYXMgYmVlbiBzYWZlbHkgZGVsaXZlcmVkIHRvIHJlY2VpdmVyJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkLCBSb2xlc0d1YXJkKVxyXG4gIEBSb2xlcyhVc2VyUm9sZS5WT0xVTlRFRVIpXHJcbiAgYXN5bmMgY29uZmlybURlbGl2ZXJ5KFxyXG4gICAgQEN1cnJlbnRVc2VyKCkgdXNlcjogYW55LFxyXG4gICAgQEFyZ3MoJ3Rhc2tJZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgdGFza0lkOiBzdHJpbmcsXHJcbiAgICBAQXJncygncHJvb2ZOb3RlcycsIHsgdHlwZTogKCkgPT4gU3RyaW5nLCBudWxsYWJsZTogdHJ1ZSB9KSBwcm9vZk5vdGVzPzogc3RyaW5nLFxyXG4gICk6IFByb21pc2U8UGlja3VwVGFzaz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja3Vwc1NlcnZpY2UuY29uZmlybURlbGl2ZXJ5KHVzZXIuaWQsIHRhc2tJZCwgcHJvb2ZOb3RlcykgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQE11dGF0aW9uKCgpID0+IERvbmF0aW9uLCB7IGRlc2NyaXB0aW9uOiAnUmVjZWl2ZXIgY29uZmlybXMgcmVjZWlwdCBvZiBkZWxpdmVyZWQgZm9vZCwgY29tcGxldGluZyB0aGUgam91cm5leScgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuUkVDRUlWRVIpXHJcbiAgYXN5bmMgY29uZmlybVJlY2VpcHQoXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygnZG9uYXRpb25JZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgZG9uYXRpb25JZDogc3RyaW5nLFxyXG4gICAgQEFyZ3MoJ25vdGVzJywgeyB0eXBlOiAoKSA9PiBTdHJpbmcsIG51bGxhYmxlOiB0cnVlIH0pIG5vdGVzPzogc3RyaW5nLFxyXG4gICk6IFByb21pc2U8RG9uYXRpb24+IHtcclxuICAgIHJldHVybiB0aGlzLnBpY2t1cHNTZXJ2aWNlLmNvbmZpcm1SZWNlaXB0KHVzZXIuaWQsIGRvbmF0aW9uSWQsIG5vdGVzKSBhcyBhbnk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJSZXNvbHZlciIsIlF1ZXJ5IiwiTXV0YXRpb24iLCJBcmdzIiwiSUQiLCJSZXNvbHZlRmllbGQiLCJQYXJlbnQiLCJVc2VHdWFyZHMiLCJQaWNrdXBzU2VydmljZSIsIlBpY2t1cFRhc2siLCJEb25hdGlvbiIsIlZvbHVudGVlclN0YXRzIiwiVXNlclJvbGUiLCJQaWNrdXBTdGF0dXMiLCJHcWxBdXRoR3VhcmQiLCJSb2xlc0d1YXJkIiwiUm9sZXMiLCJDdXJyZW50VXNlciIsIlBpY2t1cHNSZXNvbHZlciIsInBpY2t1cHNTZXJ2aWNlIiwiZG9uYXRpb24iLCJ0YXNrIiwiZ2V0RG9uYXRpb25Gb3JUYXNrIiwiZG9uYXRpb25JZCIsImF2YWlsYWJsZVBpY2t1cFRhc2tzIiwiZ2V0QXZhaWxhYmxlVGFza3MiLCJteVRhc2tzIiwidXNlciIsImdldE15VGFza3MiLCJpZCIsIm15VGFza0hpc3RvcnkiLCJnZXRNeUhpc3RvcnkiLCJwaWNrdXBUYXNrIiwiZ2V0VGFza0J5SWQiLCJ2b2x1bnRlZXJTdGF0cyIsImdldFZvbHVudGVlclN0YXRzIiwiYWNjZXB0UGlja3VwIiwibm90ZXMiLCJ1cGRhdGVQaWNrdXBTdGF0dXMiLCJ0YXNrSWQiLCJzdGF0dXMiLCJjb25maXJtRGVsaXZlcnkiLCJwcm9vZk5vdGVzIiwiY29uZmlybVJlY2VpcHQiLCJudWxsYWJsZSIsImRlc2NyaXB0aW9uIiwiVk9MVU5URUVSIiwidHlwZSIsIlN0cmluZyIsIlJFQ0VJVkVSIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFFBQVEsRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUVDLElBQUksRUFBRUMsRUFBRSxFQUFFQyxZQUFZLEVBQUVDLE1BQU0sUUFBUSxrQkFBa0I7QUFDNUYsU0FBU0MsU0FBUyxRQUFRLGlCQUFpQjtBQUMzQyxTQUFTQyxjQUFjLFFBQVEsdUJBQXVCO0FBQ3RELFNBQVNDLFVBQVUsUUFBUSxnQ0FBZ0M7QUFDM0QsU0FBU0MsUUFBUSxRQUFRLHdDQUF3QztBQUNqRSxTQUFTQyxjQUFjLFFBQVEsOEJBQThCO0FBQzdELFNBQVNDLFFBQVEsRUFBRUMsWUFBWSxRQUFRLDJCQUEyQjtBQUNsRSxTQUFTQyxZQUFZLFFBQVEsbUNBQW1DO0FBQ2hFLFNBQVNDLFVBQVUsUUFBUSxnQ0FBZ0M7QUFDM0QsU0FBU0MsS0FBSyxRQUFRLHdDQUF3QztBQUM5RCxTQUFTQyxXQUFXLFFBQVEsK0NBQStDO0FBRzNFLE9BQU8sTUFBTUM7SUFDWCxZQUFZLEFBQWlCQyxjQUE4QixDQUFFO2FBQWhDQSxpQkFBQUE7SUFBaUM7SUFFOUQsTUFDTUMsU0FBUyxBQUFVQyxJQUEwQyxFQUE0QjtRQUM3RixJQUFJQSxLQUFLRCxRQUFRLEVBQUU7WUFDakIsT0FBT0MsS0FBS0QsUUFBUTtRQUN0QjtRQUNBLE9BQU8sSUFBSSxDQUFDRCxjQUFjLENBQUNHLGtCQUFrQixDQUFDRCxLQUFLRSxVQUFVO0lBQy9EO0lBRUEsTUFHTUMsdUJBQTRDO1FBQ2hELE9BQU8sSUFBSSxDQUFDTCxjQUFjLENBQUNNLGlCQUFpQjtJQUM5QztJQUVBLE1BR01DLFFBQVEsQUFBZUMsSUFBUyxFQUF5QjtR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