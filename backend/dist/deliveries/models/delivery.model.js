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
export class Delivery {
}
_ts_decorate([
    Field(()=>ID),
    _ts_metadata("design:type", String)
], Delivery.prototype, "id", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], Delivery.prototype, "taskId", void 0);
_ts_decorate([
    Field(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], Delivery.prototype, "recipientConfirmation", void 0);
_ts_decorate([
    Field(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Delivery.prototype, "confirmedAt", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Delivery.prototype, "proofNotes", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Delivery.prototype, "createdAt", void 0);
Delivery = _ts_decorate([
    ObjectType('Delivery')
], Delivery);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZWxpdmVyaWVzL21vZGVscy9kZWxpdmVyeS5tb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RUeXBlLCBGaWVsZCwgSUQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5cclxuQE9iamVjdFR5cGUoJ0RlbGl2ZXJ5JylcclxuZXhwb3J0IGNsYXNzIERlbGl2ZXJ5IHtcclxuICBARmllbGQoKCkgPT4gSUQpXHJcbiAgaWQhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgdGFza0lkITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gQm9vbGVhbilcclxuICByZWNpcGllbnRDb25maXJtYXRpb24hOiBib29sZWFuO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGF0ZSwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIGNvbmZpcm1lZEF0PzogRGF0ZSB8IG51bGw7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBwcm9vZk5vdGVzPzogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUpXHJcbiAgY3JlYXRlZEF0ITogRGF0ZTtcclxufVxyXG4iXSwibmFtZXMiOlsiT2JqZWN0VHlwZSIsIkZpZWxkIiwiSUQiLCJEZWxpdmVyeSIsIlN0cmluZyIsIkJvb2xlYW4iLCJEYXRlIiwibnVsbGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxFQUFFLFFBQVEsa0JBQWtCO0FBR3hELE9BQU8sTUFBTUM7QUFrQmI7O2NBakJlRDs7OztjQUdBRTs7OztjQUdBQzs7OztjQUdBQztRQUFRQyxVQUFVOzs7OztjQUdsQkg7UUFBVUcsVUFBVTs7Ozs7Y0FHcEJEIn0=