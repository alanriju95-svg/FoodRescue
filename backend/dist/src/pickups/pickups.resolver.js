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
export class PickupsResolver {
    constructor(pickupsService){
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
}
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9waWNrdXBzL3BpY2t1cHMucmVzb2x2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzb2x2ZXIsIFF1ZXJ5LCBNdXRhdGlvbiwgQXJncywgSUQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcbmltcG9ydCB7IFBpY2t1cHNTZXJ2aWNlIH0gZnJvbSAnLi9waWNrdXBzLnNlcnZpY2UuanMnO1xyXG5pbXBvcnQgeyBQaWNrdXBUYXNrIH0gZnJvbSAnLi9tb2RlbHMvcGlja3VwLXRhc2subW9kZWwuanMnO1xyXG5pbXBvcnQgeyBEb25hdGlvbiB9IGZyb20gJy4uL2RvbmF0aW9ucy9tb2RlbHMvZG9uYXRpb24ubW9kZWwuanMnO1xyXG5pbXBvcnQgeyBWb2x1bnRlZXJTdGF0cyB9IGZyb20gJy4uL2NvbW1vbi9kdG8vc3RhdHMudHlwZS5qcyc7XHJcbmltcG9ydCB7IFVzZXJSb2xlLCBQaWNrdXBTdGF0dXMgfSBmcm9tICcuLi9jb21tb24vZW51bXMvaW5kZXguanMnO1xyXG5pbXBvcnQgeyBHcWxBdXRoR3VhcmQgfSBmcm9tICcuLi9hdXRoL2d1YXJkcy9ncWwtYXV0aC5ndWFyZC5qcyc7XHJcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuLi9hdXRoL2d1YXJkcy9yb2xlcy5ndWFyZC5qcyc7XHJcbmltcG9ydCB7IFJvbGVzIH0gZnJvbSAnLi4vYXV0aC9kZWNvcmF0b3JzL3JvbGVzLmRlY29yYXRvci5qcyc7XHJcbmltcG9ydCB7IEN1cnJlbnRVc2VyIH0gZnJvbSAnLi4vYXV0aC9kZWNvcmF0b3JzL2N1cnJlbnQtdXNlci5kZWNvcmF0b3IuanMnO1xyXG5cclxuQFJlc29sdmVyKCgpID0+IFBpY2t1cFRhc2spXHJcbmV4cG9ydCBjbGFzcyBQaWNrdXBzUmVzb2x2ZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcGlja3Vwc1NlcnZpY2U6IFBpY2t1cHNTZXJ2aWNlKSB7fVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW0RvbmF0aW9uXSwgeyBkZXNjcmlwdGlvbjogJ0dldCBzdXJwbHVzIGZvb2QgZG9uYXRpb25zIHdhaXRpbmcgZm9yIHZvbHVudGVlciBwaWNrdXAgYXNzaWdubWVudCcgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuVk9MVU5URUVSKVxyXG4gIGFzeW5jIGF2YWlsYWJsZVBpY2t1cFRhc2tzKCk6IFByb21pc2U8RG9uYXRpb25bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja3Vwc1NlcnZpY2UuZ2V0QXZhaWxhYmxlVGFza3MoKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW1BpY2t1cFRhc2tdLCB7IGRlc2NyaXB0aW9uOiAnR2V0IGFjdGl2ZSBwaWNrdXAgdGFza3MgYXNzaWduZWQgdG8gdGhlIGN1cnJlbnQgdm9sdW50ZWVyJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkLCBSb2xlc0d1YXJkKVxyXG4gIEBSb2xlcyhVc2VyUm9sZS5WT0xVTlRFRVIpXHJcbiAgYXN5bmMgbXlUYXNrcyhAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnkpOiBQcm9taXNlPFBpY2t1cFRhc2tbXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja3Vwc1NlcnZpY2UuZ2V0TXlUYXNrcyh1c2VyLmlkKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW1BpY2t1cFRhc2tdLCB7IGRlc2NyaXB0aW9uOiAnR2V0IGNvbXBsZXRlZCB0YXNrcyBoaXN0b3J5IGZvciB0aGUgY3VycmVudCB2b2x1bnRlZXInIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlZPTFVOVEVFUilcclxuICBhc3luYyBteVRhc2tIaXN0b3J5KEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSk6IFByb21pc2U8UGlja3VwVGFza1tdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5waWNrdXBzU2VydmljZS5nZXRNeUhpc3RvcnkodXNlci5pZCkgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQFF1ZXJ5KCgpID0+IFBpY2t1cFRhc2ssIHsgZGVzY3JpcHRpb246ICdHZXQgdGFzayBkZXRhaWxzIGJ5IElEJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkKVxyXG4gIGFzeW5jIHBpY2t1cFRhc2soQEFyZ3MoJ2lkJywgeyB0eXBlOiAoKSA9PiBJRCB9KSBpZDogc3RyaW5nKTogUHJvbWlzZTxQaWNrdXBUYXNrPiB7XHJcbiAgICByZXR1cm4gdGhpcy5waWNrdXBzU2VydmljZS5nZXRUYXNrQnlJZChpZCkgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQFF1ZXJ5KCgpID0+IFZvbHVudGVlclN0YXRzLCB7IGRlc2NyaXB0aW9uOiAnR2V0IHZvbHVudGVlciBkYXNoYm9hcmQgc3RhdGlzdGljcycgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuVk9MVU5URUVSKVxyXG4gIGFzeW5jIHZvbHVudGVlclN0YXRzKEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSk6IFByb21pc2U8Vm9sdW50ZWVyU3RhdHM+IHtcclxuICAgIHJldHVybiB0aGlzLnBpY2t1cHNTZXJ2aWNlLmdldFZvbHVudGVlclN0YXRzKHVzZXIuaWQpO1xyXG4gIH1cclxuXHJcbiAgQE11dGF0aW9uKCgpID0+IFBpY2t1cFRhc2ssIHsgZGVzY3JpcHRpb246ICdBY2NlcHQgYSBwaWNrdXAgdGFzayBmb3IgYSBzdXJwbHVzIGZvb2QgZG9uYXRpb24nIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlZPTFVOVEVFUilcclxuICBhc3luYyBhY2NlcHRQaWNrdXAoXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygnZG9uYXRpb25JZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgZG9uYXRpb25JZDogc3RyaW5nLFxyXG4gICAgQEFyZ3MoJ25vdGVzJywgeyB0eXBlOiAoKSA9PiBTdHJpbmcsIG51bGxhYmxlOiB0cnVlIH0pIG5vdGVzPzogc3RyaW5nLFxyXG4gICk6IFByb21pc2U8UGlja3VwVGFzaz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja3Vwc1NlcnZpY2UuYWNjZXB0UGlja3VwKHVzZXIuaWQsIGRvbmF0aW9uSWQsIG5vdGVzKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBATXV0YXRpb24oKCkgPT4gUGlja3VwVGFzaywgeyBkZXNjcmlwdGlvbjogJ1VwZGF0ZSBwaWNrdXAgc3RhdHVzIChlLmcuIG1hcmsgZm9vZCBQSUNLRURfVVAgZnJvbSBkb25vciknIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlZPTFVOVEVFUilcclxuICBhc3luYyB1cGRhdGVQaWNrdXBTdGF0dXMoXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygndGFza0lkJywgeyB0eXBlOiAoKSA9PiBJRCB9KSB0YXNrSWQ6IHN0cmluZyxcclxuICAgIEBBcmdzKCdzdGF0dXMnLCB7IHR5cGU6ICgpID0+IFBpY2t1cFN0YXR1cyB9KSBzdGF0dXM6IFBpY2t1cFN0YXR1cyxcclxuICApOiBQcm9taXNlPFBpY2t1cFRhc2s+IHtcclxuICAgIHJldHVybiB0aGlzLnBpY2t1cHNTZXJ2aWNlLnVwZGF0ZVBpY2t1cFN0YXR1cyh1c2VyLmlkLCB0YXNrSWQsIHN0YXR1cykgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQE11dGF0aW9uKCgpID0+IFBpY2t1cFRhc2ssIHsgZGVzY3JpcHRpb246ICdDb25maXJtIHRoYXQgZm9vZCBoYXMgYmVlbiBzYWZlbHkgZGVsaXZlcmVkIHRvIHJlY2VpdmVyJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkLCBSb2xlc0d1YXJkKVxyXG4gIEBSb2xlcyhVc2VyUm9sZS5WT0xVTlRFRVIpXHJcbiAgYXN5bmMgY29uZmlybURlbGl2ZXJ5KFxyXG4gICAgQEN1cnJlbnRVc2VyKCkgdXNlcjogYW55LFxyXG4gICAgQEFyZ3MoJ3Rhc2tJZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgdGFza0lkOiBzdHJpbmcsXHJcbiAgICBAQXJncygncHJvb2ZOb3RlcycsIHsgdHlwZTogKCkgPT4gU3RyaW5nLCBudWxsYWJsZTogdHJ1ZSB9KSBwcm9vZk5vdGVzPzogc3RyaW5nLFxyXG4gICk6IFByb21pc2U8UGlja3VwVGFzaz4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGlja3Vwc1NlcnZpY2UuY29uZmlybURlbGl2ZXJ5KHVzZXIuaWQsIHRhc2tJZCwgcHJvb2ZOb3RlcykgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQE11dGF0aW9uKCgpID0+IERvbmF0aW9uLCB7IGRlc2NyaXB0aW9uOiAnUmVjZWl2ZXIgY29uZmlybXMgcmVjZWlwdCBvZiBkZWxpdmVyZWQgZm9vZCwgY29tcGxldGluZyB0aGUgam91cm5leScgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuUkVDRUlWRVIpXHJcbiAgYXN5bmMgY29uZmlybVJlY2VpcHQoXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygnZG9uYXRpb25JZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgZG9uYXRpb25JZDogc3RyaW5nLFxyXG4gICAgQEFyZ3MoJ25vdGVzJywgeyB0eXBlOiAoKSA9PiBTdHJpbmcsIG51bGxhYmxlOiB0cnVlIH0pIG5vdGVzPzogc3RyaW5nLFxyXG4gICk6IFByb21pc2U8RG9uYXRpb24+IHtcclxuICAgIHJldHVybiB0aGlzLnBpY2t1cHNTZXJ2aWNlLmNvbmZpcm1SZWNlaXB0KHVzZXIuaWQsIGRvbmF0aW9uSWQsIG5vdGVzKSBhcyBhbnk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJSZXNvbHZlciIsIlF1ZXJ5IiwiTXV0YXRpb24iLCJBcmdzIiwiSUQiLCJVc2VHdWFyZHMiLCJQaWNrdXBzU2VydmljZSIsIlBpY2t1cFRhc2siLCJEb25hdGlvbiIsIlZvbHVudGVlclN0YXRzIiwiVXNlclJvbGUiLCJQaWNrdXBTdGF0dXMiLCJHcWxBdXRoR3VhcmQiLCJSb2xlc0d1YXJkIiwiUm9sZXMiLCJDdXJyZW50VXNlciIsIlBpY2t1cHNSZXNvbHZlciIsInBpY2t1cHNTZXJ2aWNlIiwiYXZhaWxhYmxlUGlja3VwVGFza3MiLCJnZXRBdmFpbGFibGVUYXNrcyIsIm15VGFza3MiLCJ1c2VyIiwiZ2V0TXlUYXNrcyIsImlkIiwibXlUYXNrSGlzdG9yeSIsImdldE15SGlzdG9yeSIsInBpY2t1cFRhc2siLCJnZXRUYXNrQnlJZCIsInZvbHVudGVlclN0YXRzIiwiZ2V0Vm9sdW50ZWVyU3RhdHMiLCJhY2NlcHRQaWNrdXAiLCJkb25hdGlvbklkIiwibm90ZXMiLCJ1cGRhdGVQaWNrdXBTdGF0dXMiLCJ0YXNrSWQiLCJzdGF0dXMiLCJjb25maXJtRGVsaXZlcnkiLCJwcm9vZk5vdGVzIiwiY29uZmlybVJlY2VpcHQiLCJkZXNjcmlwdGlvbiIsIlZPTFVOVEVFUiIsInR5cGUiLCJTdHJpbmciLCJudWxsYWJsZSIsIlJFQ0VJVkVSIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFFBQVEsRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUVDLElBQUksRUFBRUMsRUFBRSxRQUFRLGtCQUFrQjtBQUN0RSxTQUFTQyxTQUFTLFFBQVEsaUJBQWlCO0FBQzNDLFNBQVNDLGNBQWMsUUFBUSx1QkFBdUI7QUFDdEQsU0FBU0MsVUFBVSxRQUFRLGdDQUFnQztBQUMzRCxTQUFTQyxRQUFRLFFBQVEsd0NBQXdDO0FBQ2pFLFNBQVNDLGNBQWMsUUFB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