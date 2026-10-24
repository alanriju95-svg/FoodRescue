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
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service.js';
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(prisma){
        // By the time JwtStrategy is instantiated, ConfigModule has already
        // loaded .env into process.env — safe to read here.
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env['JWT_SECRET'] || 'foodrescue_super_secure_jwt_secret_key_2026_antigravity'
        }), this.prisma = prisma;
    }
    async validate(payload) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        });
        if (!user) {
            throw new UnauthorizedException('User not found or session invalid');
        }
        return user;
    }
}
JwtStrategy = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof PrismaService === "undefined" ? Object : PrismaService
    ])
], JwtStrategy);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2p3dC5zdHJhdGVneS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBVbmF1dGhvcml6ZWRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XG5pbXBvcnQgeyBQYXNzcG9ydFN0cmF0ZWd5IH0gZnJvbSAnQG5lc3Rqcy9wYXNzcG9ydCc7XG5pbXBvcnQgeyBFeHRyYWN0Snd0LCBTdHJhdGVneSB9IGZyb20gJ3Bhc3Nwb3J0LWp3dCc7XG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlLmpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEp3dFN0cmF0ZWd5IGV4dGVuZHMgUGFzc3BvcnRTdHJhdGVneShTdHJhdGVneSkge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHByaXNtYTogUHJpc21hU2VydmljZSkge1xuICAgIC8vIEJ5IHRoZSB0aW1lIEp3dFN0cmF0ZWd5IGlzIGluc3RhbnRpYXRlZCwgQ29uZmlnTW9kdWxlIGhhcyBhbHJlYWR5XG4gICAgLy8gbG9hZGVkIC5lbnYgaW50byBwcm9jZXNzLmVudiDigJQgc2FmZSB0byByZWFkIGhlcmUuXG4gICAgc3VwZXIoe1xuICAgICAgand0RnJvbVJlcXVlc3Q6IEV4dHJhY3RKd3QuZnJvbUF1dGhIZWFkZXJBc0JlYXJlclRva2VuKCksXG4gICAgICBpZ25vcmVFeHBpcmF0aW9uOiBmYWxzZSxcbiAgICAgIHNlY3JldE9yS2V5OlxuICAgICAgICBwcm9jZXNzLmVudlsnSldUX1NFQ1JFVCddIHx8XG4gICAgICAgICdmb29kcmVzY3VlX3N1cGVyX3NlY3VyZV9qd3Rfc2VjcmV0X2tleV8yMDI2X2FudGlncmF2aXR5JyxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHZhbGlkYXRlKHBheWxvYWQ6IHsgc3ViOiBzdHJpbmc7IGVtYWlsOiBzdHJpbmc7IHJvbGU6IHN0cmluZyB9KSB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMucHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogcGF5bG9hZC5zdWIgfSxcbiAgICB9KTtcbiAgICBpZiAoIXVzZXIpIHtcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ1VzZXIgbm90IGZvdW5kIG9yIHNlc3Npb24gaW52YWxpZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdXNlcjtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJVbmF1dGhvcml6ZWRFeGNlcHRpb24iLCJQYXNzcG9ydFN0cmF0ZWd5IiwiRXh0cmFjdEp3dCIsIlN0cmF0ZWd5IiwiUHJpc21hU2VydmljZSIsIkp3dFN0cmF0ZWd5IiwicHJpc21hIiwiand0RnJvbVJlcXVlc3QiLCJmcm9tQXV0aEhlYWRlckFzQmVhcmVyVG9rZW4iLCJpZ25vcmVFeHBpcmF0aW9uIiwic2VjcmV0T3JLZXkiLCJwcm9jZXNzIiwiZW52IiwidmFsaWRhdGUiLCJwYXlsb2FkIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImlkIiwic3ViIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxVQUFVLEVBQUVDLHFCQUFxQixRQUFRLGlCQUFpQjtBQUNuRSxTQUFTQyxnQkFBZ0IsUUFBUSxtQkFBbUI7QUFDcEQsU0FBU0MsVUFBVSxFQUFFQyxRQUFRLFFBQVEsZUFBZTtBQUNwRCxTQUFTQyxhQUFhLFFBQVEsOEJBQThCO0FBRzVELE9BQU8sTUFBTUMsb0JBQW9CSixpQkFBaUJFO0lBQ2hELFlBQVksQUFBaUJHLE1BQXFCLENBQUU7UUFDbEQsb0VBQW9FO1FBQ3BFLG9EQUFvRDtRQUNwRCxLQUFLLENBQUM7WUFDSkMsZ0JBQWdCTCxXQUFXTSwyQkFBMkI7WUFDdERDLGtCQUFrQjtZQUNsQkMsYUFDRUMsUUFBUUMsR0FBRyxDQUFDLGFBQWEsSUFDekI7UUFDSixTQVQyQk4sU0FBQUE7SUFVN0I7SUFFQSxNQUFNTyxTQUFTQyxPQUFxRCxFQUFFO1FBQ3BFLE1BQU1DLE9BQU8sTUFBTSxJQUFJLENBQUNULE1BQU0sQ0FBQ1MsSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDN0NDLE9BQU87Z0JBQUVDLElBQUlKLFFBQVFLLEdBQUc7WUFBQztRQUMzQjtRQUNBLElBQUksQ0FBQ0osTUFBTTtZQUNULE1BQU0sSUFBSWYsc0JBQXNCO1FBQ2xDO1FBQ0EsT0FBT2U7SUFDVDtBQUNGIn0=