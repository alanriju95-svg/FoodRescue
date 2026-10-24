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
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RequestStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
export class DonationRequest {
}
_ts_decorate([
    Field(()=>ID),
    _ts_metadata("design:type", String)
], DonationRequest.prototype, "id", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], DonationRequest.prototype, "donationId", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], DonationRequest.prototype, "receiverId", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], DonationRequest.prototype, "deliveryAddress", void 0);
_ts_decorate([
    Field(()=>RequestStatus),
    _ts_metadata("design:type", typeof RequestStatus === "undefined" ? Object : RequestStatus)
], DonationRequest.prototype, "status", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], DonationRequest.prototype, "notes", void 0);
_ts_decorate([
    Field(()=>User, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof User === "undefined" ? Object : User)
], DonationRequest.prototype, "receiver", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DonationRequest.prototype, "createdAt", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], DonationRequest.prototype, "updatedAt", void 0);
DonationRequest = _ts_decorate([
    ObjectType('DonationRequest')
], DonationRequest);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXF1ZXN0cy9tb2RlbHMvcmVxdWVzdC5tb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RUeXBlLCBGaWVsZCwgSUQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0U3RhdHVzIH0gZnJvbSAnLi4vLi4vY29tbW9uL2VudW1zL2luZGV4LmpzJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3VzZXJzL21vZGVscy91c2VyLm1vZGVsLmpzJztcclxuaW1wb3J0IHR5cGUgeyBEb25hdGlvbiB9IGZyb20gJy4uLy4uL2RvbmF0aW9ucy9tb2RlbHMvZG9uYXRpb24ubW9kZWwuanMnO1xyXG5cclxuQE9iamVjdFR5cGUoJ0RvbmF0aW9uUmVxdWVzdCcpXHJcbmV4cG9ydCBjbGFzcyBEb25hdGlvblJlcXVlc3Qge1xyXG4gIEBGaWVsZCgoKSA9PiBJRClcclxuICBpZCE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZylcclxuICBkb25hdGlvbklkITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nKVxyXG4gIHJlY2VpdmVySWQhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgZGVsaXZlcnlBZGRyZXNzITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gUmVxdWVzdFN0YXR1cylcclxuICBzdGF0dXMhOiBSZXF1ZXN0U3RhdHVzO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgbm90ZXM/OiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICBARmllbGQoKCkgPT4gVXNlciwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIHJlY2VpdmVyPzogVXNlcjtcclxuXHJcbiAgZG9uYXRpb24/OiBEb25hdGlvbjtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUpXHJcbiAgY3JlYXRlZEF0ITogRGF0ZTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUpXHJcbiAgdXBkYXRlZEF0ITogRGF0ZTtcclxufVxyXG4iXSwibmFtZXMiOlsiT2JqZWN0VHlwZSIsIkZpZWxkIiwiSUQiLCJSZXF1ZXN0U3RhdHVzIiwiVXNlciIsIkRvbmF0aW9uUmVxdWVzdCIsIlN0cmluZyIsIm51bGxhYmxlIiwiRGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsVUFBVSxFQUFFQyxLQUFLLEVBQUVDLEVBQUUsUUFBUSxrQkFBa0I7QUFDeEQsU0FBU0MsYUFBYSxRQUFRLDhCQUE4QjtBQUM1RCxTQUFTQyxJQUFJLFFBQVEsbUNBQW1DO0FBSXhELE9BQU8sTUFBTUM7QUE2QmI7O2NBNUJlSDs7OztjQUdBSTs7OztjQUdBQTs7OztjQUdBQTs7OztjQUdBSDs7OztjQUdBRztRQUFVQyxVQUFVOzs7OztjQUdwQkg7UUFBUUcsVUFBVTs7Ozs7Y0FLbEJDOzs7O2NBR0FBIn0=