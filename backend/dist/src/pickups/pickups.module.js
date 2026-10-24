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
import { PickupsService } from './pickups.service.js';
import { PickupsResolver } from './pickups.resolver.js';
export class PickupsModule {
}
PickupsModule = _ts_decorate([
    Module({
        providers: [
            PickupsService,
            PickupsResolver
        ],
        exports: [
            PickupsService
        ]
    })
], PickupsModule);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9waWNrdXBzL3BpY2t1cHMubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZSB9IGZyb20gJ0BuZXN0anMvY29tbW9uJztcclxuaW1wb3J0IHsgUGlja3Vwc1NlcnZpY2UgfSBmcm9tICcuL3BpY2t1cHMuc2VydmljZS5qcyc7XHJcbmltcG9ydCB7IFBpY2t1cHNSZXNvbHZlciB9IGZyb20gJy4vcGlja3Vwcy5yZXNvbHZlci5qcyc7XHJcblxyXG5ATW9kdWxlKHtcclxuICBwcm92aWRlcnM6IFtQaWNrdXBzU2VydmljZSwgUGlja3Vwc1Jlc29sdmVyXSxcclxuICBleHBvcnRzOiBbUGlja3Vwc1NlcnZpY2VdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGlja3Vwc01vZHVsZSB7fVxyXG4iXSwibmFtZXMiOlsiTW9kdWxlIiwiUGlja3Vwc1NlcnZpY2UiLCJQaWNrdXBzUmVzb2x2ZXIiLCJQaWNrdXBzTW9kdWxlIiwicHJvdmlkZXJzIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLE1BQU0sUUFBUSxpQkFBaUI7QUFDeEMsU0FBU0MsY0FBYyxRQUFRLHVCQUF1QjtBQUN0RCxTQUFTQyxlQUFlLFFBQVEsd0JBQXdCO0FBTXhELE9BQU8sTUFBTUM7QUFBZTs7O1FBSDFCQyxXQUFXO1lBQUNIO1lBQWdCQztTQUFnQjtRQUM1Q0csU0FBUztZQUFDSjtTQUFlIn0=