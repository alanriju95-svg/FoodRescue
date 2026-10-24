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
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
export class AuthService {
    constructor(prisma, jwtService){
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(input) {
        const existing = await this.prisma.user.findUnique({
            where: {
                email: input.email.toLowerCase().trim()
            }
        });
        if (existing) {
            throw new ConflictException('A user with this email already exists');
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(input.password, saltRounds);
        const user = await this.prisma.user.create({
            data: {
                email: input.email.toLowerCase().trim(),
                passwordHash,
                name: input.name,
                role: input.role,
                phone: input.phone,
                organization: input.organization,
                address: input.address,
                city: input.city,
                vehicleType: input.vehicleType
            }
        });
        const accessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role
        });
        return {
            accessToken,
            user: user
        };
    }
    async login(input) {
        const email = input.email.toLowerCase().trim();
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(input.password, user.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }
        const accessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
            role: user.role
        });
        return {
            accessToken,
            user: user
        };
    }
    async validateUser(userId) {
        return this.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
    }
}
AuthService = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof PrismaService === "undefined" ? Object : PrismaService,
        typeof JwtService === "undefined" ? Object : JwtService
    ])
], AuthService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2F1dGguc2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBDb25mbGljdEV4Y2VwdGlvbiwgVW5hdXRob3JpemVkRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBKd3RTZXJ2aWNlIH0gZnJvbSAnQG5lc3Rqcy9qd3QnO1xyXG5pbXBvcnQgKiBhcyBiY3J5cHQgZnJvbSAnYmNyeXB0JztcclxuaW1wb3J0IHsgUHJpc21hU2VydmljZSB9IGZyb20gJy4uL3ByaXNtYS9wcmlzbWEuc2VydmljZS5qcyc7XHJcbmltcG9ydCB7IFJlZ2lzdGVySW5wdXQgfSBmcm9tICcuL2R0by9yZWdpc3Rlci5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IExvZ2luSW5wdXQgfSBmcm9tICcuL2R0by9sb2dpbi5pbnB1dC5qcyc7XHJcbmltcG9ydCB7IEF1dGhSZXNwb25zZSB9IGZyb20gJy4vZHRvL2F1dGgtcmVzcG9uc2UudHlwZS5qcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHJlYWRvbmx5IHByaXNtYTogUHJpc21hU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVhZG9ubHkgand0U2VydmljZTogSnd0U2VydmljZSxcclxuICApIHt9XHJcblxyXG4gIGFzeW5jIHJlZ2lzdGVyKGlucHV0OiBSZWdpc3RlcklucHV0KTogUHJvbWlzZTxBdXRoUmVzcG9uc2U+IHtcclxuICAgIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgdGhpcy5wcmlzbWEudXNlci5maW5kVW5pcXVlKHtcclxuICAgICAgd2hlcmU6IHsgZW1haWw6IGlucHV0LmVtYWlsLnRvTG93ZXJDYXNlKCkudHJpbSgpIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZXhpc3RpbmcpIHtcclxuICAgICAgdGhyb3cgbmV3IENvbmZsaWN0RXhjZXB0aW9uKCdBIHVzZXIgd2l0aCB0aGlzIGVtYWlsIGFscmVhZHkgZXhpc3RzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2FsdFJvdW5kcyA9IDEwO1xyXG4gICAgY29uc3QgcGFzc3dvcmRIYXNoID0gYXdhaXQgYmNyeXB0Lmhhc2goaW5wdXQucGFzc3dvcmQsIHNhbHRSb3VuZHMpO1xyXG5cclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnByaXNtYS51c2VyLmNyZWF0ZSh7XHJcbiAgICAgIGRhdGE6IHtcclxuICAgICAgICBlbWFpbDogaW5wdXQuZW1haWwudG9Mb3dlckNhc2UoKS50cmltKCksXHJcbiAgICAgICAgcGFzc3dvcmRIYXNoLFxyXG4gICAgICAgIG5hbWU6IGlucHV0Lm5hbWUsXHJcbiAgICAgICAgcm9sZTogaW5wdXQucm9sZSxcclxuICAgICAgICBwaG9uZTogaW5wdXQucGhvbmUsXHJcbiAgICAgICAgb3JnYW5pemF0aW9uOiBpbnB1dC5vcmdhbml6YXRpb24sXHJcbiAgICAgICAgYWRkcmVzczogaW5wdXQuYWRkcmVzcyxcclxuICAgICAgICBjaXR5OiBpbnB1dC5jaXR5LFxyXG4gICAgICAgIHZlaGljbGVUeXBlOiBpbnB1dC52ZWhpY2xlVHlwZSxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gdGhpcy5qd3RTZXJ2aWNlLnNpZ24oe1xyXG4gICAgICBzdWI6IHVzZXIuaWQsXHJcbiAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxyXG4gICAgICByb2xlOiB1c2VyLnJvbGUsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhY2Nlc3NUb2tlbixcclxuICAgICAgdXNlcjogdXNlciBhcyBhbnksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgbG9naW4oaW5wdXQ6IExvZ2luSW5wdXQpOiBQcm9taXNlPEF1dGhSZXNwb25zZT4ge1xyXG4gICAgY29uc3QgZW1haWwgPSBpbnB1dC5lbWFpbC50b0xvd2VyQ2FzZSgpLnRyaW0oKTtcclxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBlbWFpbCB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCF1c2VyKSB7XHJcbiAgICAgIHRocm93IG5ldyBVbmF1dGhvcml6ZWRFeGNlcHRpb24oJ0ludmFsaWQgZW1haWwgb3IgcGFzc3dvcmQnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpc01hdGNoID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUoaW5wdXQucGFzc3dvcmQsIHVzZXIucGFzc3dvcmRIYXNoKTtcclxuICAgIGlmICghaXNNYXRjaCkge1xyXG4gICAgICB0aHJvdyBuZXcgVW5hdXRob3JpemVkRXhjZXB0aW9uKCdJbnZhbGlkIGVtYWlsIG9yIHBhc3N3b3JkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWNjZXNzVG9rZW4gPSB0aGlzLmp3dFNlcnZpY2Uuc2lnbih7XHJcbiAgICAgIHN1YjogdXNlci5pZCxcclxuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgIHJvbGU6IHVzZXIucm9sZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFjY2Vzc1Rva2VuLFxyXG4gICAgICB1c2VyOiB1c2VyIGFzIGFueSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBhc3luYyB2YWxpZGF0ZVVzZXIodXNlcklkOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiB0aGlzLnByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICB3aGVyZTogeyBpZDogdXNlcklkIH0sXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJDb25mbGljdEV4Y2VwdGlvbiIsIlVuYXV0aG9yaXplZEV4Y2VwdGlvbiIsIkp3dFNlcnZpY2UiLCJiY3J5cHQiLCJQcmlzbWFTZXJ2aWNlIiwiQXV0aFNlcnZpY2UiLCJwcmlzbWEiLCJqd3RTZXJ2aWNlIiwicmVnaXN0ZXIiLCJpbnB1dCIsImV4aXN0aW5nIiwidXNlciIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImVtYWlsIiwidG9Mb3dlckNhc2UiLCJ0cmltIiwic2FsdFJvdW5kcyIsInBhc3N3b3JkSGFzaCIsImhhc2giLCJwYXNzd29yZCIsImNyZWF0ZSIsImRhdGEiLCJuYW1lIiwicm9sZSIsInBob25lIiwib3JnYW5pemF0aW9uIiwiYWRkcmVzcyIsImNpdHkiLCJ2ZWhpY2xlVHlwZSIsImFjY2Vzc1Rva2VuIiwic2lnbiIsInN1YiIsImlkIiwibG9naW4iLCJpc01hdGNoIiwiY29tcGFyZSIsInZhbGlkYXRlVXNlciIsInVzZXJJZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsVUFBVSxFQUFFQyxpQkFBaUIsRUFBRUMscUJBQXFCLFFBQVEsaUJBQWlCO0FBQ3RGLFNBQVNDLFVBQVUsUUFBUSxjQUFjO0FBQ3pDLFlBQVlDLFlBQVksU0FBUztBQUNqQyxTQUFTQyxhQUFhLFFBQVEsOEJBQThCO0FBTTVELE9BQU8sTUFBTUM7SUFDWCxZQUNFLEFBQWlCQyxNQUFxQixFQUN0QyxBQUFpQkMsVUFBc0IsQ0FDdkM7YUFGaUJELFNBQUFBO2FBQ0FDLGFBQUFBO0lBQ2hCO0lBRUgsTUFBTUMsU0FBU0MsS0FBb0IsRUFBeUI7UUFDMUQsTUFBTUMsV0FBVyxNQUFNLElBQUksQ0FBQ0osTUFBTSxDQUFDSyxJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUNqREMsT0FBTztnQkFBRUMsT0FBT0wsTUFBTUssS0FBSyxDQUFDQyxXQUFXLEdBQUdDLElBQUk7WUFBRztRQUNuRDtRQUVBLElBQUlOLFVBQVU7WUFDWixNQUFNLElBQUlWLGtCQUFrQjtRQUM5QjtRQUVBLE1BQU1pQixhQUFhO1FBQ25CLE1BQU1DLGVBQWUsTUFBTWYsT0FBT2dCLElBQUksQ0FBQ1YsTUFBTVcsUUFBUSxFQUFFSDtRQUV2RCxNQUFNTixPQUFPLE1BQU0sSUFBSSxDQUFDTCxNQUFNLENBQUNLLElBQUksQ0FBQ1UsTUFBTSxDQUFDO1lBQ3pDQyxNQUFNO2dCQUNKUixPQUFPTCxNQUFNSyxLQUFLLENBQUNDLFdBQVcsR0FBR0MsSUFBSTtnQkFDckNFO2dCQUNBSyxNQUFNZCxNQUFNYyxJQUFJO2dCQUNoQkMsTUFBTWYsTUFBTWUsSUFBSTtnQkFDaEJDLE9BQU9oQixNQUFNZ0IsS0FBSztnQkFDbEJDLGNBQWNqQixNQUFNaUIsWUFBWTtnQkFDaENDLFNBQVNsQixNQUFNa0IsT0FBTztnQkFDdEJDLE1BQU1uQixNQUFNbUIsSUFBSTtnQkFDaEJDLGFBQWFwQixNQUFNb0IsV0FBVztZQUNoQztRQUNGO1FBRUEsTUFBTUMsY0FBYyxJQUFJLENBQUN2QixVQUFVLENBQUN3QixJQUFJLENBQUM7WUFDdkNDLEtBQUtyQixLQUFLc0IsRUFBRTtZQUNabkIsT0FBT0gsS0FBS0csS0FBSztZQUNqQlUsTUFBTWIsS0FBS2EsSUFBSTtRQUNqQjtRQUVBLE9BQU87WUFDTE07WUFDQW5CLE1BQU1BO1FBQ1I7SUFDRjtJQUVBLE1BQU11QixNQUFNekIsS0FBaUIsRUFBeUI7UUFDcEQsTUFBTUssUUFBUUwsTUFBTUssS0FBSyxDQUFDQyxXQUFXLEdBQUdDLElBQUk7UUFDNUMsTUFBTUwsT0FBTyxNQUFNLElBQUksQ0FBQ0wsTUFBTSxDQUFDSyxJQUFJLENBQUNDLFVBQVUsQ0FBQztZQUM3Q0MsT0FBTztnQkFBRUM7WUFBTTtRQUNqQjtRQUVBLElBQUksQ0FBQ0gsTUFBTTtZQUNULE1BQU0sSUFBSVYsc0JBQXNCO1FBQ2xDO1FBRUEsTUFBTWtDLFVBQVUsTUFBTWhDLE9BQU9pQyxPQUFPLENBQUMzQixNQUFNVyxRQUFRLEVBQUVULEtBQUtPLFlBQVk7UUFDdEUsSUFBSSxDQUFDaUIsU0FBUztZQUNaLE1BQU0sSUFBSWxDLHNCQUFzQjtRQUNsQztRQUVBLE1BQU02QixjQUFjLElBQUksQ0FBQ3ZCLFVBQVUsQ0FBQ3dCLElBQUksQ0FBQztZQUN2Q0MsS0FBS3JCLEtBQUtzQixFQUFFO1lBQ1puQixPQUFPSCxLQUFLRyxLQUFLO1lBQ2pCVSxNQUFNYixLQUFLYSxJQUFJO1FBQ2pCO1FBRUEsT0FBTztZQUNMTTtZQUNBbkIsTUFBTUE7UUFDUjtJQUNGO0lBRUEsTUFBTTBCLGFBQWFDLE1BQWMsRUFBRTtRQUNqQyxPQUFPLElBQUksQ0FBQ2hDLE1BQU0sQ0FBQ0ssSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDakNDLE9BQU87Z0JBQUVvQixJQUFJSztZQUFPO1FBQ3RCO0lBQ0Y7QUFDRiJ9