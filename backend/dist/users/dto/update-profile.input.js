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
import { IsOptional, IsString } from 'class-validator';
export class UpdateProfileInput {
}
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateProfileInput.prototype, "name", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateProfileInput.prototype, "phone", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateProfileInput.prototype, "organization", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateProfileInput.prototype, "address", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateProfileInput.prototype, "city", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateProfileInput.prototype, "bio", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], UpdateProfileInput.prototype, "vehicleType", void 0);
UpdateProfileInput = _ts_decorate([
    InputType()
], UpdateProfileInput);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91c2Vycy9kdG8vdXBkYXRlLXByb2ZpbGUuaW5wdXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXRUeXBlLCBGaWVsZCB9IGZyb20gJ0BuZXN0anMvZ3JhcGhxbCc7XHJcbmltcG9ydCB7IElzT3B0aW9uYWwsIElzU3RyaW5nIH0gZnJvbSAnY2xhc3MtdmFsaWRhdG9yJztcclxuXHJcbkBJbnB1dFR5cGUoKVxyXG5leHBvcnQgY2xhc3MgVXBkYXRlUHJvZmlsZUlucHV0IHtcclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc1N0cmluZygpXHJcbiAgbmFtZT86IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNTdHJpbmcoKVxyXG4gIHBob25lPzogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc1N0cmluZygpXHJcbiAgb3JnYW5pemF0aW9uPzogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nLCB7IG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgQElzT3B0aW9uYWwoKVxyXG4gIEBJc1N0cmluZygpXHJcbiAgYWRkcmVzcz86IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNTdHJpbmcoKVxyXG4gIGNpdHk/OiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASXNPcHRpb25hbCgpXHJcbiAgQElzU3RyaW5nKClcclxuICBiaW8/OiBzdHJpbmc7XHJcblxyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASXNPcHRpb25hbCgpXHJcbiAgQElzU3RyaW5nKClcclxuICB2ZWhpY2xlVHlwZT86IHN0cmluZztcclxufVxyXG4iXSwibmFtZXMiOlsiSW5wdXRUeXBlIiwiRmllbGQiLCJJc09wdGlvbmFsIiwiSXNTdHJpbmciLCJVcGRhdGVQcm9maWxlSW5wdXQiLCJTdHJpbmciLCJudWxsYWJsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsU0FBUyxFQUFFQyxLQUFLLFFBQVEsa0JBQWtCO0FBQ25ELFNBQVNDLFVBQVUsRUFBRUMsUUFBUSxRQUFRLGtCQUFrQjtBQUd2RCxPQUFPLE1BQU1DO0FBbUNiOztjQWxDZUM7UUFBVUMsVUFBVTs7Ozs7OztjQUtwQkQ7UUFBVUMsVUFBVTs7Ozs7OztjQUtwQkQ7UUFBVUMsVUFBVTs7Ozs7OztjQUtwQkQ7UUFBVUMsVUFBVTs7Ozs7OztjQUtwQkQ7UUFBVUMsVUFBVTs7Ozs7OztjQUtwQkQ7UUFBVUMsVUFBVTs7Ozs7OztjQUtwQkQ7UUFBVUMsVUFBVSJ9