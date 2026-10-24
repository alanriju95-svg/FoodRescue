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
import { PickupStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
import { Delivery } from '../../deliveries/models/delivery.model.js';
import { Donation } from '../../donations/models/donation.model.js';
export class PickupTask {
}
_ts_decorate([
    Field(()=>ID),
    _ts_metadata("design:type", String)
], PickupTask.prototype, "id", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], PickupTask.prototype, "donationId", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], PickupTask.prototype, "volunteerId", void 0);
_ts_decorate([
    Field(()=>PickupStatus),
    _ts_metadata("design:type", typeof PickupStatus === "undefined" ? Object : PickupStatus)
], PickupTask.prototype, "status", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PickupTask.prototype, "notes", void 0);
_ts_decorate([
    Field(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PickupTask.prototype, "pickedUpAt", void 0);
_ts_decorate([
    Field(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PickupTask.prototype, "deliveredAt", void 0);
_ts_decorate([
    Field(()=>User, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof User === "undefined" ? Object : User)
], PickupTask.prototype, "volunteer", void 0);
_ts_decorate([
    Field(()=>Donation, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof Donation === "undefined" ? Object : Donation)
], PickupTask.prototype, "donation", void 0);
_ts_decorate([
    Field(()=>Delivery, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], PickupTask.prototype, "delivery", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PickupTask.prototype, "createdAt", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], PickupTask.prototype, "updatedAt", void 0);
PickupTask = _ts_decorate([
    ObjectType('PickupTask')
], PickupTask);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9waWNrdXBzL21vZGVscy9waWNrdXAtdGFzay5tb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RUeXBlLCBGaWVsZCwgSUQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBQaWNrdXBTdGF0dXMgfSBmcm9tICcuLi8uLi9jb21tb24vZW51bXMvaW5kZXguanMnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vdXNlcnMvbW9kZWxzL3VzZXIubW9kZWwuanMnO1xyXG5pbXBvcnQgeyBEZWxpdmVyeSB9IGZyb20gJy4uLy4uL2RlbGl2ZXJpZXMvbW9kZWxzL2RlbGl2ZXJ5Lm1vZGVsLmpzJztcclxuaW1wb3J0IHsgRG9uYXRpb24gfSBmcm9tICcuLi8uLi9kb25hdGlvbnMvbW9kZWxzL2RvbmF0aW9uLm1vZGVsLmpzJztcclxuXHJcbkBPYmplY3RUeXBlKCdQaWNrdXBUYXNrJylcclxuZXhwb3J0IGNsYXNzIFBpY2t1cFRhc2sge1xyXG4gIEBGaWVsZCgoKSA9PiBJRClcclxuICBpZCE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZylcclxuICBkb25hdGlvbklkITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nKVxyXG4gIHZvbHVudGVlcklkITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gUGlja3VwU3RhdHVzKVxyXG4gIHN0YXR1cyE6IFBpY2t1cFN0YXR1cztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIG5vdGVzPzogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBwaWNrZWRVcEF0PzogRGF0ZSB8IG51bGw7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBEYXRlLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgZGVsaXZlcmVkQXQ/OiBEYXRlIHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IFVzZXIsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICB2b2x1bnRlZXI/OiBVc2VyO1xyXG5cclxuICBARmllbGQoKCkgPT4gRG9uYXRpb24sIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBkb25hdGlvbj86IERvbmF0aW9uO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGVsaXZlcnksIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBkZWxpdmVyeT86IERlbGl2ZXJ5IHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUpXHJcbiAgY3JlYXRlZEF0ITogRGF0ZTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUpXHJcbiAgdXBkYXRlZEF0ITogRGF0ZTtcclxufVxyXG4iXSwibmFtZXMiOlsiT2JqZWN0VHlwZSIsIkZpZWxkIiwiSUQiLCJQaWNrdXBTdGF0dXMiLCJVc2VyIiwiRGVsaXZlcnkiLCJEb25hdGlvbiIsIlBpY2t1cFRhc2siLCJTdHJpbmciLCJudWxsYWJsZSIsIkRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxFQUFFLFFBQVEsa0JBQWtCO0FBQ3hELFNBQVNDLFlBQVksUUFBUSw4QkFBOEI7QUFDM0QsU0FBU0MsSUFBSSxRQUFRLG1DQUFtQztBQUN4RCxTQUFTQyxRQUFRLFFBQVEsNENBQTRDO0FBQ3JFLFNBQVNDLFFBQVEsUUFBUSwyQ0FBMkM7QUFHcEUsT0FBTyxNQUFNQztBQW9DYjs7Y0FuQ2VMOzs7O2NBR0FNOzs7O2NBR0FBOzs7O2NBR0FMOzs7O2NBR0FLO1FBQVVDLFVBQVU7Ozs7O2NBR3BCQztRQUFRRCxVQUFVOzs7OztjQUdsQkM7UUFBUUQsVUFBVTs7Ozs7Y0FHbEJMO1FBQVFLLFVBQVU7Ozs7O2NBR2xCSDtRQUFZRyxVQUFVOzs7OztjQUd0Qko7UUFBWUksVUFBVTs7Ozs7Y0FHdEJDOzs7O2NBR0FBIn0=