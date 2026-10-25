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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRoL2p3dC5zdHJhdGVneS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBVbmF1dGhvcml6ZWRFeGNlcHRpb24gfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcbmltcG9ydCB7IFBhc3Nwb3J0U3RyYXRlZ3kgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcclxuaW1wb3J0IHsgRXh0cmFjdEp3dCwgU3RyYXRlZ3kgfSBmcm9tICdwYXNzcG9ydC1qd3QnO1xyXG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlLmpzJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEp3dFN0cmF0ZWd5IGV4dGVuZHMgUGFzc3BvcnRTdHJhdGVneShTdHJhdGVneSkge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgcHJpc21hOiBQcmlzbWFTZXJ2aWNlKSB7XHJcbiAgICAvLyBCeSB0aGUgdGltZSBKd3RTdHJhdGVneSBpcyBpbnN0YW50aWF0ZWQsIENvbmZpZ01vZHVsZSBoYXMgYWxyZWFkeVxyXG4gICAgLy8gbG9hZGVkIC5lbnYgaW50byBwcm9jZXNzLmVudiDigJQgc2FmZSB0byByZWFkIGhlcmUuXHJcbiAgICBzdXBlcih7XHJcbiAgICAgIGp3dEZyb21SZXF1ZXN0OiBFeHRyYWN0Snd0LmZyb21BdXRoSGVhZGVyQXNCZWFyZXJUb2tlbigpLFxyXG4gICAgICBpZ25vcmVFeHBpcmF0aW9uOiBmYWxzZSxcclxuICAgICAgc2VjcmV0T3JLZXk6XHJcbiAgICAgICAgcHJvY2Vzcy5lbnZbJ0pXVF9TRUNSRVQnXSB8fFxyXG4gICAgICAgICdmb29kcmVzY3VlX3N1cGVyX3NlY3VyZV9qd3Rfc2VjcmV0X2tleV8yMDI2X2FudGlncmF2aXR5JyxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgdmFsaWRhdGUocGF5bG9hZDogeyBzdWI6IHN0cmluZzsgZW1haWw6IHN0cmluZzsgcm9sZTogc3RyaW5nIH0pIHtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogcGF5bG9hZC5zdWIgfSxcclxuICAgIH0pO1xyXG4gICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ1VzZXIgbm90IGZvdW5kIG9yIHNlc3Npb24gaW52YWxpZCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHVzZXI7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiVW5hdXRob3JpemVkRXhjZXB0aW9uIiwiUGFzc3BvcnRTdHJhdGVneSIsIkV4dHJhY3RKd3QiLCJTdHJhdGVneSIsIlByaXNtYVNlcnZpY2UiLCJKd3RTdHJhdGVneSIsInByaXNtYSIsImp3dEZyb21SZXF1ZXN0IiwiZnJvbUF1dGhIZWFkZXJBc0JlYXJlclRva2VuIiwiaWdub3JlRXhwaXJhdGlvbiIsInNlY3JldE9yS2V5IiwicHJvY2VzcyIsImVudiIsInZhbGlkYXRlIiwicGF5bG9hZCIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpZCIsInN1YiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsVUFBVSxFQUFFQyxxQkFBcUIsUUFBUSxpQkFBaUI7QUFDbkUsU0FBU0MsZ0JBQWdCLFFBQVEsbUJBQW1CO0FBQ3BELFNBQVNDLFVBQVUsRUFBRUMsUUFBUSxRQUFRLGVBQWU7QUFDcEQsU0FBU0MsYUFBYSxRQUFRLDhCQUE4QjtBQUc1RCxPQUFPLE1BQU1DLG9CQUFvQkosaUJBQWlCRTtJQUNoRCxZQUFZLEFBQWlCRyxNQUFxQixDQUFFO1FBQ2xELG9FQUFvRTtRQUNwRSxvREFBb0Q7UUFDcEQsS0FBSyxDQUFDO1lBQ0pDLGdCQUFnQkwsV0FBV00sMkJBQTJCO1lBQ3REQyxrQkFBa0I7WUFDbEJDLGFBQ0VDLFFBQVFDLEdBQUcsQ0FBQyxhQUFhLElBQ3pCO1FBQ0osU0FUMkJOLFNBQUFBO0lBVTdCO0lBRUEsTUFBTU8sU0FBU0MsT0FBcUQsRUFBRTtRQUNwRSxNQUFNQyxPQUFPLE1BQU0sSUFBSSxDQUFDVCxNQUFNLENBQUNTLElBQUksQ0FBQ0MsVUFBVSxDQUFDO1lBQzdDQyxPQUFPO2dCQUFFQyxJQUFJSixRQUFRSyxHQUFHO1lBQUM7UUFDM0I7UUFDQSxJQUFJLENBQUNKLE1BQU07WUFDVCxNQUFNLElBQUlmLHNCQUFzQjtRQUNsQztRQUNBLE9BQU9lO0lBQ1Q7QUFDRiJ9