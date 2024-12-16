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
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
class Transaction extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Transaction.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize(value) {
            return new Intl.NumberFormat("en-us").format(value);
        },
    }),
    __metadata("design:type", Number)
], Transaction.prototype, "amount", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Transaction.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Transaction.prototype, "walletAddress", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Transaction.prototype, "walletType", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Transaction.prototype, "phrase", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize(value) {
            return Boolean(value);
        },
    }),
    __metadata("design:type", Boolean)
], Transaction.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Transaction.prototype, "transactionType", void 0);
__decorate([
    Orm_1.column.dateTime({
        autoCreate: true,
        serialize(value) {
            return new Date(value).toLocaleString();
        },
    }),
    __metadata("design:type", luxon_1.DateTime)
], Transaction.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Transaction.prototype, "updatedAt", void 0);
exports.default = Transaction;
//# sourceMappingURL=Transaction.js.map