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
import { IsNotEmpty, IsEnum, IsNumber, Min, IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FoodCategory } from '../../common/enums/index.js';
export class CreateDonationInput {
}
_ts_decorate([
    Field(()=>String),
    IsNotEmpty(),
    IsString(),
    _ts_metadata("design:type", String)
], CreateDonationInput.prototype, "foodName", void 0);
_ts_decorate([
    Field(()=>String),
    IsNotEmpty(),
    IsString(),
    _ts_metadata("design:type", String)
], CreateDonationInput.prototype, "description", void 0);
_ts_decorate([
    Field(()=>FoodCategory),
    IsEnum(FoodCategory),
    _ts_metadata("design:type", typeof FoodCategory === "undefined" ? Object : FoodCategory)
], CreateDonationInput.prototype, "category", void 0);
_ts_decorate([
    Field(()=>Float),
    IsNumber(),
    Min(0.1),
    _ts_metadata("design:type", Number)
], CreateDonationInput.prototype, "quantity", void 0);
_ts_decorate([
    Field(()=>String),
    IsNotEmpty(),
    IsString(),
    _ts_metadata("design:type", String)
], CreateDonationInput.prototype, "unit", void 0);
_ts_decorate([
    Field(()=>String),
    IsNotEmpty(),
    IsString(),
    _ts_metadata("design:type", String)
], CreateDonationInput.prototype, "pickupLocation", void 0);
_ts_decorate([
    Field(()=>String),
    IsNotEmpty(),
    IsString(),
    _ts_metadata("design:type", String)
], CreateDonationInput.prototype, "pickupAvailableTime", void 0);
_ts_decorate([
    Field(()=>Date),
    Type(()=>Date),
    IsDate(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateDonationInput.prototype, "pickupDeadline", void 0);
_ts_decorate([
    Field(()=>Date),
    Type(()=>Date),
    IsDate(),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], CreateDonationInput.prototype, "expiryDeadline", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], CreateDonationInput.prototype, "storageNotes", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], CreateDonationInput.prototype, "imageUrl", void 0);
CreateDonationInput = _ts_decorate([
    InputType()
], CreateDonationInput);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb25hdGlvbnMvZHRvL2NyZWF0ZS1kb25hdGlvbi5pbnB1dC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dFR5cGUsIEZpZWxkLCBGbG9hdCB9IGZyb20gJ0BuZXN0anMvZ3JhcGhxbCc7XHJcbmltcG9ydCB7IElzTm90RW1wdHksIElzRW51bSwgSXNOdW1iZXIsIE1pbiwgSXNEYXRlLCBJc09wdGlvbmFsLCBJc1N0cmluZyB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XHJcbmltcG9ydCB7IFR5cGUgfSBmcm9tICdjbGFzcy10cmFuc2Zvcm1lcic7XHJcbmltcG9ydCB7IEZvb2RDYXRlZ29yeSB9IGZyb20gJy4uLy4uL2NvbW1vbi9lbnVtcy9pbmRleC5qcyc7XHJcblxyXG5ASW5wdXRUeXBlKClcclxuZXhwb3J0IGNsYXNzIENyZWF0ZURvbmF0aW9uSW5wdXQge1xyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgQElzTm90RW1wdHkoKVxyXG4gIEBJc1N0cmluZygpXHJcbiAgZm9vZE5hbWUhOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgQElzTm90RW1wdHkoKVxyXG4gIEBJc1N0cmluZygpXHJcbiAgZGVzY3JpcHRpb24hOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBGb29kQ2F0ZWdvcnkpXHJcbiAgQElzRW51bShGb29kQ2F0ZWdvcnkpXHJcbiAgY2F0ZWdvcnkhOiBGb29kQ2F0ZWdvcnk7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBGbG9hdClcclxuICBASXNOdW1iZXIoKVxyXG4gIEBNaW4oMC4xKVxyXG4gIHF1YW50aXR5ITogbnVtYmVyO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nKVxyXG4gIEBJc05vdEVtcHR5KClcclxuICBASXNTdHJpbmcoKVxyXG4gIHVuaXQhOiBzdHJpbmc7IC8vIG1lYWxzLCBrZywgYm94ZXMsIHBvcnRpb25zXHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgQElzTm90RW1wdHkoKVxyXG4gIEBJc1N0cmluZygpXHJcbiAgcGlja3VwTG9jYXRpb24hOiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgQElzTm90RW1wdHkoKVxyXG4gIEBJc1N0cmluZygpXHJcbiAgcGlja3VwQXZhaWxhYmxlVGltZSE6IHN0cmluZzsgLy8gZS5nLiBcIjEwOjAwIEFNIC0gMjowMCBQTVwiXHJcblxyXG4gIEBGaWVsZCgoKSA9PiBEYXRlKVxyXG4gIEBUeXBlKCgpID0+IERhdGUpXHJcbiAgQElzRGF0ZSgpXHJcbiAgcGlja3VwRGVhZGxpbmUhOiBEYXRlO1xyXG5cclxuICBARmllbGQoKCkgPT4gRGF0ZSlcclxuICBAVHlwZSgoKSA9PiBEYXRlKVxyXG4gIEBJc0RhdGUoKVxyXG4gIGV4cGlyeURlYWRsaW5lITogRGF0ZTtcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNTdHJpbmcoKVxyXG4gIHN0b3JhZ2VOb3Rlcz86IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNTdHJpbmcoKVxyXG4gIGltYWdlVXJsPzogc3RyaW5nO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJJbnB1dFR5cGUiLCJGaWVsZCIsIkZsb2F0IiwiSXNOb3RFbXB0eSIsIklzRW51bSIsIklzTnVtYmVyIiwiTWluIiwiSXNEYXRlIiwiSXNPcHRpb25hbCIsIklzU3RyaW5nIiwiVHlwZSIsIkZvb2RDYXRlZ29yeSIsIkNyZWF0ZURvbmF0aW9uSW5wdXQiLCJTdHJpbmciLCJEYXRlIiwibnVsbGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFNBQVMsRUFBRUMsS0FBSyxFQUFFQyxLQUFLLFFBQVEsa0JBQWtCO0FBQzFELFNBQVNDLFVBQVUsRUFBRUMsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLEdBQUcsRUFBRUMsTUFBTSxFQUFFQyxVQUFVLEVBQUVDLFFBQVEsUUFBUSxrQkFBa0I7QUFDbEcsU0FBU0MsSUFBSSxRQUFRLG9CQUFvQjtBQUN6QyxTQUFTQyxZQUFZLFFBQVEsOEJBQThCO0FBRzNELE9BQU8sTUFBTUM7QUFzRGI7O2NBckRlQzs7Ozs7O2NBS0FBOzs7Ozs7Y0FLQUY7Ozs7O2NBSUFUOzs7Ozs7Y0FLQVc7Ozs7OztjQUtBQTs7Ozs7O2NBS0FBOzs7Ozs7Y0FLQUM7YUFDREE7Ozs7O2NBSUNBO2FBQ0RBOzs7OztjQUlDRDtRQUFVRSxVQUFVOzs7Ozs7O2NBS3BCRjtRQUFVRSxVQUFVIn0=