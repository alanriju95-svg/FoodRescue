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
import { InputType, Field, Float } from '@nestjs/graphql';
import { IsOptional, IsEnum, IsNumber, Min, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FoodCategory, DonationStatus } from '../../common/enums/index.js';
export class UpdateDonationInput {
}
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateDonationInput.prototype, "foodName", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateDonationInput.prototype, "description", void 0);
_ts_decorate([
    Field(()=>FoodCategory, {
        nullable: true
    }),
    IsOptional(),
    IsEnum(FoodCategory),
    _ts_metadata("design:type", typeof FoodCategory === "undefined" ? Object : FoodCategory)
], UpdateDonationInput.prototype, "category", void 0);
_ts_decorate([
    Field(()=>Float, {
        nullable: true
    }),
    IsOptional(),
    IsNumber(),
    Min(0.1),
    _ts_metadata("design:type", Number)
], UpdateDonationInput.prototype, "quantity", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateDonationInput.prototype, "unit", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateDonationInput.prototype, "pickupLocation", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateDonationInput.prototype, "pickupAvailableTime", void 0);
_ts_decorate([
    Field(()=>Date, {
        nullable: true
    }),
    IsOptional(),
    Type(()=>Date),
    IsDate(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UpdateDonationInput.prototype, "pickupDeadline", void 0);
_ts_decorate([
    Field(()=>Date, {
        nullable: true
    }),
    IsOptional(),
    Type(()=>Date),
    IsDate(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], UpdateDonationInput.prototype, "expiryDeadline", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateDonationInput.prototype, "storageNotes", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateDonationInput.prototype, "imageUrl", void 0);
_ts_decorate([
    Field(()=>DonationStatus, {
        nullable: true
    }),
    IsOptional(),
    IsEnum(DonationStatus),
    _ts_metadata("design:type", typeof DonationStatus === "undefined" ? Object : DonationStatus)
], UpdateDonationInput.prototype, "status", void 0);
UpdateDonationInput = _ts_decorate([
    InputType()
], UpdateDonationInput);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb25hdGlvbnMvZHRvL3VwZGF0ZS1kb25hdGlvbi5pbnB1dC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dFR5cGUsIEZpZWxkLCBGbG9hdCB9IGZyb20gJ0BuZXN0anMvZ3JhcGhxbCc7XHJcbmltcG9ydCB7IElzT3B0aW9uYWwsIElzRW51bSwgSXNOdW1iZXIsIE1pbiwgSXNEYXRlLCBJc1N0cmluZyB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XHJcbmltcG9ydCB7IFR5cGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XHJcbmltcG9ydCB7IEZvb2RDYXRlZ29yeSwgRG9uYXRpb25TdGF0dXMgfSBmcm9tICcuLi8uLi9jb21tb24vZW51bXMvaW5kZXguanMnO1xyXG5cclxuQElucHV0VHlwZSgpXHJcbmV4cG9ydCBjbGFzcyBVcGRhdGVEb25hdGlvbklucHV0IHtcclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc1N0cmluZygpXHJcbiAgZm9vZE5hbWU/OiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASXNPcHRpb25hbCgpXHJcbiAgQElzU3RyaW5nKClcclxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IEZvb2RDYXRlZ29yeSwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNFbnVtKEZvb2RDYXRlZ29yeSlcclxuICBjYXRlZ29yeT86IEZvb2RDYXRlZ29yeTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IEZsb2F0LCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc051bWJlcigpXHJcbiAgQE1pbigwLjEpXHJcbiAgcXVhbnRpdHk/OiBudW1iZXI7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASXNPcHRpb25hbCgpXHJcbiAgQElzU3RyaW5nKClcclxuICB1bml0Pzogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc1N0cmluZygpXHJcbiAgcGlja3VwTG9jYXRpb24/OiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASXNPcHRpb25hbCgpXHJcbiAgQElzU3RyaW5nKClcclxuICBwaWNrdXBBdmFpbGFibGVUaW1lPzogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGF0ZSwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIEBJc09wdGlvbmFsKClcclxuICBAVHlwZSgoKSA9PiBEYXRlKVxyXG4gIEBJc0RhdGUoKVxyXG4gIHBpY2t1cERlYWRsaW5lPzogRGF0ZTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IERhdGUsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASXNPcHRpb25hbCgpXHJcbiAgQFR5cGUoKCkgPT4gRGF0ZSlcclxuICBASXNEYXRlKClcclxuICBleHBpcnlEZWFkbGluZT86IERhdGU7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASXNPcHRpb25hbCgpXHJcbiAgQElzU3RyaW5nKClcclxuICBzdG9yYWdlTm90ZXM/OiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASXNPcHRpb25hbCgpXHJcbiAgQElzU3RyaW5nKClcclxuICBpbWFnZVVybD86IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IERvbmF0aW9uU3RhdHVzLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc0VudW0oRG9uYXRpb25TdGF0dXMpXHJcbiAgc3RhdHVzPzogRG9uYXRpb25TdGF0dXM7XHJcbn1cclxuIl0sIm5hbWVzIjpbIklucHV0VHlwZSIsIkZpZWxkIiwiRmxvYXQiLCJJc09wdGlvbmFsIiwiSXNFbnVtIiwiSXNOdW1iZXIiLCJNaW4iLCJJc0RhdGUiLCJJc1N0cmluZyIsIlR5cGUiLCJGb29kQ2F0ZWdvcnkiLCJEb25hdGlvblN0YXR1cyIsIlVwZGF0ZURvbmF0aW9uSW5wdXQiLCJTdHJpbmciLCJudWxsYWJsZSIsIkRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFNBQVMsRUFBRUMsS0FBSyxFQUFFQyxLQUFLLFFBQVEsa0JBQWtCO0FBQzFELFNBQVNDLFVBQVUsRUFBRUMsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLEdBQUcsRUFBRUMsTUFBTSxFQUFFQyxRQUFRLFFBQVEsa0JBQWtCO0FBQ3RGLFNBQVNDLElBQUksUUFBUSxvQkFBb0I7QUFDekMsU0FBU0MsWUFBWSxFQUFFQyxjQUFjLFFBQVEsOEJBQThCO0FBRzNFLE9BQU8sTUFBTUM7QUErRGI7O2NBOURlQztRQUFVQyxVQUFVOzs7Ozs7O2NBS3BCRDtRQUFVQyxVQUFVOzs7Ozs7O2NBS3BCSjtRQUFnQkksVUFBVTs7Ozs7OztjQUsxQlo7UUFBU1ksVUFBVTs7Ozs7Ozs7Y0FNbkJEO1FBQVVDLFVBQVU7Ozs7Ozs7Y0FLcEJEO1FBQVVDLFVBQVU7Ozs7Ozs7Y0FLcEJEO1FBQVVDLFVBQVU7Ozs7Ozs7Y0FLcEJDO1FBQVFELFVBQVU7OzthQUVuQkM7Ozs7O2NBSUNBO1FBQVFELFVBQVU7OzthQUVuQkM7Ozs7O2NBSUNGO1FBQVVDLFVBQVU7Ozs7Ozs7Y0FLcEJEO1FBQVVDLFVBQVU7Ozs7Ozs7Y0FLcEJIO1FBQWtCRyxVQUFVIn0=