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
import { PrismaService } from './prisma.service.js';
export class PrismaModule {
}
PrismaModule = _ts_decorate([
    Global(),
    Module({
        providers: [
            PrismaService
        ],
        exports: [
            PrismaService
        ]
    })
], PrismaModule);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcmlzbWEvcHJpc21hLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHbG9iYWwsIE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgUHJpc21hU2VydmljZSB9IGZyb20gJy4vcHJpc21hLnNlcnZpY2UuanMnO1xyXG5cclxuQEdsb2JhbCgpXHJcbkBNb2R1bGUoe1xyXG4gIHByb3ZpZGVyczogW1ByaXNtYVNlcnZpY2VdLFxyXG4gIGV4cG9ydHM6IFtQcmlzbWFTZXJ2aWNlXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFByaXNtYU1vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiR2xvYmFsIiwiTW9kdWxlIiwiUHJpc21hU2VydmljZSIsIlByaXNtYU1vZHVsZSIsInByb3ZpZGVycyIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxNQUFNLEVBQUVDLE1BQU0sUUFBUSxpQkFBaUI7QUFDaEQsU0FBU0MsYUFBYSxRQUFRLHNCQUFzQjtBQU9wRCxPQUFPLE1BQU1DO0FBQWM7Ozs7UUFIekJDLFdBQVc7WUFBQ0Y7U0FBYztRQUMxQkcsU0FBUztZQUFDSDtTQUFjIn0=