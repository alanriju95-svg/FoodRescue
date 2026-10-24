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
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../common/enums/index.js';
export class RegisterInput {
}
_ts_decorate([
    Field(()=>String),
    IsEmail(),
    _ts_metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
_ts_decorate([
    Field(()=>String),
    MinLength(6),
    _ts_metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
_ts_decorate([
    Field(()=>String),
    IsNotEmpty(),
    _ts_metadata("design:type", String)
], RegisterInput.prototype, "name", void 0);
_ts_decorate([
    Field(()=>UserRole),
    IsEnum(UserRole),
    _ts_metadata("design:type", typeof UserRole === "undefined" ? Object : UserRole)
], RegisterInput.prototype, "role", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    _ts_metadata("design:type", String)
], RegisterInput.prototype, "phone", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    _ts_metadata("design:type", String)
], RegisterInput.prototype, "organization", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    _ts_metadata("design:type", String)
], RegisterInput.prototype, "address", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    _ts_metadata("design:type", String)
], RegisterInput.prototype, "city", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    _ts_metadata("design:type", String)
], RegisterInput.prototype, "vehicleType", void 0);
RegisterInput = _ts_decorate([
    InputType()
], RegisterInput);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2R0by9yZWdpc3Rlci5pbnB1dC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dFR5cGUsIEZpZWxkIH0gZnJvbSAnQG5lc3Rqcy9ncmFwaHFsJztcclxuaW1wb3J0IHsgSXNFbWFpbCwgSXNOb3RFbXB0eSwgTWluTGVuZ3RoLCBJc0VudW0sIElzT3B0aW9uYWwgfSBmcm9tICdjbGFzcy12YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBVc2VyUm9sZSB9IGZyb20gJy4uLy4uL2NvbW1vbi9lbnVtcy9pbmRleC5qcyc7XHJcblxyXG5ASW5wdXRUeXBlKClcclxuZXhwb3J0IGNsYXNzIFJlZ2lzdGVySW5wdXQge1xyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgQElzRW1haWwoKVxyXG4gIGVtYWlsITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nKVxyXG4gIEBNaW5MZW5ndGgoNilcclxuICBwYXNzd29yZCE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZylcclxuICBASXNOb3RFbXB0eSgpXHJcbiAgbmFtZSE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFVzZXJSb2xlKVxyXG4gIEBJc0VudW0oVXNlclJvbGUpXHJcbiAgcm9sZSE6IFVzZXJSb2xlO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIHBob25lPzogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIG9yZ2FuaXphdGlvbj86IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIEBJc09wdGlvbmFsKClcclxuICBhZGRyZXNzPzogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIGNpdHk/OiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASXNPcHRpb25hbCgpXHJcbiAgdmVoaWNsZVR5cGU/OiBzdHJpbmc7XHJcbn1cclxuIl0sIm5hbWVzIjpbIklucHV0VHlwZSIsIkZpZWxkIiwiSXNFbWFpbCIsIklzTm90RW1wdHkiLCJNaW5MZW5ndGgiLCJJc0VudW0iLCJJc09wdGlvbmFsIiwiVXNlclJvbGUiLCJSZWdpc3RlcklucHV0IiwiU3RyaW5nIiwibnVsbGFibGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFNBQVMsRUFBRUMsS0FBSyxRQUFRLGtCQUFrQjtBQUNuRCxTQUFTQyxPQUFPLEVBQUVDLFVBQVUsRUFBRUMsU0FBUyxFQUFFQyxNQUFNLEVBQUVDLFVBQVUsUUFBUSxrQkFBa0I7QUFDckYsU0FBU0MsUUFBUSxRQUFRLDhCQUE4QjtBQUd2RCxPQUFPLE1BQU1DO0FBb0NiOztjQW5DZUM7Ozs7O2NBSUFBOzs7OztjQUlBQTs7Ozs7Y0FJQUY7Ozs7O2NBSUFFO1FBQVVDLFVBQVU7Ozs7OztjQUlwQkQ7UUFBVUMsVUFBVTs7Ozs7O2NBSXBCRDtRQUFVQyxVQUFVOzs7Ozs7Y0FJcEJEO1FBQVVDLFVBQVU7Ozs7OztjQUlwQkQ7UUFBVUMsVUFBVSJ9