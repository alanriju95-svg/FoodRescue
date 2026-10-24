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
import { UsersService } from './users.service.js';
import { User } from './models/user.model.js';
import { UpdateProfileInput } from './dto/update-profile.input.js';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
export class UsersResolver {
    constructor(usersService){
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
}
_ts_decorate([
    Query(()=>User, {
        description: 'Get user details by ID'
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
], UsersResolver.prototype, "user", null);
_ts_decorate([
    Mutation(()=>User, {
        description: 'Update current user profile information'
    }),
    UseGuards(GqlAuthGuard),
    _ts_param(0, CurrentUser()),
    _ts_param(1, Args('input', {
        type: ()=>UpdateProfileInput
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        typeof UpdateProfileInput === "undefined" ? Object : UpdateProfileInput
    ]),
    _ts_metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateProfile", null);
UsersResolver = _ts_decorate([
    Resolver(()=>User),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof UsersService === "undefined" ? Object : UsersService
    ])
], UsersResolver);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91c2Vycy91c2Vycy5yZXNvbHZlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXNvbHZlciwgUXVlcnksIE11dGF0aW9uLCBBcmdzLCBJRCB9IGZyb20gJ0BuZXN0anMvZ3JhcGhxbCc7XHJcbmltcG9ydCB7IFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgVXNlcnNTZXJ2aWNlIH0gZnJvbSAnLi91c2Vycy5zZXJ2aWNlLmpzJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4vbW9kZWxzL3VzZXIubW9kZWwuanMnO1xyXG5pbXBvcnQgeyBVcGRhdGVQcm9maWxlSW5wdXQgfSBmcm9tICcuL2R0by91cGRhdGUtcHJvZmlsZS5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IEdxbEF1dGhHdWFyZCB9IGZyb20gJy4uL2F1dGgvZ3VhcmRzL2dxbC1hdXRoLmd1YXJkLmpzJztcclxuaW1wb3J0IHsgQ3VycmVudFVzZXIgfSBmcm9tICcuLi9hdXRoL2RlY29yYXRvcnMvY3VycmVudC11c2VyLmRlY29yYXRvci5qcyc7XHJcblxyXG5AUmVzb2x2ZXIoKCkgPT4gVXNlcilcclxuZXhwb3J0IGNsYXNzIFVzZXJzUmVzb2x2ZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgdXNlcnNTZXJ2aWNlOiBVc2Vyc1NlcnZpY2UpIHt9XHJcblxyXG4gIEBRdWVyeSgoKSA9PiBVc2VyLCB7IGRlc2NyaXB0aW9uOiAnR2V0IHVzZXIgZGV0YWlscyBieSBJRCcgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZClcclxuICBhc3luYyB1c2VyKEBBcmdzKCdpZCcsIHsgdHlwZTogKCkgPT4gSUQgfSkgaWQ6IHN0cmluZyk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMudXNlcnNTZXJ2aWNlLmZpbmRCeUlkKGlkKTtcclxuICAgIHJldHVybiB1c2VyIGFzIGFueTtcclxuICB9XHJcblxyXG4gIEBNdXRhdGlvbigoKSA9PiBVc2VyLCB7IGRlc2NyaXB0aW9uOiAnVXBkYXRlIGN1cnJlbnQgdXNlciBwcm9maWxlIGluZm9ybWF0aW9uJyB9KVxyXG4gIEBVc2VHdWFyZHMoR3FsQXV0aEd1YXJkKVxyXG4gIGFzeW5jIHVwZGF0ZVByb2ZpbGUoXHJcbiAgICBAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnksXHJcbiAgICBAQXJncygnaW5wdXQnLCB7IHR5cGU6ICgpID0+IFVwZGF0ZVByb2ZpbGVJbnB1dCB9KSBpbnB1dDogVXBkYXRlUHJvZmlsZUlucHV0LFxyXG4gICk6IFByb21pc2U8VXNlcj4ge1xyXG4gICAgY29uc3QgdXBkYXRlZCA9IGF3YWl0IHRoaXMudXNlcnNTZXJ2aWNlLnVwZGF0ZVByb2ZpbGUodXNlci5pZCwgaW5wdXQpO1xyXG4gICAgcmV0dXJuIHVwZGF0ZWQgYXMgYW55O1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiUmVzb2x2ZXIiLCJRdWVyeSIsIk11dGF0aW9uIiwiQXJncyIsIklEIiwiVXNlR3VhcmRzIiwiVXNlcnNTZXJ2aWNlIiwiVXNlciIsIlVwZGF0ZVByb2ZpbGVJbnB1dCIsIkdxbEF1dGhHdWFyZCIsIkN1cnJlbnRVc2VyIiwiVXNlcnNSZXNvbHZlciIsInVzZXJzU2VydmljZSIsInVzZXIiLCJpZCIsImZpbmRCeUlkIiwidXBkYXRlUHJvZmlsZSIsImlucHV0IiwidXBkYXRlZCIsImRlc2NyaXB0aW9uIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxRQUFRLEVBQUVDLEtBQUssRUFBRUMsUUFBUSxFQUFFQyxJQUFJLEVBQUVDLEVBQUUsUUFBUSxrQkFBa0I7QUFDdEUsU0FBU0MsU0FBUyxRQUFRLGlCQUFpQjtBQUMzQyxTQUFTQyxZQUFZLFFBQVEscUJBQXFCO0FBQ2xELFNBQVNDLElBQUksUUFBUSx5QkFBeUI7QUFDOUMsU0FBU0Msa0JBQWtCLFFBQVEsZ0NBQWdDO0FBQ25FLFNBQVNDLFlBQVksUUFBUSxtQ0FBbUM7QUFDaEUsU0FBU0MsV0FBVyxRQUFRLCtDQUErQztBQUczRSxPQUFPLE1BQU1DO0lBQ1gsWUFBWSxBQUFpQkMsWUFBMEIsQ0FBRTthQUE1QkEsZUFBQUE7SUFBNkI7SUFFMUQsTUFFTUMsS0FBSyxBQUFnQ0MsRUFBVSxFQUFpQjtRQUNwRSxNQUFNRCxPQUFPLE1BQU0sSUFBSSxDQUFDRCxZQUFZLENBQUNHLFFBQVEsQ0FBQ0Q7UUFDOUMsT0FBT0Q7SUFDVDtJQUVBLE1BRU1HLGNBQ0osQUFBZUgsSUFBUyxFQUN4QixBQUFtREksS0FBeUIsRUFDN0Q7UUFDZixNQUFNQyxVQUFVLE1BQU0sSUFBSSxDQUFDTixZQUFZLENBQUNJLGFBQWEsQ0FBQ0gsS0FBS0MsRUFBRSxFQUFFRztRQUMvRCxPQUFPQztJQUNUO0FBQ0Y7O2NBaEJlWDtRQUFRWSxhQUFhOzs7O1FBRVRDLE1BQU0sSUFBTWhCOzs7Ozs7Ozs7aUJBS3JCRztRQUFRWSxhQUFhOzs7OztRQUlsQkMsTUFBTSxJQUFNWjs7Ozs7Ozs7OztpQkFmakJEIn0=