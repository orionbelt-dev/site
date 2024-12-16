"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const DepositAlert_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Mailers/DepositAlert"));
const Transaction_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Transaction"));
const Wallet_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Wallet"));
class DepositController {
    async show({ view, auth }) {
        await auth.user?.load("transactions");
        const wallets = await Wallet_1.default.query();
        let newWallets = [];
        wallets.map((v) => newWallets.push(v.toJSON()));
        return view.render("[user_name]/deposit", {
            ...auth.user?.toJSON(),
            wallets: newWallets,
        });
    }
    async deposit({ auth, session, request, response, }) {
        try {
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    amount: Validator_1.schema.number([Validator_1.rules.trim()]),
                    coin_type: Validator_1.schema.string([Validator_1.rules.trim()]),
                    wallet_address: Validator_1.schema.string([Validator_1.rules.trim()]),
                }),
                messages: {
                    required: "The {{ field }} field is required.",
                    "coin_type.required": "Please select a wallet type.",
                    minLength: "The {{ field }} field must be of {{ options.minLength }} characters.",
                },
            });
            let tx = await Transaction_1.default.create({
                userId: auth.user?.id,
                status: false,
                walletAddress: payload.wallet_address,
                amount: payload.amount,
                transactionType: "deposit".toUpperCase(),
                walletType: payload.coin_type,
            });
            await new DepositAlert_1.default(auth.user, payload.amount, payload.coin_type, payload.wallet_address, tx.createdAt.toString()).send();
            session.flash("form.success", "Deposit request has been submitted");
            return response
                .redirect()
                .toRoute("deposit.show", { username: auth.user?.userName });
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
exports.default = DepositController;
//# sourceMappingURL=DepositController.js.map