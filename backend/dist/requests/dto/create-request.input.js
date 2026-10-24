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
import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreateRequestInput {
}
_ts_decorate([
    Field(()=>ID),
    IsNotEmpty(),
    _ts_metadata("design:type", String)
], CreateRequestInput.prototype, "donationId", void 0);
_ts_decorate([
    Field(()=>String),
    IsNotEmpty(),
    IsString(),
    _ts_metadata("design:type", String)
], CreateRequestInput.prototype, "deliveryAddress", void 0);
_ts_decorate([
    Field(()=>String, {
        nullable: true
    }),
    IsOptional(),
    IsString(),
    _ts_metadata("design:type", String)
], CreateRequestInput.prototype, "notes", void 0);
CreateRequestInput = _ts_decorate([
    InputType()
], CreateRequestInput);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXF1ZXN0cy9kdG8vY3JlYXRlLXJlcXVlc3QuaW5wdXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5wdXRUeXBlLCBGaWVsZCwgSUQgfSBmcm9tICdAbmVzdGpzL2dyYXBocWwnO1xyXG5pbXBvcnQgeyBJc05vdEVtcHR5LCBJc1N0cmluZywgSXNPcHRpb25hbCB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XHJcblxyXG5ASW5wdXRUeXBlKClcclxuZXhwb3J0IGNsYXNzIENyZWF0ZVJlcXVlc3RJbnB1dCB7XHJcbiAgQEZpZWxkKCgpID0+IElEKVxyXG4gIEBJc05vdEVtcHR5KClcclxuICBkb25hdGlvbklkITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nKVxyXG4gIEBJc05vdEVtcHR5KClcclxuICBASXNTdHJpbmcoKVxyXG4gIGRlbGl2ZXJ5QWRkcmVzcyE6IHN0cmluZztcclxuXHJcbiAgQEZpZWxkKCgpID0+IFN0cmluZywgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIEBJc09wdGlvbmFsKClcclxuICBASXNTdHJpbmcoKVxyXG4gIG5vdGVzPzogc3RyaW5nO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJJbnB1dFR5cGUiLCJGaWVsZCIsIklEIiwiSXNOb3RFbXB0eSIsIklzU3RyaW5nIiwiSXNPcHRpb25hbCIsIkNyZWF0ZVJlcXVlc3RJbnB1dCIsIlN0cmluZyIsIm51bGxhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxTQUFTLEVBQUVDLEtBQUssRUFBRUMsRUFBRSxRQUFRLGtCQUFrQjtBQUN2RCxTQUFTQyxVQUFVLEVBQUVDLFFBQVEsRUFBRUMsVUFBVSxRQUFRLGtCQUFrQjtBQUduRSxPQUFPLE1BQU1DO0FBY2I7O2NBYmVKOzs7OztjQUlBSzs7Ozs7O2NBS0FBO1FBQVVDLFVBQVUifQ==