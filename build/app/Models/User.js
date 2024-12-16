"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Transaction_1 = __importDefault(require("./Transaction"));
class User extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize(value) {
            return Boolean(value);
        },
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "accountStatus", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], User.prototype, "forgotPasswordToken", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "country", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], User.prototype, "rememberMeToken", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize(value) {
            return new Intl.NumberFormat("en-us").format(value);
        },
    }),
    __metadata("design:type", Number)
], User.prototype, "profit", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize(value) {
            return new Intl.NumberFormat("en-us").format(value);
        },
    }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize(value) {
            return new Intl.NumberFormat("en-us").format(value);
        },
    }),
    __metadata("design:type", Number)
], User.prototype, "totalDeposit", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize(value) {
            return new Intl.NumberFormat("en-us").format(value);
        },
    }),
    __metadata("design:type", Number)
], User.prototype, "totalWithdraws", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize(value) {
            return new Intl.NumberFormat("en-us").format(value);
        },
    }),
    __metadata("design:type", Number)
], User.prototype, "totalBonus", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize(value) {
            return new Intl.NumberFormat("en-us").format(value);
        },
    }),
    __metadata("design:type", Number)
], User.prototype, "totalReferralBonus", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], User.prototype, "tradeDuration", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], User.prototype, "profitPositivity", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], User.prototype, "profitPercentage", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "validThruDay", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], User.prototype, "validThruMonth", void 0);
__decorate([
    Orm_1.column.dateTime({
        autoCreate: true,
        serialize(value) {
            return new Date(value).toLocaleString();
        },
    }),
    __metadata("design:type", luxon_1.DateTime)
], User.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => Transaction_1.default),
    __metadata("design:type", Object)
], User.prototype, "transactions", void 0);
exports.default = User;
//# sourceMappingURL=User.js.map