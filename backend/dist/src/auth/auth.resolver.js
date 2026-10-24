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
import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthResponse } from './dto/auth-response.type.js';
import { RegisterInput } from './dto/register.input.js';
import { LoginInput } from './dto/login.input.js';
import { User } from '../users/models/user.model.js';
import { GqlAuthGuard } from './guards/gql-auth.guard.js';
import { CurrentUser } from './decorators/current-user.decorator.js';
export class AuthResolver {
    constructor(authService){
        this.authService = authService;
    }
    async register(input) {
        return this.authService.register(input);
    }
    async login(input) {
        return this.authService.login(input);
    }
    async me(user) {
        return user;
    }
}
_ts_decorate([
    Mutation(()=>AuthResponse, {
        description: 'Register a new user (Donor, Volunteer, or Receiver)'
    }),
    _ts_param(0, Args('input', {
        type: ()=>RegisterInput
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RegisterInput === "undefined" ? Object : RegisterInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
_ts_decorate([
    Mutation(()=>AuthResponse, {
        description: 'Authenticate user and receive JWT access token'
    }),
    _ts_param(0, Args('input', {
        type: ()=>LoginInput
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof LoginInput === "undefined" ? Object : LoginInput
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
_ts_decorate([
    Query(()=>User, {
        description: 'Get currently authenticated user profile'
    }),
    UseGuards(GqlAuthGuard),
    _ts_param(0, CurrentUser()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthResolver.prototype, "me", null);
AuthResolver = _ts_decorate([
    Resolver(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AuthService === "undefined" ? Object : AuthService
    ])
], AuthResolver);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2F1dGgucmVzb2x2ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzb2x2ZXIsIE11dGF0aW9uLCBRdWVyeSwgQXJncyB9IGZyb20gJ0BuZXN0anMvZ3JhcGhxbCc7XHJcbmltcG9ydCB7IFVzZUd1YXJkcyB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZS5qcyc7XHJcbmltcG9ydCB7IEF1dGhSZXNwb25zZSB9IGZyb20gJy4vZHRvL2F1dGgtcmVzcG9uc2UudHlwZS5qcyc7XHJcbmltcG9ydCB7IFJlZ2lzdGVySW5wdXQgfSBmcm9tICcuL2R0by9yZWdpc3Rlci5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IExvZ2luSW5wdXQgfSBmcm9tICcuL2R0by9sb2dpbi5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi91c2Vycy9tb2RlbHMvdXNlci5tb2RlbC5qcyc7XHJcbmltcG9ydCB7IEdxbEF1dGhHdWFyZCB9IGZyb20gJy4vZ3VhcmRzL2dxbC1hdXRoLmd1YXJkLmpzJztcclxuaW1wb3J0IHsgQ3VycmVudFVzZXIgfSBmcm9tICcuL2RlY29yYXRvcnMvY3VycmVudC11c2VyLmRlY29yYXRvci5qcyc7XHJcblxyXG5AUmVzb2x2ZXIoKVxyXG5leHBvcnQgY2xhc3MgQXV0aFJlc29sdmVyIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkge31cclxuXHJcbiAgQE11dGF0aW9uKCgpID0+IEF1dGhSZXNwb25zZSwgeyBkZXNjcmlwdGlvbjogJ1JlZ2lzdGVyIGEgbmV3IHVzZXIgKERvbm9yLCBWb2x1bnRlZXIsIG9yIFJlY2VpdmVyKScgfSlcclxuICBhc3luYyByZWdpc3RlcihAQXJncygnaW5wdXQnLCB7IHR5cGU6ICgpID0+IFJlZ2lzdGVySW5wdXQgfSkgaW5wdXQ6IFJlZ2lzdGVySW5wdXQpOiBQcm9taXNlPEF1dGhSZXNwb25zZT4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UucmVnaXN0ZXIoaW5wdXQpO1xyXG4gIH1cclxuXHJcbiAgQE11dGF0aW9uKCgpID0+IEF1dGhSZXNwb25zZSwgeyBkZXNjcmlwdGlvbjogJ0F1dGhlbnRpY2F0ZSB1c2VyIGFuZCByZWNlaXZlIEpXVCBhY2Nlc3MgdG9rZW4nIH0pXHJcbiAgYXN5bmMgbG9naW4oQEFyZ3MoJ2lucHV0JywgeyB0eXBlOiAoKSA9PiBMb2dpbklucHV0IH0pIGlucHV0OiBMb2dpbklucHV0KTogUHJvbWlzZTxBdXRoUmVzcG9uc2U+IHtcclxuICAgIHJldHVybiB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKGlucHV0KTtcclxuICB9XHJcblxyXG4gIEBRdWVyeSgoKSA9PiBVc2VyLCB7IGRlc2NyaXB0aW9uOiAnR2V0IGN1cnJlbnRseSBhdXRoZW50aWNhdGVkIHVzZXIgcHJvZmlsZScgfSlcclxuICBAVXNlR3VhcmRzKEdxbEF1dGhHdWFyZClcclxuICBhc3luYyBtZShAQ3VycmVudFVzZXIoKSB1c2VyOiBhbnkpOiBQcm9taXNlPFVzZXI+IHtcclxuICAgIHJldHVybiB1c2VyO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiUmVzb2x2ZXIiLCJNdXRhdGlvbiIsIlF1ZXJ5IiwiQXJncyIsIlVzZUd1YXJkcyIsIkF1dGhTZXJ2aWNlIiwiQXV0aFJlc3BvbnNlIiwiUmVnaXN0ZXJJbnB1dCIsIkxvZ2luSW5wdXQiLCJVc2VyIiwiR3FsQXV0aEd1YXJkIiwiQ3VycmVudFVzZXIiLCJBdXRoUmVzb2x2ZXIiLCJhdXRoU2VydmljZSIsInJlZ2lzdGVyIiwiaW5wdXQiLCJsb2dpbiIsIm1lIiwidXNlciIsImRlc2NyaXB0aW9uIiwidHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxRQUFRLEVBQUVDLFFBQVEsRUFBRUMsS0FBSyxFQUFFQyxJQUFJLFFBQVEsa0JBQWtCO0FBQ2xFLFNBQVNDLFNBQVMsUUFBUSxpQkFBaUI7QUFDM0MsU0FBU0MsV0FBVyxRQUFRLG9CQUFvQjtBQUNoRCxTQUFTQyxZQUFZLFFBQVEsOEJBQThCO0FBQzNELFNBQVNDLGFBQWEsUUFBUSwwQkFBMEI7QUFDeEQsU0FBU0MsVUFBVSxRQUFRLHVCQUF1QjtBQUNsRCxTQUFTQyxJQUFJLFFBQVEsZ0NBQWdDO0FBQ3JELFNBQVNDLFlBQVksUUFBUSw2QkFBNkI7QUFDMUQsU0FBU0MsV0FBVyxRQUFRLHlDQUF5QztBQUdyRSxPQUFPLE1BQU1DO0lBQ1gsWUFBWSxBQUFpQkMsV0FBd0IsQ0FBRTthQUExQkEsY0FBQUE7SUFBMkI7SUFFeEQsTUFDTUMsU0FBUyxBQUE4Q0MsS0FBb0IsRUFBeUI7UUFDeEcsT0FBTyxJQUFJLENBQUNGLFdBQVcsQ0FBQ0MsUUFBUSxDQUFDQztJQUNuQztJQUVBLE1BQ01DLE1BQU0sQUFBMkNELEtBQWlCLEVBQXlCO1FBQy9GLE9BQU8sSUFBSSxDQUFDRixXQUFXLENBQUNHLEtBQUssQ0FBQ0Q7SUFDaEM7SUFFQSxNQUVNRSxHQUFHLEFBQWVDLElBQVMsRUFBaUI7UUFDaEQsT0FBT0E7SUFDVDtBQUNGOztpQkFma0JaO1FBQWdCYSxhQUFhOzs7UUFDYkMsTUFBTSxJQUFNYjs7Ozs7Ozs7O2lCQUk1QkQ7UUFBZ0JhLGFBQWE7OztRQUNoQkMsTUFBTSxJQUFNWjs7Ozs7Ozs7O2NBSTVCQztRQUFRVSxhQUFhIn0=