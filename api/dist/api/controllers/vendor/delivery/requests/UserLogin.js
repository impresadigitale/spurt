"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLogin = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class UserLogin {
}
tslib_1.__decorate([
    class_validator_1.MaxLength(45, {
        message: 'User Name is maximum 45 character',
    }),
    class_validator_1.IsNotEmpty({
        message: 'User Name is required',
    }),
    tslib_1.__metadata("design:type", String)
], UserLogin.prototype, "userName", void 0);
tslib_1.__decorate([
    class_validator_1.MaxLength(30, {
        message: 'Password is maximum 30 character',
    }),
    class_validator_1.IsNotEmpty({
        message: 'Password is required',
    }),
    tslib_1.__metadata("design:type", String)
], UserLogin.prototype, "password", void 0);
exports.UserLogin = UserLogin;
//# sourceMappingURL=UserLogin.js.map