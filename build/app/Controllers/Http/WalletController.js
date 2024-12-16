"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Wallet_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Wallet"));
class WalletController {
    async show({ auth, view }) {
        const wallets = await Wallet_1.default.query();
        let newWallets = [];
        wallets.map((v) => newWallets.push(v.toJSON()));
        return view.render("admin/wallets", {
            ...auth.user?.toJSON(),
            wallets: newWallets,
        });
    }
    async create({ auth, request, response, session, }) {
        try {
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    wallet_name: Validator_1.schema.string([Validator_1.rules.trim()]),
                    wallet_address: Validator_1.schema.string([Validator_1.rules.trim()]),
                }),
                messages: {
                    "wallet_address.required": "The Wallet address field is required.",
                    "wallet_name.required": "The Wallet name field is required.",
                },
            });
            await Wallet_1.default.create({
                walletAddress: payload.wallet_address,
                walletName: payload.wallet_name,
            });
            session.flash("form.success", "Wallet created successfully");
            return response.redirect().toRoute("wallets.show");
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
    async delete({ auth, request, response, params, session, }) {
        try {
            const id = params.id;
            await Wallet_1.default.query().where("id", parseInt(id)).delete();
            session.flash("form.success", "Wallet delete successfull");
            return response.redirect().toRoute("wallets.show");
        }
        catch (error) {
            session.flash("form.error", "Internal Server Error");
            console.log(error);
            response.redirect().back();
        }
    }
}
exports.default = WalletController;
//# sourceMappingURL=WalletController.js.map