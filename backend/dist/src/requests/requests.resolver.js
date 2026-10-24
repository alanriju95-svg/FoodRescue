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
import { RequestsService } from './requests.service.js';
import { DonationRequest } from './models/request.model.js';
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
}
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
RequestsResolver = _ts_decorate([
    Resolver(()=>DonationRequest),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RequestsService === "undefined" ? Object : RequestsService
    ])
], RequestsResolver);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXF1ZXN0cy9yZXF1ZXN0cy5yZXNvbHZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvbHZlciwgUXVlcnksIE11dGF0aW9uLCBBcmdzLCBJRCB9IGZyb20gJ0BuZXN0anMvZ3JhcGhxbCc7XHJcbmltcG9ydCB7IFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgUmVxdWVzdHNTZXJ2aWNlIH0gZnJvbSAnLi9yZXF1ZXN0cy5zZXJ2aWNlLmpzJztcclxuaW1wb3J0IHsgRG9uYXRpb25SZXF1ZXN0IH0gZnJvbSAnLi9tb2RlbHMvcmVxdWVzdC5tb2RlbC5qcyc7XHJcbmltcG9ydCB7IENyZWF0ZVJlcXVlc3RJbnB1dCB9IGZyb20gJy4vZHRvL2NyZWF0ZS1yZXF1ZXN0LmlucHV0LmpzJztcclxuaW1wb3J0IHsgUmVjZWl2ZXJTdGF0cyB9IGZyb20gJy4uL2NvbW1vbi9kdG8vc3RhdHMudHlwZS5qcyc7XHJcbmltcG9ydCB7IFVzZXJSb2xlIH0gZnJvbSAnLi4vY29tbW9uL2VudW1zL2luZGV4LmpzJztcclxuaW1wb3J0IHsgR3FsQXV0aEd1YXJkIH0gZnJvbSAnLi4vYXV0aC9ndWFyZHMvZ3FsLWF1dGguZ3VhcmQuanMnO1xyXG5pbXBvcnQgeyBSb2xlc0d1YXJkIH0gZnJvbSAnLi4vYXV0aC9ndWFyZHMvcm9sZXMuZ3VhcmQuanMnO1xyXG5pbXBvcnQgeyBSb2xlcyB9IGZyb20gJy4uL2F1dGgvZGVjb3JhdG9ycy9yb2xlcy5kZWNvcmF0b3IuanMnO1xyXG5pbXBvcnQgeyBDdXJyZW50VXNlciB9IGZyb20gJy4uL2F1dGgvZGVjb3JhdG9ycy9jdXJyZW50LXVzZXIuZGVjb3JhdG9yLmpzJztcclxuXHJcbkBSZXNvbHZlcigoKSA9PiBEb25hdGlvblJlcXVlc3QpXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0c1Jlc29sdmVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHJlcXVlc3RzU2VydmljZTogUmVxdWVzdHNTZXJ2aWNlKSB7fVxyXG5cclxuICBAUXVlcnkoKCkgPT4gW0RvbmF0aW9uUmVxdWVzdF0sIHsgZGVzY3JpcHRpb246ICdHZXQgYWxsIHJlcXVlc3RzIG1hZGUgYnkgdGhlIGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHJlY2VpdmVyJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkLCBSb2xlc0d1YXJkKVxyXG4gIEBSb2xlcyhVc2VyUm9sZS5SRUNFSVZFUilcclxuICBhc3luYyBteVJlcXVlc3RzKEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSk6IFByb21pc2U8RG9uYXRpb25SZXF1ZXN0W10+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RzU2VydmljZS5maW5kQnlSZWNlaXZlcih1c2VyLmlkKSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBAUXVlcnkoKCkgPT4gRG9uYXRpb25SZXF1ZXN0LCB7IGRlc2NyaXB0aW9uOiAnR2V0IHJlcXVlc3QgZGV0YWlscyBieSBJRCcgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZClcclxuICBhc3luYyBkb25hdGlvblJlcXVlc3QoQEFyZ3MoJ2lkJywgeyB0eXBlOiAoKSA9PiBJRCB9KSBpZDogc3RyaW5nKTogUHJvbWlzZTxEb25hdGlvblJlcXVlc3Q+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RzU2VydmljZS5maW5kQnlJZChpZCkgYXMgYW55O1xyXG4gIH1cclxuXHJcbiAgQFF1ZXJ5KCgpID0+IFJlY2VpdmVyU3RhdHMsIHsgZGVzY3JpcHRpb246ICdHZXQgcmVjZWl2ZXIgZGFzaGJvYXJkIHN0YXRpc3RpY3MnIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlJFQ0VJVkVSKVxyXG4gIGFzeW5jIHJlY2VpdmVyU3RhdHMoQEN1cnJlbnRVc2VyKCkgdXNlcjogYW55KTogUHJvbWlzZTxSZWNlaXZlclN0YXRzPiB7XHJcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0c1NlcnZpY2UuZ2V0UmVjZWl2ZXJTdGF0cyh1c2VyLmlkKTtcclxuICB9XHJcblxyXG4gIEBNdXRhdGlvbigoKSA9PiBEb25hdGlvblJlcXVlc3QsIHsgZGVzY3JpcHRpb246ICdSZXF1ZXN0IGF2YWlsYWJsZSBzdXJwbHVzIGZvb2QgZm9yIHBpY2t1cCBhbmQgZGVsaXZlcnknIH0pXHJcbiAgQFVzZUd1YXJkcyhHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQpXHJcbiAgQFJvbGVzKFVzZXJSb2xlLlJFQ0VJVkVSKVxyXG4gIGFzeW5jIHJlcXVlc3REb25hdGlvbihcclxuICAgIEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSxcclxuICAgIEBBcmdzKCdpbnB1dCcsIHsgdHlwZTogKCkgPT4gQ3JlYXRlUmVxdWVzdElucHV0IH0pIGlucHV0OiBDcmVhdGVSZXF1ZXN0SW5wdXQsXHJcbiAgKTogUHJvbWlzZTxEb25hdGlvblJlcXVlc3Q+IHtcclxuICAgIHJldHVybiB0aGlzLnJlcXVlc3RzU2VydmljZS5jcmVhdGVSZXF1ZXN0KHVzZXIuaWQsIGlucHV0KSBhcyBhbnk7XHJcbiAgfVxyXG5cclxuICBATXV0YXRpb24oKCkgPT4gRG9uYXRpb25SZXF1ZXN0LCB7IGRlc2NyaXB0aW9uOiAnQ2FuY2VsIGFuIGFjdGl2ZSBwZW5kaW5nIGZvb2QgcmVxdWVzdCcgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZClcclxuICBAUm9sZXMoVXNlclJvbGUuUkVDRUlWRVIpXHJcbiAgYXN5bmMgY2FuY2VsUmVxdWVzdChcclxuICAgIEBDdXJyZW50VXNlcigpIHVzZXI6IGFueSxcclxuICAgIEBBcmdzKCdpZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgaWQ6IHN0cmluZyxcclxuICApOiBQcm9taXNlPERvbmF0aW9uUmVxdWVzdD4ge1xyXG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdHNTZXJ2aWNlLmNhbmNlbFJlcXVlc3QodXNlci5pZCwgaWQpIGFzIGFueTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlJlc29sdmVyIiwiUXVlcnkiLCJNdXRhdGlvbiIsIkFyZ3MiLCJJRCIsIlVzZUd1YXJkcyIsIlJlcXVlc3RzU2VydmljZSIsIkRvbmF0aW9uUmVxdWVzdCIsIkNyZWF0ZVJlcXVlc3RJbnB1dCIsIlJlY2VpdmVyU3RhdHMiLCJVc2VyUm9sZSIsIkdxbEF1dGhHdWFyZCIsIlJvbGVzR3VhcmQiLCJSb2xlcyIsIkN1cnJlbnRVc2VyIiwiUmVxdWVzdHNSZXNvbHZlciIsInJlcXVlc3RzU2VydmljZSIsIm15UmVxdWVzdHMiLCJ1c2VyIiwiZmluZEJ5UmVjZWl2ZXIiLCJpZCIsImRvbmF0aW9uUmVxdWVzdCIsImZpbmRCeUlkIiwicmVjZWl2ZXJTdGF0cyIsImdldFJlY2VpdmVyU3RhdHMiLCJyZXF1ZXN0RG9uYXRpb24iLCJpbnB1dCIsImNyZWF0ZVJlcXVlc3QiLCJjYW5jZWxSZXF1ZXN0IiwiZGVzY3JpcHRpb24iLCJSRUNFSVZFUiIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsUUFBUSxFQUFFQyxLQUFLLEVBQUVDLFFBQVEsRUFBRUMsSUFBSSxFQUFFQyxFQUFFLFFBQVEsa0JBQWtCO0FBQ3RFLFNBQVNDLFNBQVMsUUFBUSxpQkFBaUI7QUFDM0MsU0FBU0MsZUFBZSxRQUFRLHdCQUF3QjtBQUN4RCxTQUFTQyxlQUFlLFFBQVEsNEJBQTRCO0FBQzVELFNBQVNDLGtCQUFrQixRQUFRLGdDQUFnQztBQUNuRSxTQUFTQyxhQUFhLFFBQVEsOEJBQThCO0FBQzVELFNBQVNDLFFBQVEsUUFBUSwyQkFBMkI7QUFDcEQsU0FBU0MsWUFBWSxRQUFRLG1DQUFtQztBQUNoRSxTQUFTQyxVQUFVLFFBQVEsZ0NBQWdDO0FBQzNELFNBQVNDLEtBQUssUUFBUSx3Q0FBd0M7QUFDOUQsU0FBU0MsV0FBVyxRQUFRLCtDQUErQztBQUczRSxPQUFPLE1BQU1DO0lBQ1gsWUFBWSxBQUFpQkMsZUFBZ0MsQ0FBRTthQUFsQ0Esa0JBQUFBO0lBQW1DO0lBRWhFLE1BR01DLFdBQVcsQUFBZUMsSUFBUyxFQUE4QjtRQUNyRSxPQUFPLElBQUksQ0FBQ0YsZUFBZSxDQUFDRyxjQUFjLENBQUNELEtBQUtFLEVBQUU7SUFDcEQ7SUFFQSxNQUVNQyxnQkFBZ0IsQUFBZ0NELEVBQVUsRUFBNEI7UUFDMUYsT0FBTyxJQUFJLENBQUNKLGVBQWUsQ0FBQ00sUUFBUSxDQUFDRjtJQUN2QztJQUVBLE1BR01HLGNBQWMsQUFBZUwsSUFBUyxFQUEwQjtRQUNwRSxPQUFPLElBQUksQ0FBQ0YsZUFBZSxDQUFDUSxnQkFBZ0IsQ0FBQ04sS0FBS0UsRUFBRTtJQUN0RDtJQUVBLE1BR01LLGdCQUNKLEFBQWVQLElBQVMsRUFDeEIsQUFBbURRLEtBQXlCLEVBQ2xEO1FBQzFCLE9BQU8sSUFBSSxDQUFDVixlQUFlLENBQUNXLGFBQWEsQ0FBQ1QsS0FBS0UsRUFBRSxFQUFFTTtJQUNyRDtJQUVBLE1BR01FLGNBQ0osQUFBZVYsSUFBUyxFQUN4QixBQUFnQ0UsRUFBVSxFQUNoQjtRQUMxQixPQUFPLElBQUksQ0FBQ0osZUFBZSxDQUFDWSxhQUFhLENBQUNWLEtBQUtFLEVBQUUsRUFBRUE7SUFDckQ7QUFDRjs7Y0F2Q2U7WUFBQ2I7U0FBZ0I7UUFBSXNCLGFBQWE7OzttQkFFL0JDOzs7Ozs7Ozs7Y0FLSHZCO1FBQW1Cc0IsYUFBYTs7OztRQUVURSxNQUFNLElBQU0zQjs7Ozs7Ozs7O2NBSW5DSztRQUFpQm9CLGFBQWE7OzttQkFFM0JDOzs7Ozs7Ozs7aUJBS0F2QjtRQUFtQnNCLGFBQWE7OzttQkFFaENDOzs7UUFHR0MsTUFBTSxJQUFNdkI7Ozs7Ozs7Ozs7aUJBS2ZEO1FBQW1Cc0IsYUFBYTs7O21CQUVoQ0M7OztRQUdBQyxNQUFNLElBQU0zQjs7Ozs7Ozs7OztpQkF2Q2RHIn0=