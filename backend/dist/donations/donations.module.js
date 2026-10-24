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
import { DonationsService } from './donations.service.js';
import { DonationsResolver } from './donations.resolver.js';
export class DonationsModule {
}
DonationsModule = _ts_decorate([
    Module({
        providers: [
            DonationsService,
            DonationsResolver
        ],
        exports: [
            DonationsService
        ]
    })
], DonationsModule);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kb25hdGlvbnMvZG9uYXRpb25zLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGUgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcbmltcG9ydCB7IERvbmF0aW9uc1NlcnZpY2UgfSBmcm9tICcuL2RvbmF0aW9ucy5zZXJ2aWNlLmpzJztcclxuaW1wb3J0IHsgRG9uYXRpb25zUmVzb2x2ZXIgfSBmcm9tICcuL2RvbmF0aW9ucy5yZXNvbHZlci5qcyc7XHJcblxyXG5ATW9kdWxlKHtcclxuICBwcm92aWRlcnM6IFtEb25hdGlvbnNTZXJ2aWNlLCBEb25hdGlvbnNSZXNvbHZlcl0sXHJcbiAgZXhwb3J0czogW0RvbmF0aW9uc1NlcnZpY2VdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgRG9uYXRpb25zTW9kdWxlIHt9XHJcbiJdLCJuYW1lcyI6WyJNb2R1bGUiLCJEb25hdGlvbnNTZXJ2aWNlIiwiRG9uYXRpb25zUmVzb2x2ZXIiLCJEb25hdGlvbnNNb2R1bGUiLCJwcm92aWRlcnMiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsTUFBTSxRQUFRLGlCQUFpQjtBQUN4QyxTQUFTQyxnQkFBZ0IsUUFBUSx5QkFBeUI7QUFDMUQsU0FBU0MsaUJBQWlCLFFBQVEsMEJBQTBCO0FBTTVELE9BQU8sTUFBTUM7QUFBaUI7OztRQUg1QkMsV0FBVztZQUFDSDtZQUFrQkM7U0FBa0I7UUFDaERHLFNBQVM7WUFBQ0o7U0FBaUIifQ==