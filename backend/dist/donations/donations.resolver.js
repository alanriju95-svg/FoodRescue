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
export class DonationsResolver {
    constructor(donationsService){
        this.donationsService = donationsService;
    }
    async donations(status, category, search) {
        return this.donationsService.findAll({
            status,
            category,
            search
        });
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
}
_ts_decorate([
    Query(()=>[
            Donation
        ], {
        description: 'Get all donations with optional filters'
    }),
    _ts_param(0, Args('status', {
        type: ()=>DonationStatus,
        nullable: true
    })),
    _ts_param(1, Args('category', {
        type: ()=>FoodCategory,
        nullable: true
    })),
    _ts_param(2, Args('search', {
        type: ()=>String,
        nullable: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof DonationStatus === "undefined" ? Object : DonationStatus,
        typeof FoodCategory === "undefined" ? Object : FoodCategory,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], DonationsResolver.prototype, "donations", null);
_ts_decorate([
    Query(()=>[
            Donation
        ], {
        description: 'Get all available surplus food donations for claim/pickup'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], DonationsResolver.prototype, "availableDonations", null);
_ts_decorate([
    Query(()=>Donation, {
        description: 'Get a single food donation by ID with full lifecycle relations'
    }),
    _ts_param(0, Args('id', {
        type: ()=>ID
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], DonationsResolver.prototype, "donation", null);
_ts_decorate([
    Query(()=>[
            Donation
        ], {
        description: 'Get donations created by the currently authenticated donor'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    _ts_param(0, CurrentUser()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], DonationsResolver.prototype, "myDonations", null);
_ts_decorate([
    Query(()=>DonorStats, {
        description: 'Get donor-specific dashboard statistics'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    _ts_param(0, CurrentUser()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], DonationsResolver.prototype, "donorStats", null);
_ts_decorate([
    Query(()=>PlatformStats, {
        description: 'Get platform-wide sustainability impact statistics'
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], DonationsResolver.prototype, "platformStats", null);
_ts_decorate([
    Mutation(()=>Donation, {
        description: 'Create a new surplus food donation'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('input', {
        type: ()=>CreateDonationInput
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof CreateDonationInput === "undefined" ? Object : CreateDonationInput
    ]),
    _ts_metadata("design:returntype", Promise)
], DonationsResolver.prototype, "createDonation", null);
_ts_decorate([
    Mutation(()=>Donation, {
        description: 'Update an existing food donation'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('id', {
        type: ()=>ID
    })),
    _ts_param(2, Args('input', {
        type: ()=>UpdateDonationInput
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String,
        typeof UpdateDonationInput === "undefined" ? Object : UpdateDonationInput
    ]),
    _ts_metadata("design:returntype", Promise)
], DonationsResolver.prototype, "updateDonation", null);
_ts_decorate([
    Mutation(()=>Donation, {
        description: 'Cancel an active food donation'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('id', {
        type: ()=>ID
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], DonationsResolver.prototype, "cancelDonation", null);
DonationsResolver = _ts_decorate([
    Resolver(()=>Donation),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof DonationsService === "undefined" ? Object : DonationsService
    ])
], DonationsResolver);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb25hdGlvbnMvZG9uYXRpb25zLnJlc29sdmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc29sdmVyLCBRdWVyeSwgTXV0YXRpb24sIEFyZ3MsIElEIH0gZnJvbSAnQG5lc3Rqcy9ncmFwaHFsJztcclxuaW1wb3J0IHsgVXNlR3VhcmRzIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBEb25hdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi9kb25hdGlvbnMuc2VydmljZS5qcyc7XHJcbmltcG9ydCB7IERvbmF0aW9uIH0gZnJvbSAnLi9tb2RlbHMvZG9uYXRpb24ubW9kZWwuanMnO1xyXG5pbXBvcnQgeyBDcmVhdGVEb25hdGlvbklucHV0IH0gZnJvbSAnLi9kdG8vY3JlYXRlLWRvbmF0aW9uLmlucHV0LmpzJztcclxuaW1wb3J0IHsgVXBkYXRlRG9uYXRpb25JbnB1dCB9IGZyb20gJy4vZHRvL3VwZGF0ZS1kb25hdGlvbi5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IERvbmF0aW9uU3RhdHVzLCBGb29kQ2F0ZWdvcnksIFVzZXJSb2xlIH0gZnJvbSAnLi4vY29tbW9uL2VudW1zL2luZGV4LmpzJztcclxuaW1wb3J0IHsgRG9ub3JTdGF0cywgUGxhdGZvcm1TdGF0cyB9IGZyb20gJy4uL2NvbW1vbi9kdG8vc3RhdHMudHlwZS5qcyc7XHJcbmltcG9ydCB7IEdxbEF1dGhHdWFyZCB9IGZyb20gJy4uL2F1dGgvZ3VhcmRzL2dxbC1hdXRoLmd1YXJkLmpzJztcclxuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2F1dGgvZ3VhcmRzL3JvbGVzLmd1YXJkLmpzJztcclxuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9hdXRoL2RlY29yYXRvcnMvcm9sZXMuZGVjb3JhdG9yLmpzJztcclxuaW1wb3J0IHsgQ3VycmVudFVzZXIgfSBmcm9tICcuLi9hdXRoL2RlY29yYXRvcnMvY3VycmVudC11c2VyLmRlY29yYXRvci5qcyc7XHJcblxyXG5AUmVzb2x2ZXIoKCkgPT4gRG9uYXRpb24pXHJcbmV4cG9ydCBjbGFzcyBEb25hdGlvbnNSZXNvbHZlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBkb25hdGlvbnNTZXJ2aWNlOiBEb25hdGlvbnNTZXJ2aWNlKSB7fVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW0RvbmF0aW9uXSwgeyBkZXNjcmlwdGlvbjogJ0dldCBhbGwgZG9uYXRpb25zIHdpdGggb3B0aW9uYWwgZmlsdGVycycgfSlcclxuICBhc3luYyBkb25hdGlvbnMoXHJcbiAgICBAQXJncygnc3RhdHVzJywgeyB0eXBlOiAoKSA9PiBEb25hdGlvblN0YXR1cywgbnVsbGFibGU6IHRydWUgfSkgc3RhdHVzPzogRG9uYXRpb25TdGF0dXMsXHJcbiAgICBAQXJncygnY2F0ZWdvcnknLCB7IHR5cGU6ICgpID0+IEZvb2RDYXRlZ29yeSwgbnVsbGFibGU6IHRydWUgfSkgY2F0ZWdvcnk/OiBGb29kQ2F0ZWdvcnksXHJcbiAgICBAQXJncygnc2VhcmNoJywgeyB0eXBlOiAoKSA9PiBTdHJpbmcsIG51bGxhYmxlOiB0cnVlIH0pIHNlYXJjaD86IHN0cmluZyxcclxuICApOiBQcm9taXNlPERvbmF0aW9uW10+IHtcclxuICAgIHJldHVybiB0aGlzLmRvbmF0aW9uc1NlcnZpY2UuZmluZEFsbCh7IHN0YXR1cywgY2F0ZWdvcnksIHNlYXJjaCB9KSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW0RvbmF0aW9uXSwgeyBkZXNjcmlwdGlvbjogJ0dldCBhbGwgYXZhaWxhYmxlIHN1cnBsdXMgZm9vZCBkb25hdGlvbnMgZm9yIGNsYWltL3BpY2t1cCcgfSlcclxuICBhc3luYyBhdmFpbGFibGVEb25hdGlvbnMoKTogUHJvbWlzZTxEb25hdGlvbltdPiB7XHJcbiAgICByZXR1cm4gdGhpcy5kb25hdGlvbnNTZXJ2aWNlLmZpbmRBdmFpbGFibGUoKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gRG9uYXRpb24sIHsgZGVzY3JpcHRpb246ICdHZXQgYSBzaW5nbGUgZm9vZCBkb25hdGlvbiBieSBJRCB3aXRoIGZ1bGwgbGlmZWN5Y2xlIHJlbGF0aW9ucycgfSlcclxuICBhc3luYyBkb25hdGlvbihAQXJncygnaWQnLCB7IHR5cGU6ICgpID0+IElEIH0pIGlkOiBzdHJpbmcpOiBQcm9taXNlPERvbmF0aW9uPiB7XHJcbiAgICByZXR1cm4gdGhpcy5kb25hdGlvbnNTZXJ2aWNlLmZpbmRCeUlkKGlkKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW0RvbmF0aW9uXSwgeyBkZXNjcmlwdGlvbjogJ0dldCBkb25hdGlvbnMgY3JlYXRlZCBieSB0aGUgY3VycmVudGx5IGF1dGhlbnRpY2F0ZWQgZG9ub3InIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLkRPTk9SKVxyXG4gIGFzeW5jIG15RG9uYXRpb25zKEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSk6IFByb21pc2U8RG9uYXRpb25bXT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZG9uYXRpb25zU2VydmljZS5maW5kQnlEb25vcih1c2VyLmlkKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gRG9ub3JTdGF0cywgeyBkZXNjcmlwdGlvbjogJ0dldCBkb25vci1zcGVjaWZpYyBkYXNoYm9hcmQgc3RhdGlzdGljcycgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuRE9OT1IpXHJcbiAgYXN5bmMgZG9ub3JTdGF0cyhAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnkpOiBQcm9taXNlPERvbm9yU3RhdHM+IHtcclxuICAgIHJldHVybiB0aGlzLmRvbmF0aW9uc1NlcnZpY2UuZ2V0RG9ub3JTdGF0cyh1c2VyLmlkKTtcclxuICB9XHJcblxyXG4gIEBRdWVyeSgoKSA9PiBQbGF0Zm9ybVN0YXRzLCB7IGRlc2NyaXB0aW9uOiAnR2V0IHBsYXRmb3JtLXdpZGUgc3VzdGFpbmFiaWxpdHkgaW1wYWN0IHN0YXRpc3RpY3MnIH0pXHJcbiAgYXN5bmMgcGxhdGZvcm1TdGF0cygpOiBQcm9taXNlPFBsYXRmb3JtU3RhdHM+IHtcclxuICAgIHJldHVybiB0aGlzLmRvbmF0aW9uc1NlcnZpY2UuZ2V0UGxhdGZvcm1TdGF0cygpO1xyXG4gIH1cclxuXHJcbiAgQE11dGF0aW9uKCgpID0+IERvbmF0aW9uLCB7IGRlc2NyaXB0aW9uOiAnQ3JlYXRlIGEgbmV3IHN1cnBsdXMgZm9vZCBkb25hdGlvbicgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuRE9OT1IpXHJcbiAgYXN5bmMgY3JlYXRlRG9uYXRpb24oXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygnaW5wdXQnLCB7IHR5cGU6ICgpID0+IENyZWF0ZURvbmF0aW9uSW5wdXQgfSkgaW5wdXQ6IENyZWF0ZURvbmF0aW9uSW5wdXQsXHJcbiAgKTogUHJvbWlzZTxEb25hdGlvbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZG9uYXRpb25zU2VydmljZS5jcmVhdGUodXNlci5pZCwgaW5wdXQpIGFzIGFueTtcclxuICB9XHJcblxyXG4gIEBNdXRhdGlvbigoKSA9PiBEb25hdGlvbiwgeyBkZXNjcmlwdGlvbjogJ1VwZGF0ZSBhbiBleGlzdGluZyBmb29kIGRvbmF0aW9uJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkLCBSb2xlc0d1YXJkKVxyXG4gIEBSb2xlcyhVc2VyUm9sZS5ET05PUilcclxuICBhc3luYyB1cGRhdGVEb25hdGlvbihcclxuICAgIEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSxcclxuICAgIEBBcmdzKCdpZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgaWQ6IHN0cmluZyxcclxuICAgIEBBcmdzKCdpbnB1dCcsIHsgdHlwZTogKCkgPT4gVXBkYXRlRG9uYXRpb25JbnB1dCB9KSBpbnB1dDogVXBkYXRlRG9uYXRpb25JbnB1dCxcclxuICApOiBQcm9taXNlPERvbmF0aW9uPiB7XHJcbiAgICByZXR1cm4gdGhpcy5kb25hdGlvbnNTZXJ2aWNlLnVwZGF0ZSh1c2VyLmlkLCBpZCwgaW5wdXQpIGFzIGFueTtcclxuICB9XHJcblxyXG4gIEBNdXRhdGlvbigoKSA9PiBEb25hdGlvbiwgeyBkZXNjcmlwdGlvbjogJ0NhbmNlbCBhbiBhY3RpdmUgZm9vZCBkb25hdGlvbicgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuRE9OT1IpXHJcbiAgYXN5bmMgY2FuY2VsRG9uYXRpb24oXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygnaWQnLCB7IHR5cGU6ICgpID0+IElEIH0pIGlkOiBzdHJpbmcsXHJcbiAgKTogUHJvbWlzZTxEb25hdGlvbj4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZG9uYXRpb25zU2VydmljZS5jYW5jZWwodXNlci5pZCwgaWQpIGFzIGFueTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlc29sdmVyIiwiUXVlcnkiLCJNdXRhdGlvbiIsIkFyZ3MiLCJJRCIsIlVzZUd1YXJkcyIsIkRvbmF0aW9uc1NlcnZpY2UiLCJEb25hdGlvbiIsIkNyZWF0ZURvbmF0aW9uSW5wdXQiLCJVcGRhdGVEb25hdGlvbklucHV0IiwiRG9uYXRpb25TdGF0dXMiLCJGb29kQ2F0ZWdvcnkiLCJVc2VyUm9sZSIsIkRvbm9yU3RhdHMiLCJQbGF0Zm9ybVN0YXRzIiwiR3FsQXV0aEd1YXJkIiwiUm9sZXNHdWFyZCIsIlJvbGVzIiwiQ3VycmVudFVzZXIiLCJEb25hdGlvbnNSZXNvbHZlciIsImRvbmF0aW9uc1NlcnZpY2UiLCJkb25hdGlvbnMiLCJzdGF0dXMiLCJjYXRlZ29yeSIsInNlYXJjaCIsImZpbmRBbGwiLCJhdmFpbGFibGVEb25hdGlvbnMiLCJmaW5kQXZhaWxhYmxlIiwiZG9uYXRpb24iLCJpZCIsImZpbmRCeUlkIiwibXlEb25hdGlvbnMiLCJ1c2VyIiwiZmluZEJ5RG9ub3IiLCJkb25vclN0YXRzIiwiZ2V0RG9ub3JTdGF0cyIsInBsYXRmb3JtU3RhdHMiLCJnZXRQbGF0Zm9ybVN0YXRzIiwiY3JlYXRlRG9uYXRpb24iLCJpbnB1dCIsImNyZWF0ZSIsInVwZGF0ZURvbmF0aW9uIiwidXBkYXRlIiwiY2FuY2VsRG9uYXRpb24iLCJjYW5jZWwiLCJkZXNjcmlwdGlvbiIsInR5cGUiLCJudWxsYWJsZSIsIlN0cmluZyIsIkRPTk9SIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFFBQVEsRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUVDLElBQUksRUFBRUMsRUFBRSxRQUFRLGtCQUFrQjtBQUN0RSxTQUFTQyxTQUFTLFFBQVEsaUJBQWlCO0FBQzNDLFNBQVNDLGdCQUFnQixRQUFRLHlCQUF5QjtBQUMxRCxTQUFTQyxRQUFRLFFBQVEsNkJBQTZCO0FBQ3RELFNBQVNDLG1CQUFtQixRQUFRLGlDQUFpQztBQUNyRSxTQUFTQyxtQkFBbUIsUUFBUSxpQ0FBaUM7QUFDckUsU0FBU0MsY0FBYyxFQUFFQyxZQUFZLEVBQUVDLFFBQVEsUUFBUSwyQkFBMkI7QUFDbEYsU0FBU0MsVUFBVSxFQUFFQyxhQUFhLFFBQVEsOEJBQThCO0FBQ3hFLFNBQVNDLFlBQVksUUFBUSxtQ0FBbUM7QUFDaEUsU0FBU0MsVUFBVSxRQUFRLGdDQUFnQztBQUMzRCxTQUFTQyxLQUFLLFFBQVEsd0NBQXdDO0FBQzlELFNBQVNDLFdBQVcsUUFBUSwrQ0FBK0M7QUFHM0UsT0FBTyxNQUFNQztJQUNYLFlBQVksQUFBaUJDLGdCQUFrQyxDQUFFO2FBQXBDQSxtQkFBQUE7SUFBcUM7SUFFbEUsTUFDTUMsVUFDSixBQUFnRUMsTUFBdUIsRUFDdkYsQUFBZ0VDLFFBQXVCLEVBQ3ZGLEFBQXdEQyxNQUFlLEVBQ2xEO1FBQ3JCLE9BQU8sSUFBSSxDQUFDSixnQkFBZ0IsQ0FBQ0ssT0FBTyxDQUFDO1lBQUVIO1lBQVFDO1lBQVVDO1FBQU87SUFDbEU7SUFFQSxNQUNNRSxxQkFBMEM7UUFDOUMsT0FBTyxJQUFJLENBQUNOLGdCQUFnQixDQUFDTyxhQUFhO0lBQzVDO0lBRUEsTUFDTUMsU0FBUyxBQUFnQ0MsRUFBVSxFQUFxQjtRQUM1RSxPQUFPLElBQUksQ0FBQ1QsZ0JBQWdCLENBQUNVLFFBQVEsQ0FBQ0Q7SUFDeEM7SUFFQSxNQUdNRSxZQUFZLEFBQWVDLElBQVMsRUFBdUI7UUFDL0QsT0FBTyxJQUFJLENBQUNaLGdCQUFnQixDQUFDYSxXQUFXLENBQUNELEtBQUtILEVBQUU7SUFDbEQ7SUFFQSxNQUdNSyxXQUFXLEFBQWVGLElBQVMsRUFBdUI7UUFDOUQsT0FBTyxJQUFJLENBQUNaLGdCQUFnQixDQUFDZSxhQUFhLENBQUNILEtBQUtILEVBQUU7SUFDcEQ7SUFFQSxNQUNNTyxnQkFBd0M7UUFDNUMsT0FBTyxJQUFJLENBQUNoQixnQkFBZ0IsQ0FBQ2lCLGdCQUFnQjtJQUMvQztJQUVBLE1BR01DLGVBQ0osQUFBZU4sSUFBUyxFQUN4QixBQUFvRE8sS0FBMEIsRUFDM0Q7UUFDbkIsT0FBTyxJQUFJLENBQUNuQixnQkFBZ0IsQ0FBQ29CLE1BQU0sQ0FBQ1IsS0FBS0gsRUFBRSxFQUFFVTtJQUMvQztJQUVBLE1BR01FLGVBQ0osQUFBZVQsSUFBUyxFQUN4QixBQUFnQ0gsRUFBVSxFQUMxQyxBQUFvRFUsS0FBMEIsRUFDM0Q7UUFDbkIsT0FBTyxJQUFJLENBQUNuQixnQkFBZ0IsQ0FBQ3NCLE1BQU0sQ0FBQ1YsS0FBS0gsRUFBRSxFQUFFQSxJQUFJVTtJQUNuRDtJQUVBLE1BR01JLGVBQ0osQUFBZVgsSUFBUyxFQUN4QixBQUFnQ0gsRUFBVSxFQUN2QjtRQUNuQixPQUFPLElBQUksQ0FBQ1QsZ0JBQWdCLENBQUN3QixNQUFNLENBQUNaLEtBQUtILEVBQUUsRUFBRUE7SUFDL0M7QUFDRjs7Y0FwRWU7WUFBQ3RCO1NBQVM7UUFBSXNDLGFBQWE7OztRQUVwQkMsTUFBTSxJQUFNcEM7UUFBZ0JxQyxVQUFVOzs7UUFDcENELE1BQU0sSUFBTW5DO1FBQWNvQyxVQUFVOzs7UUFDdENELE1BQU0sSUFBTUU7UUFBUUQsVUFBVTs7Ozs7Ozs7Ozs7Y0FLckM7WUFBQ3hDO1NBQVM7UUFBSXNDLGFBQWE7Ozs7Ozs7Y0FLM0J0QztRQUFZc0MsYUFBYTs7O1FBQ1RDLE1BQU0sSUFBTTFDOzs7Ozs7Ozs7Y0FJNUI7WUFBQ0c7U0FBUztRQUFJc0MsYUFBYTs7O21CQUV4Qkk7Ozs7Ozs7OztjQUtIcEM7UUFBY2dDLGFBQWE7OzttQkFFeEJJOzs7Ozs7Ozs7Y0FLSG5DO1FBQWlCK0IsYUFBYTs7Ozs7OztpQkFLM0J0QztRQUFZc0MsYUFBYTs7O21CQUV6Qkk7OztRQUdHSCxNQUFNLElBQU10Qzs7Ozs7Ozs7OztpQkFLZkQ7UUFBWXNDLGFBQWE7OzttQkFFekJJOzs7UUFHQUgsTUFBTSxJQUFNMUM7OztRQUNUMEMsTUFBTSxJQUFNckM7Ozs7Ozs7Ozs7O2lCQUtmRjtRQUFZc0MsYUFBYTs7O21CQUV6Qkk7OztRQUdBSCxNQUFNLElBQU0xQzs7Ozs7Ozs7OztpQkFwRWRHIn0=