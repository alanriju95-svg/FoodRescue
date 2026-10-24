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
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
export class RolesGuard {
    constructor(reflector){
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req?.user;
        if (!user) {
            throw new ForbiddenException('Access denied: Authentication required');
        }
        const hasRole = requiredRoles.includes(user.role);
        if (!hasRole) {
            throw new ForbiddenException(`Access denied: Operation requires role(s) [${requiredRoles.join(', ')}]. Current role is [${user.role}].`);
        }
        return true;
    }
}
RolesGuard = _ts_decorate([
    Injectable(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Reflector === "undefined" ? Object : Reflector
    ])
], RolesGuard);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2d1YXJkcy9yb2xlcy5ndWFyZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBDYW5BY3RpdmF0ZSwgRXhlY3V0aW9uQ29udGV4dCwgRm9yYmlkZGVuRXhjZXB0aW9uIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBSZWZsZWN0b3IgfSBmcm9tICdAbmVzdGpzL2NvcmUnO1xyXG5pbXBvcnQgeyBHcWxFeGVjdXRpb25Db250ZXh0IH0gZnJvbSAnQG5lc3Rqcy9ncmFwaHFsJztcclxuaW1wb3J0IHsgUk9MRVNfS0VZIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9yb2xlcy5kZWNvcmF0b3IuanMnO1xyXG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9lbnVtcy9pbmRleC5qcyc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBSb2xlc0d1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmbGVjdG9yOiBSZWZsZWN0b3IpIHt9XHJcblxyXG4gIGNhbkFjdGl2YXRlKGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJlcXVpcmVkUm9sZXMgPSB0aGlzLnJlZmxlY3Rvci5nZXRBbGxBbmRPdmVycmlkZTxVc2VyUm9sZVtdPihST0xFU19LRVksIFtcclxuICAgICAgY29udGV4dC5nZXRIYW5kbGVyKCksXHJcbiAgICAgIGNvbnRleHQuZ2V0Q2xhc3MoKSxcclxuICAgIF0pO1xyXG5cclxuICAgIGlmICghcmVxdWlyZWRSb2xlcyB8fCByZXF1aXJlZFJvbGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjdHggPSBHcWxFeGVjdXRpb25Db250ZXh0LmNyZWF0ZShjb250ZXh0KTtcclxuICAgIGNvbnN0IHVzZXIgPSBjdHguZ2V0Q29udGV4dCgpLnJlcT8udXNlcjtcclxuXHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgdGhyb3cgbmV3IEZvcmJpZGRlbkV4Y2VwdGlvbignQWNjZXNzIGRlbmllZDogQXV0aGVudGljYXRpb24gcmVxdWlyZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYXNSb2xlID0gcmVxdWlyZWRSb2xlcy5pbmNsdWRlcyh1c2VyLnJvbGUpO1xyXG4gICAgaWYgKCFoYXNSb2xlKSB7XHJcbiAgICAgIHRocm93IG5ldyBGb3JiaWRkZW5FeGNlcHRpb24oXHJcbiAgICAgICAgYEFjY2VzcyBkZW5pZWQ6IE9wZXJhdGlvbiByZXF1aXJlcyByb2xlKHMpIFske3JlcXVpcmVkUm9sZXMuam9pbignLCAnKX1dLiBDdXJyZW50IHJvbGUgaXMgWyR7dXNlci5yb2xlfV0uYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkZvcmJpZGRlbkV4Y2VwdGlvbiIsIlJlZmxlY3RvciIsIkdxbEV4ZWN1dGlvbkNvbnRleHQiLCJST0xFU19LRVkiLCJSb2xlc0d1YXJkIiwicmVmbGVjdG9yIiwiY2FuQWN0aXZhdGUiLCJjb250ZXh0IiwicmVxdWlyZWRSb2xlcyIsImdldEFsbEFuZE92ZXJyaWRlIiwiZ2V0SGFuZGxlciIsImdldENsYXNzIiwibGVuZ3RoIiwiY3R4IiwiY3JlYXRlIiwidXNlciIsImdldENvbnRleHQiLCJyZXEiLCJoYXNSb2xlIiwiaW5jbHVkZXMiLCJyb2xlIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsVUFBVSxFQUFpQ0Msa0JBQWtCLFFBQVEsaUJBQWlCO0FBQy9GLFNBQVNDLFNBQVMsUUFBUSxlQUFlO0FBQ3pDLFNBQVNDLG1CQUFtQixRQUFRLGtCQUFrQjtBQUN0RCxTQUFTQyxTQUFTLFFBQVEsbUNBQW1DO0FBSTdELE9BQU8sTUFBTUM7SUFDWCxZQUFZLEFBQVFDLFNBQW9CLENBQUU7YUFBdEJBLFlBQUFBO0lBQXVCO0lBRTNDQyxZQUFZQyxPQUF5QixFQUFXO1FBQzlDLE1BQU1DLGdCQUFnQixJQUFJLENBQUNILFNBQVMsQ0FBQ0ksaUJBQWlCLENBQWFOLFdBQVc7WUFDNUVJLFFBQVFHLFVBQVU7WUFDbEJILFFBQVFJLFFBQVE7U0FDakI7UUFFRCxJQUFJLENBQUNILGlCQUFpQkEsY0FBY0ksTUFBTSxLQUFLLEdBQUc7WUFDaEQsT0FBTztRQUNUO1FBRUEsTUFBTUMsTUFBTVgsb0JBQW9CWSxNQUFNLENBQUNQO1FBQ3ZDLE1BQU1RLE9BQU9GLElBQUlHLFVBQVUsR0FBR0MsR0FBRyxFQUFFRjtRQUVuQyxJQUFJLENBQUNBLE1BQU07WUFDVCxNQUFNLElBQUlmLG1CQUFtQjtRQUMvQjtRQUVBLE1BQU1rQixVQUFVVixjQUFjVyxRQUFRLENBQUNKLEtBQUtLLElBQUk7UUFDaEQsSUFBSSxDQUFDRixTQUFTO1lBQ1osTUFBTSxJQUFJbEIsbUJBQ1IsQ0FBQywyQ0FBMkMsRUFBRVEsY0FBY2EsSUFBSSxDQUFDLE1BQU0sb0JBQW9CLEVBQUVOLEtBQUtLLElBQUksQ0FBQyxFQUFFLENBQUM7UUFFOUc7UUFFQSxPQUFPO0lBQ1Q7QUFDRiJ9