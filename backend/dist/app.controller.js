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
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
export class AppController {
    constructor(appService){
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
}
_ts_decorate([
    Get(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
AppController = _ts_decorate([
    Controller(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof AppService === "undefined" ? Object : AppService
    ])
], AppController);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAuY29udHJvbGxlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250cm9sbGVyLCBHZXQgfSBmcm9tICdAbmVzdGpzL2NvbW1vbic7XHJcbmltcG9ydCB7IEFwcFNlcnZpY2UgfSBmcm9tICcuL2FwcC5zZXJ2aWNlLmpzJztcclxuXHJcbkBDb250cm9sbGVyKClcclxuZXhwb3J0IGNsYXNzIEFwcENvbnRyb2xsZXIge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgYXBwU2VydmljZTogQXBwU2VydmljZSkge31cclxuXHJcbiAgQEdldCgpXHJcbiAgZ2V0SGVsbG8oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiB0aGlzLmFwcFNlcnZpY2UuZ2V0SGVsbG8oKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJHZXQiLCJBcHBTZXJ2aWNlIiwiQXBwQ29udHJvbGxlciIsImFwcFNlcnZpY2UiLCJnZXRIZWxsbyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsVUFBVSxFQUFFQyxHQUFHLFFBQVEsaUJBQWlCO0FBQ2pELFNBQVNDLFVBQVUsUUFBUSxtQkFBbUI7QUFHOUMsT0FBTyxNQUFNQztJQUNYLFlBQVksQUFBaUJDLFVBQXNCLENBQUU7YUFBeEJBLGFBQUFBO0lBQXlCO0lBR3REQyxXQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQ0QsVUFBVSxDQUFDQyxRQUFRO0lBQ2pDO0FBQ0YifQ==