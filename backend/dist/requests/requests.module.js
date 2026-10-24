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
import { RequestsService } from './requests.service.js';
import { RequestsResolver } from './requests.resolver.js';
export class RequestsModule {
}
RequestsModule = _ts_decorate([
    Module({
        providers: [
            RequestsService,
            RequestsResolver
        ],
        exports: [
            RequestsService
        ]
    })
], RequestsModule);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXF1ZXN0cy9yZXF1ZXN0cy5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTW9kdWxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5pbXBvcnQgeyBSZXF1ZXN0c1NlcnZpY2UgfSBmcm9tICcuL3JlcXVlc3RzLnNlcnZpY2UuanMnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0c1Jlc29sdmVyIH0gZnJvbSAnLi9yZXF1ZXN0cy5yZXNvbHZlci5qcyc7XHJcblxyXG5ATW9kdWxlKHtcclxuICBwcm92aWRlcnM6IFtSZXF1ZXN0c1NlcnZpY2UsIFJlcXVlc3RzUmVzb2x2ZXJdLFxyXG4gIGV4cG9ydHM6IFtSZXF1ZXN0c1NlcnZpY2VdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdHNNb2R1bGUge31cclxuIl0sIm5hbWVzIjpbIk1vZHVsZSIsIlJlcXVlc3RzU2VydmljZSIsIlJlcXVlc3RzUmVzb2x2ZXIiLCJSZXF1ZXN0c01vZHVsZSIsInByb3ZpZGVycyIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxNQUFNLFFBQVEsaUJBQWlCO0FBQ3hDLFNBQVNDLGVBQWUsUUFBUSx3QkFBd0I7QUFDeEQsU0FBU0MsZ0JBQWdCLFFBQVEseUJBQXlCO0FBTTFELE9BQU8sTUFBTUM7QUFBZ0I7OztRQUgzQkMsV0FBVztZQUFDSDtZQUFpQkM7U0FBaUI7UUFDOUNHLFNBQVM7WUFBQ0o7U0FBZ0IifQ==