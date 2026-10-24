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
import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { FoodCategory, DonationStatus } from '../../common/enums/index.js';
import { User } from '../../users/models/user.model.js';
import { DonationRequest } from '../../requests/models/request.model.js';
import { PickupTask } from '../../pickups/models/pickup-task.model.js';
export class Donation {
}
_ts_decorate([
    Field(()=>ID),
    _ts_metadata("design:type", String)
], Donation.prototype, "id", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], Donation.prototype, "donorId", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], Donation.prototype, "foodName", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], Donation.prototype, "description", void 0);
_ts_decorate([
    Field(()=>FoodCategory),
    _ts_metadata("design:type", typeof FoodCategory === "undefined" ? Object : FoodCategory)
], Donation.prototype, "category", void 0);
_ts_decorate([
    Field(()=>Float),
    _ts_metadata("design:type", Number)
], Donation.prototype, "quantity", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], Donation.prototype, "unit", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], Donation.prototype, "pickupLocation", void 0);
_ts_decorate([
    Field(()=>String),
    _ts_metadata("design:type", String)
], Donation.prototype, "pickupAvailableTime", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Donation.prototype, "pickupDeadline", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Donation.prototype, "expiryDeadline", void 0);
_ts_decorate([
    Field(()=>DonationStatus),
    _ts_metadata("design:type", typeof DonationStatus === "undefined" ? Object : DonationStatus)
], Donation.prototype, "status", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Donation.prototype, "storageNotes", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Donation.prototype, "imageUrl", void 0);
_ts_decorate([
    Field(()=>User, {
        nullable: true
    }),
    _ts_metadata("design:type", typeof User === "undefined" ? Object : User)
], Donation.prototype, "donor", void 0);
_ts_decorate([
    Field(()=>[
            DonationRequest
        ], {
        nullable: 'itemsAndList'
    }),
    _ts_metadata("design:type", Array)
], Donation.prototype, "requests", void 0);
_ts_decorate([
    Field(()=>[
            PickupTask
        ], {
        nullable: 'itemsAndList'
    }),
    _ts_metadata("design:type", Array)
], Donation.prototype, "pickupTasks", void 0);
_ts_decorate([
    Field(()=>DonationRequest, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Donation.prototype, "currentRequest", void 0);
_ts_decorate([
    Field(()=>PickupTask, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], Donation.prototype, "currentTask", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Donation.prototype, "createdAt", void 0);
_ts_decorate([
    Field(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], Donation.prototype, "updatedAt", void 0);
Donation = _ts_decorate([
    ObjectType('Donation')
], Donation);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb25hdGlvbnMvbW9kZWxzL2RvbmF0aW9uLm1vZGVsLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9iamVjdFR5cGUsIEZpZWxkLCBJRCwgRmxvYXQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBGb29kQ2F0ZWdvcnksIERvbmF0aW9uU3RhdHVzIH0gZnJvbSAnLi4vLi4vY29tbW9uL2VudW1zL2luZGV4LmpzJztcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3VzZXJzL21vZGVscy91c2VyLm1vZGVsLmpzJztcclxuaW1wb3J0IHsgRG9uYXRpb25SZXF1ZXN0IH0gZnJvbSAnLi4vLi4vcmVxdWVzdHMvbW9kZWxzL3JlcXVlc3QubW9kZWwuanMnO1xyXG5pbXBvcnQgeyBQaWNrdXBUYXNrIH0gZnJvbSAnLi4vLi4vcGlja3Vwcy9tb2RlbHMvcGlja3VwLXRhc2subW9kZWwuanMnO1xyXG5cclxuQE9iamVjdFR5cGUoJ0RvbmF0aW9uJylcclxuZXhwb3J0IGNsYXNzIERvbmF0aW9uIHtcclxuICBARmllbGQoKCkgPT4gSUQpXHJcbiAgaWQhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgZG9ub3JJZCE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZylcclxuICBmb29kTmFtZSE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZylcclxuICBkZXNjcmlwdGlvbiE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IEZvb2RDYXRlZ29yeSlcclxuICBjYXRlZ29yeSE6IEZvb2RDYXRlZ29yeTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IEZsb2F0KVxyXG4gIHF1YW50aXR5ITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nKVxyXG4gIHVuaXQhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgcGlja3VwTG9jYXRpb24hOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgcGlja3VwQXZhaWxhYmxlVGltZSE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUpXHJcbiAgcGlja3VwRGVhZGxpbmUhOiBEYXRlO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGF0ZSlcclxuICBleHBpcnlEZWFkbGluZSE6IERhdGU7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBEb25hdGlvblN0YXR1cylcclxuICBzdGF0dXMhOiBEb25hdGlvblN0YXR1cztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIHN0b3JhZ2VOb3Rlcz86IHN0cmluZyB8IG51bGw7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBpbWFnZVVybD86IHN0cmluZyB8IG51bGw7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBVc2VyLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgZG9ub3I/OiBVc2VyO1xyXG5cclxuICBARmllbGQoKCkgPT4gW0RvbmF0aW9uUmVxdWVzdF0sIHsgbnVsbGFibGU6ICdpdGVtc0FuZExpc3QnIH0pXHJcbiAgcmVxdWVzdHM/OiBEb25hdGlvblJlcXVlc3RbXTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IFtQaWNrdXBUYXNrXSwgeyBudWxsYWJsZTogJ2l0ZW1zQW5kTGlzdCcgfSlcclxuICBwaWNrdXBUYXNrcz86IFBpY2t1cFRhc2tbXTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERvbmF0aW9uUmVxdWVzdCwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIGN1cnJlbnRSZXF1ZXN0PzogRG9uYXRpb25SZXF1ZXN0IHwgbnVsbDtcclxuXHJcbiAgQEZpZWxkKCgpID0+IFBpY2t1cFRhc2ssIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBjdXJyZW50VGFzaz86IFBpY2t1cFRhc2sgfCBudWxsO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGF0ZSlcclxuICBjcmVhdGVkQXQhOiBEYXRlO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGF0ZSlcclxuICB1cGRhdGVkQXQhOiBEYXRlO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJPYmplY3RUeXBlIiwiRmllbGQiLCJJRCIsIkZsb2F0IiwiRm9vZENhdGVnb3J5IiwiRG9uYXRpb25TdGF0dXMiLCJVc2VyIiwiRG9uYXRpb25SZXF1ZXN0IiwiUGlja3VwVGFzayIsIkRvbmF0aW9uIiwiU3RyaW5nIiwiRGF0ZSIsIm51bGxhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxVQUFVLEVBQUVDLEtBQUssRUFBRUMsRUFBRSxFQUFFQyxLQUFLLFFBQVEsa0JBQWtCO0FBQy9ELFNBQVNDLFlBQVksRUFBRUMsY0FBYyxRQUFRLDhCQUE4QjtBQUMzRSxTQUFTQyxJQUFJLFFBQVEsbUNBQW1DO0FBQ3hELFNBQVNDLGVBQWUsUUFBUSx5Q0FBeUM7QUFDekUsU0FBU0MsVUFBVSxRQUFRLDRDQUE0QztBQUd2RSxPQUFPLE1BQU1DO0FBK0RiOztjQTlEZVA7Ozs7Y0FHQVE7Ozs7Y0FHQUE7Ozs7Y0FHQUE7Ozs7Y0FHQU47Ozs7Y0FHQUQ7Ozs7Y0FHQU87Ozs7Y0FHQUE7Ozs7Y0FHQUE7Ozs7Y0FHQUM7Ozs7Y0FHQUE7Ozs7Y0FHQU47Ozs7Y0FHQUs7UUFBVUUsVUFBVTs7Ozs7Y0FHcEJGO1FBQVVFLFVBQVU7Ozs7O2NBR3BCTjtRQUFRTSxVQUFVOzs7OztjQUdsQjtZQUFDTDtTQUFnQjtRQUFJSyxVQUFVOzs7OztjQUcvQjtZQUFDSjtTQUFXO1FBQUlJLFVBQVU7Ozs7O2NBRzFCTDtRQUFtQkssVUFBVTs7Ozs7Y0FHN0JKO1FBQWNJLFVBQVU7Ozs7O2NBR3hCRDs7OztjQUdBQSJ9