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
import { UserRole } from '../../common/enums/index.js';
export class User {
}
_ts_decorate([
    Field(()=>ID),
    _ts_metadata("design:type", String)
], User.prototype, "id", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], User.prototype, "email", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], User.prototype, "name", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "phone", void 0);
_ts_decorate([
    Field(()=>UserRole),
    _ts_metadata("design:type", typeof UserRole === "undefined" ? Object : UserRole)
], User.prototype, "role", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "organization", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "address", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "city", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "bio", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], User.prototype, "vehicleType", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "createdAt", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], User.prototype, "updatedAt", void 0);
User = _ts_decorate([
    ObjectType('User')
], User);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91c2Vycy9tb2RlbHMvdXNlci5tb2RlbC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYmplY3RUeXBlLCBGaWVsZCwgSUQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9lbnVtcy9pbmRleC5qcyc7XHJcblxyXG5AT2JqZWN0VHlwZSgnVXNlcicpXHJcbmV4cG9ydCBjbGFzcyBVc2VyIHtcclxuICBARmllbGQoKCkgPT4gSUQpXHJcbiAgaWQhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgZW1haWwhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgbmFtZSE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIHBob25lPzogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IFVzZXJSb2xlKVxyXG4gIHJvbGUhOiBVc2VyUm9sZTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIG9yZ2FuaXphdGlvbj86IHN0cmluZyB8IG51bGw7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBhZGRyZXNzPzogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIGNpdHk/OiBzdHJpbmcgfCBudWxsO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgYmlvPzogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIHZlaGljbGVUeXBlPzogc3RyaW5nIHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUpXHJcbiAgY3JlYXRlZEF0ITogRGF0ZTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUpXHJcbiAgdXBkYXRlZEF0ITogRGF0ZTtcclxufVxyXG4iXSwibmFtZXMiOlsiT2JqZWN0VHlwZSIsIkZpZWxkIiwiSUQiLCJVc2VyUm9sZSIsIlVzZXIiLCJTdHJpbmciLCJudWxsYWJsZSIsIkRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFVBQVUsRUFBRUMsS0FBSyxFQUFFQyxFQUFFLFFBQVEsa0JBQWtCO0FBQ3hELFNBQVNDLFFBQVEsUUFBUSw4QkFBOEI7QUFHdkQsT0FBTyxNQUFNQztBQW9DYjs7Y0FuQ2VGOzs7O2NBR0FHOzs7O2NBR0FBOzs7O2NBR0FBO1FBQVVDLFVBQVU7Ozs7O2NBR3BCSDs7OztjQUdBRTtRQUFVQyxVQUFVOzs7OztjQUdwQkQ7UUFBVUMsVUFBVTs7Ozs7Y0FHcEJEO1FBQVVDLFVBQVU7Ozs7O2NBR3BCRDtRQUFVQyxVQUFVOzs7OztjQUdwQkQ7UUFBVUMsVUFBVTs7Ozs7Y0FHcEJDOzs7O2NBR0FBIn0=