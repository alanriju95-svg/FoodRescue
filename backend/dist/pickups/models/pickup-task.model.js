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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9waWNrdXBzL21vZGVscy9waWNrdXAtdGFzay5tb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RUeXBlLCBGaWVsZCwgSUQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBQaWNrdXBTdGF0dXMgfSBmcm9tICcuLi8uLi9jb21tb24vZW51bXMvaW5kZXguanMnO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vdXNlcnMvbW9kZWxzL3VzZXIubW9kZWwuanMnO1xyXG5pbXBvcnQgeyBEZWxpdmVyeSB9IGZyb20gJy4uLy4uL2RlbGl2ZXJpZXMvbW9kZWxzL2RlbGl2ZXJ5Lm1vZGVsLmpzJztcclxuaW1wb3J0IHR5cGUgeyBEb25hdGlvbiB9IGZyb20gJy4uLy4uL2RvbmF0aW9ucy9tb2RlbHMvZG9uYXRpb24ubW9kZWwuanMnO1xyXG5cclxuQE9iamVjdFR5cGUoJ1BpY2t1cFRhc2snKVxyXG5leHBvcnQgY2xhc3MgUGlja3VwVGFzayB7XHJcbiAgQEZpZWxkKCgpID0+IElEKVxyXG4gIGlkITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nKVxyXG4gIGRvbmF0aW9uSWQhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgdm9sdW50ZWVySWQhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBQaWNrdXBTdGF0dXMpXHJcbiAgc3RhdHVzITogUGlja3VwU3RhdHVzO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgbm90ZXM/OiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGF0ZSwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIHBpY2tlZFVwQXQ/OiBEYXRlIHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBkZWxpdmVyZWRBdD86IERhdGUgfCBudWxsO1xyXG5cclxuICBARmllbGQoKCkgPT4gVXNlciwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIHZvbHVudGVlcj86IFVzZXI7XHJcblxyXG4gIGRvbmF0aW9uPzogRG9uYXRpb247XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBEZWxpdmVyeSwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIGRlbGl2ZXJ5PzogRGVsaXZlcnkgfCBudWxsO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGF0ZSlcclxuICBjcmVhdGVkQXQhOiBEYXRlO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGF0ZSlcclxuICB1cGRhdGVkQXQhOiBEYXRlO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJPYmplY3RUeXBlIiwiRmllbGQiLCJJRCIsIlBpY2t1cFN0YXR1cyIsIlVzZXIiLCJEZWxpdmVyeSIsIlBpY2t1cFRhc2siLCJTdHJpbmciLCJudWxsYWJsZSIsIkRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxFQUFFLFFBQVEsa0JBQWtCO0FBQ3hELFNBQVNDLFlBQVksUUFBUSw4QkFBOEI7QUFDM0QsU0FBU0MsSUFBSSxRQUFRLG1DQUFtQztBQUN4RCxTQUFTQyxRQUFRLFFBQVEsNENBQTRDO0FBSXJFLE9BQU8sTUFBTUM7QUFtQ2I7O2NBbENlSjs7OztjQUdBSzs7OztjQUdBQTs7OztjQUdBSjs7OztjQUdBSTtRQUFVQyxVQUFVOzs7OztjQUdwQkM7UUFBUUQsVUFBVTs7Ozs7Y0FHbEJDO1FBQVFELFVBQVU7Ozs7O2NBR2xCSjtRQUFRSSxVQUFVOzs7OztjQUtsQkg7UUFBWUcsVUFBVTs7Ozs7Y0FHdEJDOzs7O2NBR0FBIn0=