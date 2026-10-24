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
import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/models/user.model.js';
export class AuthResponse {
}
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], AuthResponse.prototype, "accessToken", void 0);
_ts_decorate([
    Field(()=>User),
    _ts_metadata("design:type", typeof User === "undefined" ? Object : User)
], AuthResponse.prototype, "user", void 0);
AuthResponse = _ts_decorate([
    ObjectType('AuthResponse')
], AuthResponse);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hdXRoL2R0by9hdXRoLXJlc3BvbnNlLnR5cGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JqZWN0VHlwZSwgRmllbGQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vdXNlcnMvbW9kZWxzL3VzZXIubW9kZWwuanMnO1xyXG5cclxuQE9iamVjdFR5cGUoJ0F1dGhSZXNwb25zZScpXHJcbmV4cG9ydCBjbGFzcyBBdXRoUmVzcG9uc2Uge1xyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgYWNjZXNzVG9rZW4hOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBVc2VyKVxyXG4gIHVzZXIhOiBVc2VyO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJPYmplY3RUeXBlIiwiRmllbGQiLCJVc2VyIiwiQXV0aFJlc3BvbnNlIiwiU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxVQUFVLEVBQUVDLEtBQUssUUFBUSxrQkFBa0I7QUFDcEQsU0FBU0MsSUFBSSxRQUFRLG1DQUFtQztBQUd4RCxPQUFPLE1BQU1DO0FBTWI7O2NBTGVDOzs7O2NBR0FGIn0=