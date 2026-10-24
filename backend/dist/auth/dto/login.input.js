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
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginInput {
}
_ts_decorate([
    Field(()=>String),
    IsEmail(),
    _ts_metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
_ts_decorate([
    Field(()=>String),
    IsNotEmpty(),
    _ts_metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = _ts_decorate([
    InputType()
], LoginInput);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hdXRoL2R0by9sb2dpbi5pbnB1dC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dFR5cGUsIEZpZWxkIH0gZnJvbSAnQG5lc3Rqcy9ncmFwaHFsJztcclxuaW1wb3J0IHsgSXNFbWFpbCwgSXNOb3RFbXB0eSB9IGZyb20gJ2NsYXNzLXZhbGlkYXRvcic7XHJcblxyXG5ASW5wdXRUeXBlKClcclxuZXhwb3J0IGNsYXNzIExvZ2luSW5wdXQge1xyXG4gIEBGaWVsZCgoKSA9PiBTdHJpbmcpXHJcbiAgQElzRW1haWwoKVxyXG4gIGVtYWlsITogc3RyaW5nO1xyXG5cclxuICBARmllbGQoKCkgPT4gU3RyaW5nKVxyXG4gIEBJc05vdEVtcHR5KClcclxuICBwYXNzd29yZCE6IHN0cmluZztcclxufVxyXG4iXSwibmFtZXMiOlsiSW5wdXRUeXBlIiwiRmllbGQiLCJJc0VtYWlsIiwiSXNOb3RFbXB0eSIsIkxvZ2luSW5wdXQiLCJTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLFNBQVMsRUFBRUMsS0FBSyxRQUFRLGtCQUFrQjtBQUNuRCxTQUFTQyxPQUFPLEVBQUVDLFVBQVUsUUFBUSxrQkFBa0I7QUFHdEQsT0FBTyxNQUFNQztBQVFiOztjQVBlQzs7Ozs7Y0FJQUEifQ==