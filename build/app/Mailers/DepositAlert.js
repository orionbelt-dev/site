"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Mail");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class DepositAlert extends Mail_1.BaseMailer {
    constructor(user, amount, coin, address, date) {
        super();
        this.user = user;
        this.amount = amount;
        this.coin = coin;
        this.address = address;
        this.date = date;
    }
    prepare(message) {
        message
            .subject("User made deposit")
            .from(Env_1.default.get("SMTP_USERNAME"))
            .to(Env_1.default.get("SMTP_USERNAME"))
            .htmlView("emails/deposit", {
            email: this.user.email,
            amount: this.amount,
            name: this.user.fullName,
            coin: this.coin,
            address: this.address,
            date: this.date,
        });
    }
}
exports.default = DepositAlert;
//# sourceMappingURL=DepositAlert.js.map