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
import { RequestsService } from './requests.service.js';
import { DonationRequest } from './models/request.model.js';
import { Donation } from '../donations/models/donation.model.js';
import { CreateRequestInput } from './dto/create-request.input.js';
import { ReceiverStats } from '../common/dto/stats.type.js';
import { UserRole } from '../common/enums/index.js';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
export class RequestsResolver {
    constructor(requestsService){
        this.requestsService = requestsService;
    }
    async donation(request) {
        if (request.donation) {
            return request.donation;
        }
        return this.requestsService.getDonationForRequest(request.donationId);
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
    async acceptRequest(user, requestId) {
        return this.requestsService.acceptRequest(user.id, requestId);
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
], RequestsResolver.prototype, "donation", null);
_ts_decorate([
    Query(()=>[
            DonationRequest
        ], {
        description: 'Get all requests made by the currently authenticated receiver'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
    _ts_param(0, CurrentUser()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], RequestsResolver.prototype, "myRequests", null);
_ts_decorate([
    Query(()=>DonationRequest, {
        description: 'Get request details by ID'
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
], RequestsResolver.prototype, "donationRequest", null);
_ts_decorate([
    Query(()=>ReceiverStats, {
        description: 'Get receiver dashboard statistics'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
    _ts_param(0, CurrentUser()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], RequestsResolver.prototype, "receiverStats", null);
_ts_decorate([
    Mutation(()=>DonationRequest, {
        description: 'Request available surplus food for pickup and delivery'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('input', {
        type: ()=>CreateRequestInput
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof CreateRequestInput === "undefined" ? Object : CreateRequestInput
    ]),
    _ts_metadata("design:returntype", Promise)
], RequestsResolver.prototype, "requestDonation", null);
_ts_decorate([
    Mutation(()=>DonationRequest, {
        description: 'Cancel an active pending food request'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.RECEIVER),
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
], RequestsResolver.prototype, "cancelRequest", null);
_ts_decorate([
    Mutation(()=>DonationRequest, {
        description: 'Donor accepts an incoming food request from a receiver'
    }),
    UseGuards(GqlAuthGuard, RolesGuard),
    Roles(UserRole.DONOR),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('requestId', {
        type: ()=>ID
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], RequestsResolver.prototype, "acceptRequest", null);
RequestsResolver = _ts_decorate([
    Resolver(()=>DonationRequest),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestsService === "undefined" ? Object : RequestsService
    ])
], RequestsResolver);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXF1ZXN0cy9yZXF1ZXN0cy5yZXNvbHZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvbHZlciwgUXVlcnksIE11dGF0aW9uLCBBcmdzLCBJRCwgUmVzb2x2ZUZpZWxkLCBQYXJlbnQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBVc2VHdWFyZHMgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcbmltcG9ydCB7IFJlcXVlc3RzU2VydmljZSB9IGZyb20gJy4vcmVxdWVzdHMuc2VydmljZS5qcyc7XHJcbmltcG9ydCB7IERvbmF0aW9uUmVxdWVzdCB9IGZyb20gJy4vbW9kZWxzL3JlcXVlc3QubW9kZWwuanMnO1xyXG5pbXBvcnQgeyBEb25hdGlvbiB9IGZyb20gJy4uL2RvbmF0aW9ucy9tb2RlbHMvZG9uYXRpb24ubW9kZWwuanMnO1xyXG5pbXBvcnQgeyBDcmVhdGVSZXF1ZXN0SW5wdXQgfSBmcm9tICcuL2R0by9jcmVhdGUtcmVxdWVzdC5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IFJlY2VpdmVyU3RhdHMgfSBmcm9tICcuLi9jb21tb24vZHRvL3N0YXRzLnR5cGUuanMnO1xyXG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4uL2NvbW1vbi9lbnVtcy9pbmRleC5qcyc7XHJcbmltcG9ydCB7IEdxbEF1dGhHdWFyZCB9IGZyb20gJy4uL2F1dGgvZ3VhcmRzL2dxbC1hdXRoLmd1YXJkLmpzJztcclxuaW1wb3J0IHsgUm9sZXNHdWFyZCB9IGZyb20gJy4uL2F1dGgvZ3VhcmRzL3JvbGVzLmd1YXJkLmpzJztcclxuaW1wb3J0IHsgUm9sZXMgfSBmcm9tICcuLi9hdXRoL2RlY29yYXRvcnMvcm9sZXMuZGVjb3JhdG9yLmpzJztcclxuaW1wb3J0IHsgQ3VycmVudFVzZXIgfSBmcm9tICcuLi9hdXRoL2RlY29yYXRvcnMvY3VycmVudC11c2VyLmRlY29yYXRvci5qcyc7XHJcblxyXG5AUmVzb2x2ZXIoKCkgPT4gRG9uYXRpb25SZXF1ZXN0KVxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdHNSZXNvbHZlciB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSByZXF1ZXN0c1NlcnZpY2U6IFJlcXVlc3RzU2VydmljZSkge31cclxuXHJcbiAgQFJlc29sdmVGaWVsZCgoKSA9PiBEb25hdGlvbiwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIGFzeW5jIGRvbmF0aW9uKEBQYXJlbnQoKSByZXF1ZXN0OiBEb25hdGlvblJlcXVlc3QgJiB7IGRvbmF0aW9uPzogRG9uYXRpb24gfSk6IFByb21pc2U8RG9uYXRpb24gfCBudWxsPiB7XHJcbiAgICBpZiAocmVxdWVzdC5kb25hdGlvbikge1xyXG4gICAgICByZXR1cm4gcmVxdWVzdC5kb25hdGlvbjtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RzU2VydmljZS5nZXREb25hdGlvbkZvclJlcXVlc3QocmVxdWVzdC5kb25hdGlvbklkKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW0RvbmF0aW9uUmVxdWVzdF0sIHsgZGVzY3JpcHRpb246ICdHZXQgYWxsIHJlcXVlc3RzIG1hZGUgYnkgdGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHJlY2VpdmVyJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkLCBSb2xlc0d1YXJkKVxyXG4gIEBSb2xlcyhVc2VyUm9sZS5SRUNFSVZFUilcclxuICBhc3luYyBteVJlcXVlc3RzKEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSk6IFByb21pc2U8RG9uYXRpb25SZXF1ZXN0W10+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RzU2VydmljZS5maW5kQnlSZWNlaXZlcih1c2VyLmlkKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gRG9uYXRpb25SZXF1ZXN0LCB7IGRlc2NyaXB0aW9uOiAnR2V0IHJlcXVlc3QgZGV0YWlscyBieSBJRCcgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZClcclxuICBhc3luYyBkb25hdGlvblJlcXVlc3QoQEFyZ3MoJ2lkJywgeyB0eXBlOiAoKSA9PiBJRCB9KSBpZDogc3RyaW5nKTogUHJvbWlzZTxEb25hdGlvblJlcXVlc3Q+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RzU2VydmljZS5maW5kQnlJZChpZCkgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQFF1ZXJ5KCgpID0+IFJlY2VpdmVyU3RhdHMsIHsgZGVzY3JpcHRpb246ICdHZXQgcmVjZWl2ZXIgZGFzaGJvYXJkIHN0YXRpc3RpY3MnIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlJFQ0VJVkVSKVxyXG4gIGFzeW5jIHJlY2VpdmVyU3RhdHMoQEN1cnJlbnRVc2VyKCkgdXNlcjogYW55KTogUHJvbWlzZTxSZWNlaXZlclN0YXRzPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0c1NlcnZpY2UuZ2V0UmVjZWl2ZXJTdGF0cyh1c2VyLmlkKTtcclxuICB9XHJcblxyXG4gIEBNdXRhdGlvbigoKSA9PiBEb25hdGlvblJlcXVlc3QsIHsgZGVzY3JpcHRpb246ICdSZXF1ZXN0IGF2YWlsYWJsZSBzdXJwbHVzIGZvb2QgZm9yIHBpY2t1cCBhbmQgZGVsaXZlcnknIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlJFQ0VJVkVSKVxyXG4gIGFzeW5jIHJlcXVlc3REb25hdGlvbihcclxuICAgIEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSxcclxuICAgIEBBcmdzKCdpbnB1dCcsIHsgdHlwZTogKCkgPT4gQ3JlYXRlUmVxdWVzdElucHV0IH0pIGlucHV0OiBDcmVhdGVSZXF1ZXN0SW5wdXQsXHJcbiAgKTogUHJvbWlzZTxEb25hdGlvblJlcXVlc3Q+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RzU2VydmljZS5jcmVhdGVSZXF1ZXN0KHVzZXIuaWQsIGlucHV0KSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBATXV0YXRpb24oKCkgPT4gRG9uYXRpb25SZXF1ZXN0LCB7IGRlc2NyaXB0aW9uOiAnQ2FuY2VsIGFuIGFjdGl2ZSBwZW5kaW5nIGZvb2QgcmVxdWVzdCcgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuUkVDRUlWRVIpXHJcbiAgYXN5bmMgY2FuY2VsUmVxdWVzdChcclxuICAgIEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSxcclxuICAgIEBBcmdzKCdpZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgaWQ6IHN0cmluZyxcclxuICApOiBQcm9taXNlPERvbmF0aW9uUmVxdWVzdD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdHNTZXJ2aWNlLmNhbmNlbFJlcXVlc3QodXNlci5pZCwgaWQpIGFzIGFueTtcclxuICB9XHJcblxyXG4gIEBNdXRhdGlvbigoKSA9PiBEb25hdGlvblJlcXVlc3QsIHsgZGVzY3JpcHRpb246ICdEb25vciBhY2NlcHRzIGFuIGluY29taW5nIGZvb2QgcmVxdWVzdCBmcm9tIGEgcmVjZWl2ZXInIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLkRPTk9SKVxyXG4gIGFzeW5jIGFjY2VwdFJlcXVlc3QoXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygncmVxdWVzdElkJywgeyB0eXBlOiAoKSA9PiBJRCB9KSByZXF1ZXN0SWQ6IHN0cmluZyxcclxuICApOiBQcm9taXNlPERvbmF0aW9uUmVxdWVzdD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdHNTZXJ2aWNlLmFjY2VwdFJlcXVlc3QodXNlci5pZCwgcmVxdWVzdElkKSBhcyBhbnk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJSZXNvbHZlciIsIlF1ZXJ5IiwiTXV0YXRpb24iLCJBcmdzIiwiSUQiLCJSZXNvbHZlRmllbGQiLCJQYXJlbnQiLCJVc2VHdWFyZHMiLCJSZXF1ZXN0c1NlcnZpY2UiLCJEb25hdGlvblJlcXVlc3QiLCJEb25hdGlvbiIsIkNyZWF0ZVJlcXVlc3RJbnB1dCIsIlJlY2VpdmVyU3RhdHMiLCJVc2VyUm9sZSIsIkdxbEF1dGhHdWFyZCIsIlJvbGVzR3VhcmQiLCJSb2xlcyIsIkN1cnJlbnRVc2VyIiwiUmVxdWVzdHNSZXNvbHZlciIsInJlcXVlc3RzU2VydmljZSIsImRvbmF0aW9uIiwicmVxdWVzdCIsImdldERvbmF0aW9uRm9yUmVxdWVzdCIsImRvbmF0aW9uSWQiLCJteVJlcXVlc3RzIiwidXNlciIsImZpbmRCeVJlY2VpdmVyIiwiaWQiLCJkb25hdGlvblJlcXVlc3QiLCJmaW5kQnlJZCIsInJlY2VpdmVyU3RhdHMiLCJnZXRSZWNlaXZlclN0YXRzIiwicmVxdWVzdERvbmF0aW9uIiwiaW5wdXQiLCJjcmVhdGVSZXF1ZXN0IiwiY2FuY2VsUmVxdWVzdCIsImFjY2VwdFJlcXVlc3QiLCJyZXF1ZXN0SWQiLCJudWxsYWJsZSIsImRlc2NyaXB0aW9uIiwiUkVDRUlWRVIiLCJ0eXBlIiwiRE9OT1IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsUUFBUSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRUMsSUFBSSxFQUFFQyxFQUFFLEVBQUVDLFlBQVksRUFBRUMsTUFBTSxRQUFRLGtCQUFrQjtBQUM1RixTQUFTQyxTQUFTLFFBQVEsaUJBQWlCO0FBQzNDLFNBQVNDLGVBQWUsUUFBUSx3QkFBd0I7QUFDeEQsU0FBU0MsZUFBZSxRQUFRLDRCQUE0QjtBQUM1RCxTQUFTQyxRQUFRLFFBQVEsd0NBQXdDO0FBQ2pFLFNBQVNDLGtCQUFrQixRQUFRLGdDQUFnQztBQUNuRSxTQUFTQyxhQUFhLFFBQVEsOEJBQThCO0FBQzVELFNBQVNDLFFBQVEsUUFBUSwyQkFBMkI7QUFDcEQsU0FBU0MsWUFBWSxRQUFRLG1DQUFtQztBQUNoRSxTQUFTQyxVQUFVLFFBQVEsZ0NBQWdDO0FBQzNELFNBQVNDLEtBQUssUUFBUSx3Q0FBd0M7QUFDOUQsU0FBU0MsV0FBVyxRQUFRLCtDQUErQztBQUczRSxPQUFPLE1BQU1DO0lBQ1gsWUFBWSxBQUFpQkMsZUFBZ0MsQ0FBRTthQUFsQ0Esa0JBQUFBO0lBQW1DO0lBRWhFLE1BQ01DLFNBQVMsQUFBVUMsT0FBa0QsRUFBNEI7UUFDckcsSUFBSUEsUUFBUUQsUUFBUSxFQUFFO1lBQ3BCLE9BQU9DLFFBQVFELFFBQVE7UUFDekI7UUFDQSxPQUFPLElBQUksQ0FBQ0QsZUFBZSxDQUFDRyxxQkFBcUIsQ0FBQ0QsUUFBUUUsVUFBVTtJQUN0RTtJQUVBLE1BR01DLFdBQVcsQUFBZUMsSUFBUyxFQUE4QjtRQUNyRSxPQUFPLElBQUksQ0FBQ04sZUFBZSxDQUFDTyxjQUFjLENBQUNELEtBQUtFLEVBQUU7SUFDcEQ7SUFFQSxNQUVNQyxnQkFBZ0IsQUFBZ0NELEVBQVUsRUFBNEI7UUFDMUYsT0FBTyxJQUFJLENBQUNSLGVBQWUsQ0FBQ1UsUUFBUSxDQUFDRjtJQUN2QztJQUVBLE1BR01HLGNBQWMsQUFBZUwsSUFBUyxFQUEwQjtRQUNwRSxPQUFPLElBQUksQ0FBQ04sZUFBZSxDQUFDWSxnQkFBZ0IsQ0FBQ04sS0FBS0UsRUFBRTtJQUN0RDtJQUVBLE1BR01LLGdCQUNKLEFBQWVQLElBQVMsRUFDeEIsQUFBbURRLEtBQXlCLEVBQ2xEO1FBQzFCLE9BQU8sSUFBSSxDQUFDZCxlQUFlLENBQUNlLGFBQWEsQ0FBQ1QsS0FBS0UsRUFBRSxFQUFFTTtJQUNyRDtJQUVBLE1BR01FLGNBQ0osQUFBZVYsSUFBUyxFQUN4QixBQUFnQ0UsRUFBVSxFQUNoQjtRQUMxQixPQUFPLElBQUksQ0FBQ1IsZUFBZSxDQUFDZ0IsYUFBYSxDQUFDVixLQUFLRSxFQUFFLEVBQUVBO0lBQ3JEO0lBRUEsTUFHTVMsY0FDSixBQUFlWCxJQUFTLEVBQ3hCLEFBQXVDWSxTQUFpQixFQUM5QjtRQUMxQixPQUFPLElBQUksQ0FBQ2xCLGVBQWUsQ0FBQ2lCLGFBQWEsQ0FBQ1gsS0FBS0UsRUFBRSxFQUFFVTtJQUNyRDtBQUNGOztxQkF6RHNCM0I7UUFBWTRCLFVBQVU7Ozs7Ozs7Ozs7Y0FRN0I7WUFBQzdCO1NBQWdCO1FBQUk4QixhQUFhOzs7bUJBRS9CQzs7Ozs7Ozs7O2NBS0gvQjtRQUFtQjhCLGFBQWE7Ozs7UUFFVEUsTUFBTSxJQUFNckM7Ozs7Ozs7OztjQUluQ1E7UUFBaUIyQixhQUFhOzs7bUJBRTNCQzs7Ozs7Ozs7O2lCQUtBL0I7UUFBbUI4QixhQUFhOzs7bUJBRWhDQzs7O1FBR0dDLE1BQU0sSUFBTTlCOzs7Ozs7Ozs7O2lCQUtmRjtRQUFtQjhCLGFBQWE7OzttQkFFaENDOzs7UUFHQUMsTUFBTSxJQUFNckM7Ozs7Ozs7Ozs7aUJBS1pLO1FBQW1COEIsYUFBYTs7O21CQUVoQ0c7OztRQUdPRCxNQUFNLElBQU1yQzs7Ozs7Ozs7OztpQkF6RHJCSyJ9