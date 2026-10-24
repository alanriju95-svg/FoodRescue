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
export class AppService {
    getHello() {
        return 'Hello World!';
    }
}
AppService = _ts_decorate([
    Injectable()
], AppService);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAuc2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQG5lc3Rqcy9jb21tb24nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQXBwU2VydmljZSB7XHJcbiAgZ2V0SGVsbG8oKTogc3RyaW5nIHtcclxuICAgIHJldHVybiAnSGVsbG8gV29ybGQhJztcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJBcHBTZXJ2aWNlIiwiZ2V0SGVsbG8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxVQUFVLFFBQVEsaUJBQWlCO0FBRzVDLE9BQU8sTUFBTUM7SUFDWEMsV0FBbUI7UUFDakIsT0FBTztJQUNUO0FBQ0YifQ==