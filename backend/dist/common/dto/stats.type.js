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
import { ObjectType, Field, Int } from '@nestjs/graphql';
export class DonorStats {
}
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], DonorStats.prototype, "totalDonations", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], DonorStats.prototype, "activeDonations", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], DonorStats.prototype, "completedDonations", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], DonorStats.prototype, "pendingRequests", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], DonorStats.prototype, "totalMealsSaved", void 0);
DonorStats = _ts_decorate([
    ObjectType('DonorStats')
], DonorStats);
export class VolunteerStats {
}
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], VolunteerStats.prototype, "availableTasks", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], VolunteerStats.prototype, "activeTasks", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], VolunteerStats.prototype, "completedPickups", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], VolunteerStats.prototype, "todayTasks", void 0);
VolunteerStats = _ts_decorate([
    ObjectType('VolunteerStats')
], VolunteerStats);
export class ReceiverStats {
}
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], ReceiverStats.prototype, "availableFood", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], ReceiverStats.prototype, "pendingRequests", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], ReceiverStats.prototype, "activeDeliveries", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], ReceiverStats.prototype, "completedRequests", void 0);
ReceiverStats = _ts_decorate([
    ObjectType('ReceiverStats')
], ReceiverStats);
export class PlatformStats {
}
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], PlatformStats.prototype, "totalDonations", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], PlatformStats.prototype, "totalMealsRescued", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], PlatformStats.prototype, "activeVolunteers", void 0);
_ts_decorate([
    Field(()=>Int),
    _ts_metadata("design:type", Number)
], PlatformStats.prototype, "communityPartners", void 0);
PlatformStats = _ts_decorate([
    ObjectType('PlatformStats')
], PlatformStats);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tb24vZHRvL3N0YXRzLnR5cGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JqZWN0VHlwZSwgRmllbGQsIEludCB9IGZyb20gJ0BuZXN0anMvZ3JhcGhxbCc7XHJcblxyXG5AT2JqZWN0VHlwZSgnRG9ub3JTdGF0cycpXHJcbmV4cG9ydCBjbGFzcyBEb25vclN0YXRzIHtcclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIHRvdGFsRG9uYXRpb25zITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIGFjdGl2ZURvbmF0aW9ucyE6IG51bWJlcjtcclxuXHJcbiAgQEZpZWxkKCgpID0+IEludClcclxuICBjb21wbGV0ZWREb25hdGlvbnMhOiBudW1iZXI7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBJbnQpXHJcbiAgcGVuZGluZ1JlcXVlc3RzITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIHRvdGFsTWVhbHNTYXZlZCE6IG51bWJlcjtcclxufVxyXG5cclxuQE9iamVjdFR5cGUoJ1ZvbHVudGVlclN0YXRzJylcclxuZXhwb3J0IGNsYXNzIFZvbHVudGVlclN0YXRzIHtcclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIGF2YWlsYWJsZVRhc2tzITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIGFjdGl2ZVRhc2tzITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIGNvbXBsZXRlZFBpY2t1cHMhOiBudW1iZXI7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBJbnQpXHJcbiAgdG9kYXlUYXNrcyE6IG51bWJlcjtcclxufVxyXG5cclxuQE9iamVjdFR5cGUoJ1JlY2VpdmVyU3RhdHMnKVxyXG5leHBvcnQgY2xhc3MgUmVjZWl2ZXJTdGF0cyB7XHJcbiAgQEZpZWxkKCgpID0+IEludClcclxuICBhdmFpbGFibGVGb29kITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIHBlbmRpbmdSZXF1ZXN0cyE6IG51bWJlcjtcclxuXHJcbiAgQEZpZWxkKCgpID0+IEludClcclxuICBhY3RpdmVEZWxpdmVyaWVzITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIGNvbXBsZXRlZFJlcXVlc3RzITogbnVtYmVyO1xyXG59XHJcblxyXG5AT2JqZWN0VHlwZSgnUGxhdGZvcm1TdGF0cycpXHJcbmV4cG9ydCBjbGFzcyBQbGF0Zm9ybVN0YXRzIHtcclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIHRvdGFsRG9uYXRpb25zITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIHRvdGFsTWVhbHNSZXNjdWVkITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gSW50KVxyXG4gIGFjdGl2ZVZvbHVudGVlcnMhOiBudW1iZXI7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBJbnQpXHJcbiAgY29tbXVuaXR5UGFydG5lcnMhOiBudW1iZXI7XHJcbn1cclxuIl0sIm5hbWVzIjpbIk9iamVjdFR5cGUiLCJGaWVsZCIsIkludCIsIkRvbm9yU3RhdHMiLCJWb2x1bnRlZXJTdGF0cyIsIlJlY2VpdmVyU3RhdHMiLCJQbGF0Zm9ybVN0YXRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxVQUFVLEVBQUVDLEtBQUssRUFBRUMsR0FBRyxRQUFRLGtCQUFrQjtBQUd6RCxPQUFPLE1BQU1DO0FBZWI7O2NBZGVEOzs7O2NBR0FBOzs7O2NBR0FBOzs7O2NBR0FBOzs7O2NBR0FBOzs7Ozs7QUFLZixPQUFPLE1BQU1FO0FBWWI7O2NBWGVGOzs7O2NBR0FBOzs7O2NBR0FBOzs7O2NBR0FBOzs7Ozs7QUFLZixPQUFPLE1BQU1HO0FBWWI7O2NBWGVIOzs7O2NBR0FBOzs7O2NBR0FBOzs7O2NBR0FBOzs7Ozs7QUFLZixPQUFPLE1BQU1JO0FBWWI7O2NBWGVKOzs7O2NBR0FBOzs7O2NBR0FBOzs7O2NBR0FBIn0=