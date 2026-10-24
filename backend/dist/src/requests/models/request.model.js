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
import { Donation } from '../../donations/models/donation.model.js';
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
    Field(()=>Donation, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Donation === "undefined" ? Object : Donation)
], DonationRequest.prototype, "donation", void 0);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9yZXF1ZXN0cy9tb2RlbHMvcmVxdWVzdC5tb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RUeXBlLCBGaWVsZCwgSUQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0U3RhdHVzIH0gZnJvbSAnLi4vLi4vY29tbW9uL2VudW1zL2luZGV4LmpzJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3VzZXJzL21vZGVscy91c2VyLm1vZGVsLmpzJztcclxuaW1wb3J0IHsgRG9uYXRpb24gfSBmcm9tICcuLi8uLi9kb25hdGlvbnMvbW9kZWxzL2RvbmF0aW9uLm1vZGVsLmpzJztcclxuXHJcbkBPYmplY3RUeXBlKCdEb25hdGlvblJlcXVlc3QnKVxyXG5leHBvcnQgY2xhc3MgRG9uYXRpb25SZXF1ZXN0IHtcclxuICBARmllbGQoKCkgPT4gSUQpXHJcbiAgaWQhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgZG9uYXRpb25JZCE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZylcclxuICByZWNlaXZlcklkITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nKVxyXG4gIGRlbGl2ZXJ5QWRkcmVzcyE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFJlcXVlc3RTdGF0dXMpXHJcbiAgc3RhdHVzITogUmVxdWVzdFN0YXR1cztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIG5vdGVzPzogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IFVzZXIsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICByZWNlaXZlcj86IFVzZXI7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBEb25hdGlvbiwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIGRvbmF0aW9uPzogRG9uYXRpb247XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBEYXRlKVxyXG4gIGNyZWF0ZWRBdCE6IERhdGU7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBEYXRlKVxyXG4gIHVwZGF0ZWRBdCE6IERhdGU7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk9iamVjdFR5cGUiLCJGaWVsZCIsIklEIiwiUmVxdWVzdFN0YXR1cyIsIlVzZXIiLCJEb25hdGlvbiIsIkRvbmF0aW9uUmVxdWVzdCIsIlN0cmluZyIsIm51bGxhYmxlIiwiRGF0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsVUFBVSxFQUFFQyxLQUFLLEVBQUVDLEVBQUUsUUFBUSxrQkFBa0I7QUFDeEQsU0FBU0MsYUFBYSxRQUFRLDhCQUE4QjtBQUM1RCxTQUFTQyxJQUFJLFFBQVEsbUNBQW1DO0FBQ3hELFNBQVNDLFFBQVEsUUFBUSwyQ0FBMkM7QUFHcEUsT0FBTyxNQUFNQztBQThCYjs7Y0E3QmVKOzs7O2NBR0FLOzs7O2NBR0FBOzs7O2NBR0FBOzs7O2NBR0FKOzs7O2NBR0FJO1FBQVVDLFVBQVU7Ozs7O2NBR3BCSjtRQUFRSSxVQUFVOzs7OztjQUdsQkg7UUFBWUcsVUFBVTs7Ozs7Y0FHdEJDOzs7O2NBR0FBIn0=