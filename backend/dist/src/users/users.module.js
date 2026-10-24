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
import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersResolver } from './users.resolver.js';
export class UsersModule {
}
UsersModule = _ts_decorate([
    Module({
        providers: [
            UsersService,
            UsersResolver
        ],
        exports: [
            UsersService
        ]
    })
], UsersModule);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91c2Vycy91c2Vycy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBVc2Vyc1NlcnZpY2UgfSBmcm9tICcuL3VzZXJzLnNlcnZpY2UuanMnO1xyXG5pbXBvcnQgeyBVc2Vyc1Jlc29sdmVyIH0gZnJvbSAnLi91c2Vycy5yZXNvbHZlci5qcyc7XHJcblxyXG5ATW9kdWxlKHtcclxuICBwcm92aWRlcnM6IFtVc2Vyc1NlcnZpY2UsIFVzZXJzUmVzb2x2ZXJdLFxyXG4gIGV4cG9ydHM6IFtVc2Vyc1NlcnZpY2VdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXNlcnNNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIk1vZHVsZSIsIlVzZXJzU2VydmljZSIsIlVzZXJzUmVzb2x2ZXIiLCJVc2Vyc01vZHVsZSIsInByb3ZpZGVycyIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxNQUFNLFFBQVEsaUJBQWlCO0FBQ3hDLFNBQVNDLFlBQVksUUFBUSxxQkFBcUI7QUFDbEQsU0FBU0MsYUFBYSxRQUFRLHNCQUFzQjtBQU1wRCxPQUFPLE1BQU1DO0FBQWE7OztRQUh4QkMsV0FBVztZQUFDSDtZQUFjQztTQUFjO1FBQ3hDRyxTQUFTO1lBQUNKO1NBQWEifQ==