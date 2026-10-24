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
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { AuthResolver } from './auth.resolver.js';
import { JwtStrategy } from './jwt.strategy.js';
import { GqlAuthGuard } from './guards/gql-auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';
export class AuthModule {
}
AuthModule = _ts_decorate([
    Global(),
    Module({
        imports: [
            PassportModule.register({
                defaultStrategy: 'jwt'
            }),
            // Use registerAsync so JWT_SECRET is read after ConfigModule has loaded .env
            JwtModule.registerAsync({
                imports: [
                    ConfigModule
                ],
                inject: [
                    ConfigService
                ],
                useFactory: (config)=>({
                        secret: config.get('JWT_SECRET') || 'foodrescue_super_secure_jwt_secret_key_2026_antigravity',
                        signOptions: {
                            expiresIn: '7d'
                        }
                    })
            })
        ],
        providers: [
            AuthService,
            AuthResolver,
            JwtStrategy,
            GqlAuthGuard,
            RolesGuard
        ],
        exports: [
            AuthService,
            GqlAuthGuard,
            RolesGuard,
            JwtModule,
            PassportModule
        ]
    })
], AuthModule);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2F1dGgubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdsb2JhbCwgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBDb25maWdNb2R1bGUsIENvbmZpZ1NlcnZpY2UgfSBmcm9tICdAbmVzdGpzL2NvbmZpZyc7XHJcbmltcG9ydCB7IEp3dE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvand0JztcclxuaW1wb3J0IHsgUGFzc3BvcnRNb2R1bGUgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcclxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICcuL2F1dGguc2VydmljZS5qcyc7XHJcbmltcG9ydCB7IEF1dGhSZXNvbHZlciB9IGZyb20gJy4vYXV0aC5yZXNvbHZlci5qcyc7XHJcbmltcG9ydCB7IEp3dFN0cmF0ZWd5IH0gZnJvbSAnLi9qd3Quc3RyYXRlZ3kuanMnO1xyXG5pbXBvcnQgeyBHcWxBdXRoR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9ncWwtYXV0aC5ndWFyZC5qcyc7XHJcbmltcG9ydCB7IFJvbGVzR3VhcmQgfSBmcm9tICcuL2d1YXJkcy9yb2xlcy5ndWFyZC5qcyc7XHJcblxyXG5AR2xvYmFsKClcclxuQE1vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgUGFzc3BvcnRNb2R1bGUucmVnaXN0ZXIoeyBkZWZhdWx0U3RyYXRlZ3k6ICdqd3QnIH0pLFxyXG4gICAgLy8gVXNlIHJlZ2lzdGVyQXN5bmMgc28gSldUX1NFQ1JFVCBpcyByZWFkIGFmdGVyIENvbmZpZ01vZHVsZSBoYXMgbG9hZGVkIC5lbnZcclxuICAgIEp3dE1vZHVsZS5yZWdpc3RlckFzeW5jKHtcclxuICAgICAgaW1wb3J0czogW0NvbmZpZ01vZHVsZV0sXHJcbiAgICAgIGluamVjdDogW0NvbmZpZ1NlcnZpY2VdLFxyXG4gICAgICB1c2VGYWN0b3J5OiAoY29uZmlnOiBDb25maWdTZXJ2aWNlKSA9PiAoe1xyXG4gICAgICAgIHNlY3JldDogY29uZmlnLmdldDxzdHJpbmc+KCdKV1RfU0VDUkVUJykgfHwgJ2Zvb2RyZXNjdWVfc3VwZXJfc2VjdXJlX2p3dF9zZWNyZXRfa2V5XzIwMjZfYW50aWdyYXZpdHknLFxyXG4gICAgICAgIHNpZ25PcHRpb25zOiB7IGV4cGlyZXNJbjogJzdkJyB9LFxyXG4gICAgICB9KSxcclxuICAgIH0pLFxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbQXV0aFNlcnZpY2UsIEF1dGhSZXNvbHZlciwgSnd0U3RyYXRlZ3ksIEdxbEF1dGhHdWFyZCwgUm9sZXNHdWFyZF0sXHJcbiAgZXhwb3J0czogW0F1dGhTZXJ2aWNlLCBHcWxBdXRoR3VhcmQsIFJvbGVzR3VhcmQsIEp3dE1vZHVsZSwgUGFzc3BvcnRNb2R1bGVdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXV0aE1vZHVsZSB7fVxyXG5cclxuIl0sIm5hbWVzIjpbIkdsb2JhbCIsIk1vZHVsZSIsIkNvbmZpZ01vZHVsZSIsIkNvbmZpZ1NlcnZpY2UiLCJKd3RNb2R1bGUiLCJQYXNzcG9ydE1vZHVsZSIsIkF1dGhTZXJ2aWNlIiwiQXV0aFJlc29sdmVyIiwiSnd0U3RyYXRlZ3kiLCJHcWxBdXRoR3VhcmQiLCJSb2xlc0d1YXJkIiwiQXV0aE1vZHVsZSIsImltcG9ydHMiLCJyZWdpc3RlciIsImRlZmF1bHRTdHJhdGVneSIsInJlZ2lzdGVyQXN5bmMiLCJpbmplY3QiLCJ1c2VGYWN0b3J5IiwiY29uZmlnIiwic2VjcmV0IiwiZ2V0Iiwic2lnbk9wdGlvbnMiLCJleHBpcmVzSW4iLCJwcm92aWRlcnMiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsTUFBTSxFQUFFQyxNQUFNLFFBQVEsaUJBQWlCO0FBQ2hELFNBQVNDLFlBQVksRUFBRUMsYUFBYSxRQUFRLGlCQUFpQjtBQUM3RCxTQUFTQyxTQUFTLFFBQVEsY0FBYztBQUN4QyxTQUFTQyxjQUFjLFFBQVEsbUJBQW1CO0FBQ2xELFNBQVNDLFdBQVcsUUFBUSxvQkFBb0I7QUFDaEQsU0FBU0MsWUFBWSxRQUFRLHFCQUFxQjtBQUNsRCxTQUFTQyxXQUFXLFFBQVEsb0JBQW9CO0FBQ2hELFNBQVNDLFlBQVksUUFBUSw2QkFBNkI7QUFDMUQsU0FBU0MsVUFBVSxRQUFRLDBCQUEwQjtBQW1CckQsT0FBTyxNQUFNQztBQUFZOzs7O1FBZnZCQyxTQUFTO1lBQ1BQLGVBQWVRLFFBQVEsQ0FBQztnQkFBRUMsaUJBQWlCO1lBQU07WUFDakQsNkVBQTZFO1lBQzdFVixVQUFVVyxhQUFhLENBQUM7Z0JBQ3RCSCxTQUFTO29CQUFDVjtpQkFBYTtnQkFDdkJjLFFBQVE7b0JBQUNiO2lCQUFjO2dCQUN2QmMsWUFBWSxDQUFDQyxTQUEyQixDQUFBO3dCQUN0Q0MsUUFBUUQsT0FBT0UsR0FBRyxDQUFTLGlCQUFpQjt3QkFDNUNDLGFBQWE7NEJBQUVDLFdBQVc7d0JBQUs7b0JBQ2pDLENBQUE7WUFDRjtTQUNEO1FBQ0RDLFdBQVc7WUFBQ2pCO1lBQWFDO1lBQWNDO1lBQWFDO1lBQWNDO1NBQVc7UUFDN0VjLFNBQVM7WUFBQ2xCO1lBQWFHO1lBQWNDO1lBQVlOO1lBQVdDO1NBQWUifQ==