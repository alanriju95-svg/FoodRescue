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
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
export class UsersService {
    constructor(prisma){
        this.prisma = prisma;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async updateProfile(userId, input) {
        return this.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                ...input.name && {
                    name: input.name
                },
                ...input.phone !== undefined && {
                    phone: input.phone
                },
                ...input.organization !== undefined && {
                    organization: input.organization
                },
                ...input.address !== undefined && {
                    address: input.address
                },
                ...input.city !== undefined && {
                    city: input.city
                },
                ...input.bio !== undefined && {
                    bio: input.bio
                },
                ...input.vehicleType !== undefined && {
                    vehicleType: input.vehicleType
                }
            }
        });
    }
}
UsersService = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof PrismaService === "undefined" ? Object : PrismaService
    ])
], UsersService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2Vycy91c2Vycy5zZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5vdEZvdW5kRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBQcmlzbWFTZXJ2aWNlIH0gZnJvbSAnLi4vcHJpc21hL3ByaXNtYS5zZXJ2aWNlLmpzJztcclxuaW1wb3J0IHsgVXBkYXRlUHJvZmlsZUlucHV0IH0gZnJvbSAnLi9kdG8vdXBkYXRlLXByb2ZpbGUuaW5wdXQuanMnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVXNlcnNTZXJ2aWNlIHtcclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IHByaXNtYTogUHJpc21hU2VydmljZSkge31cclxuXHJcbiAgYXN5bmMgZmluZEJ5SWQoaWQ6IHN0cmluZykge1xyXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMucHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgIHdoZXJlOiB7IGlkIH0sXHJcbiAgICB9KTtcclxuICAgIGlmICghdXNlcikge1xyXG4gICAgICB0aHJvdyBuZXcgTm90Rm91bmRFeGNlcHRpb24oYFVzZXIgd2l0aCBJRCAke2lkfSBub3QgZm91bmRgKTtcclxuICAgIH1cclxuICAgIHJldHVybiB1c2VyO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBkYXRlUHJvZmlsZSh1c2VySWQ6IHN0cmluZywgaW5wdXQ6IFVwZGF0ZVByb2ZpbGVJbnB1dCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJpc21hLnVzZXIudXBkYXRlKHtcclxuICAgICAgd2hlcmU6IHsgaWQ6IHVzZXJJZCB9LFxyXG4gICAgICBkYXRhOiB7XHJcbiAgICAgICAgLi4uKGlucHV0Lm5hbWUgJiYgeyBuYW1lOiBpbnB1dC5uYW1lIH0pLFxyXG4gICAgICAgIC4uLihpbnB1dC5waG9uZSAhPT0gdW5kZWZpbmVkICYmIHsgcGhvbmU6IGlucHV0LnBob25lIH0pLFxyXG4gICAgICAgIC4uLihpbnB1dC5vcmdhbml6YXRpb24gIT09IHVuZGVmaW5lZCAmJiB7IG9yZ2FuaXphdGlvbjogaW5wdXQub3JnYW5pemF0aW9uIH0pLFxyXG4gICAgICAgIC4uLihpbnB1dC5hZGRyZXNzICE9PSB1bmRlZmluZWQgJiYgeyBhZGRyZXNzOiBpbnB1dC5hZGRyZXNzIH0pLFxyXG4gICAgICAgIC4uLihpbnB1dC5jaXR5ICE9PSB1bmRlZmluZWQgJiYgeyBjaXR5OiBpbnB1dC5jaXR5IH0pLFxyXG4gICAgICAgIC4uLihpbnB1dC5iaW8gIT09IHVuZGVmaW5lZCAmJiB7IGJpbzogaW5wdXQuYmlvIH0pLFxyXG4gICAgICAgIC4uLihpbnB1dC52ZWhpY2xlVHlwZSAhPT0gdW5kZWZpbmVkICYmIHsgdmVoaWNsZVR5cGU6IGlucHV0LnZlaGljbGVUeXBlIH0pLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJJbmplY3RhYmxlIiwiTm90Rm91bmRFeGNlcHRpb24iLCJQcmlzbWFTZXJ2aWNlIiwiVXNlcnNTZXJ2aWNlIiwicHJpc21hIiwiZmluZEJ5SWQiLCJpZCIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJ1cGRhdGVQcm9maWxlIiwidXNlcklkIiwiaW5wdXQiLCJ1cGRhdGUiLCJkYXRhIiwibmFtZSIsInBob25lIiwidW5kZWZpbmVkIiwib3JnYW5pemF0aW9uIiwiYWRkcmVzcyIsImNpdHkiLCJiaW8iLCJ2ZWhpY2xlVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsVUFBVSxFQUFFQyxpQkFBaUIsUUFBUSxpQkFBaUI7QUFDL0QsU0FBU0MsYUFBYSxRQUFRLDhCQUE4QjtBQUk1RCxPQUFPLE1BQU1DO0lBQ1gsWUFBWSxBQUFpQkMsTUFBcUIsQ0FBRTthQUF2QkEsU0FBQUE7SUFBd0I7SUFFckQsTUFBTUMsU0FBU0MsRUFBVSxFQUFFO1FBQ3pCLE1BQU1DLE9BQU8sTUFBTSxJQUFJLENBQUNILE1BQU0sQ0FBQ0csSUFBSSxDQUFDQyxVQUFVLENBQUM7WUFDN0NDLE9BQU87Z0JBQUVIO1lBQUc7UUFDZDtRQUNBLElBQUksQ0FBQ0MsTUFBTTtZQUNULE1BQU0sSUFBSU4sa0JBQWtCLENBQUMsYUFBYSxFQUFFSyxHQUFHLFVBQVUsQ0FBQztRQUM1RDtRQUNBLE9BQU9DO0lBQ1Q7SUFFQSxNQUFNRyxjQUFjQyxNQUFjLEVBQUVDLEtBQXlCLEVBQUU7UUFDN0QsT0FBTyxJQUFJLENBQUNSLE1BQU0sQ0FBQ0csSUFBSSxDQUFDTSxNQUFNLENBQUM7WUFDN0JKLE9BQU87Z0JBQUVILElBQUlLO1lBQU87WUFDcEJHLE1BQU07Z0JBQ0osR0FBSUYsTUFBTUcsSUFBSSxJQUFJO29CQUFFQSxNQUFNSCxNQUFNRyxJQUFJO2dCQUFDLENBQUM7Z0JBQ3RDLEdBQUlILE1BQU1JLEtBQUssS0FBS0MsYUFBYTtvQkFBRUQsT0FBT0osTUFBTUksS0FBSztnQkFBQyxDQUFDO2dCQUN2RCxHQUFJSixNQUFNTSxZQUFZLEtBQUtELGFBQWE7b0JBQUVDLGNBQWNOLE1BQU1NLFlBQVk7Z0JBQUMsQ0FBQztnQkFDNUUsR0FBSU4sTUFBTU8sT0FBTyxLQUFLRixhQUFhO29CQUFFRSxTQUFTUCxNQUFNTyxPQUFPO2dCQUFDLENBQUM7Z0JBQzdELEdBQUlQLE1BQU1RLElBQUksS0FBS0gsYUFBYTtvQkFBRUcsTUFBTVIsTUFBTVEsSUFBSTtnQkFBQyxDQUFDO2dCQUNwRCxHQUFJUixNQUFNUyxHQUFHLEtBQUtKLGFBQWE7b0JBQUVJLEtBQUtULE1BQU1TLEdBQUc7Z0JBQUMsQ0FBQztnQkFDakQsR0FBSVQsTUFBTVUsV0FBVyxLQUFLTCxhQUFhO29CQUFFSyxhQUFhVixNQUFNVSxXQUFXO2dCQUFDLENBQUM7WUFDM0U7UUFDRjtJQUNGO0FBQ0YifQ==