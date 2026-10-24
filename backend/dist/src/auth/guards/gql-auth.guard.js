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
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
export class GqlAuthGuard extends AuthGuard('jwt') {
    getRequest(context) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
GqlAuthGuard = _ts_decorate([
    Injectable()
], GqlAuthGuard);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hdXRoL2d1YXJkcy9ncWwtYXV0aC5ndWFyZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeGVjdXRpb25Db250ZXh0LCBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBBdXRoR3VhcmQgfSBmcm9tICdAbmVzdGpzL3Bhc3Nwb3J0JztcclxuaW1wb3J0IHsgR3FsRXhlY3V0aW9uQ29udGV4dCB9IGZyb20gJ0BuZXN0anMvZ3JhcGhxbCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBHcWxBdXRoR3VhcmQgZXh0ZW5kcyBBdXRoR3VhcmQoJ2p3dCcpIHtcclxuICBnZXRSZXF1ZXN0KGNvbnRleHQ6IEV4ZWN1dGlvbkNvbnRleHQpIHtcclxuICAgIGNvbnN0IGN0eCA9IEdxbEV4ZWN1dGlvbkNvbnRleHQuY3JlYXRlKGNvbnRleHQpO1xyXG4gICAgcmV0dXJuIGN0eC5nZXRDb250ZXh0KCkucmVxO1xyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkF1dGhHdWFyZCIsIkdxbEV4ZWN1dGlvbkNvbnRleHQiLCJHcWxBdXRoR3VhcmQiLCJnZXRSZXF1ZXN0IiwiY29udGV4dCIsImN0eCIsImNyZWF0ZSIsImdldENvbnRleHQiLCJyZXEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUEyQkEsVUFBVSxRQUFRLGlCQUFpQjtBQUM5RCxTQUFTQyxTQUFTLFFBQVEsbUJBQW1CO0FBQzdDLFNBQVNDLG1CQUFtQixRQUFRLGtCQUFrQjtBQUd0RCxPQUFPLE1BQU1DLHFCQUFxQkYsVUFBVTtJQUMxQ0csV0FBV0MsT0FBeUIsRUFBRTtRQUNwQyxNQUFNQyxNQUFNSixvQkFBb0JLLE1BQU0sQ0FBQ0Y7UUFDdkMsT0FBT0MsSUFBSUUsVUFBVSxHQUFHQyxHQUFHO0lBQzdCO0FBQ0YifQ==