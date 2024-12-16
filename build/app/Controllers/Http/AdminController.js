"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const EmailClient_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Mailers/EmailClient"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AdminController {
    async users({ auth, view }) {
        const users = await User_1.default.query();
        let newUsers = [];
        users.map((user) => newUsers.push(user.toJSON()));
        return view.render("admin/users", {
            ...auth.user?.toJSON(),
            users: newUsers,
        });
    }
    isEmpty(val) {
        if (val === "" || val === undefined)
            return true;
        return false;
    }
    async addTopUp({ request, response, session }) {
        try {
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    user_id: Validator_1.schema.number.optional([
                        Validator_1.rules.requiredIfExistsAny([
                            "profit",
                            "balance",
                            "total_deposit",
                            "total_withdraws",
                            "total_bonus",
                            "total_referral_bonus",
                        ]),
                    ]),
                    profit: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    balance: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    total_deposit: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    total_withdraws: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    total_bonus: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    total_referral_bonus: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                }),
                messages: {
                    requiredIfExistsAny: "The {{field}} is required.",
                },
            });
            if (payload.user_id) {
                let user = await User_1.default.findBy("id", payload.user_id);
                let newUser = user?.toJSON();
                console.log(newUser);
                await user
                    ?.merge({
                    profit: this.isEmpty(payload.profit)
                        ? parseInt(newUser?.profit.replace(/,/g, ""))
                        : parseInt(newUser?.profit.replace(/,/g, "")) + payload.profit,
                    balance: this.isEmpty(payload.balance)
                        ? parseInt(newUser?.balance.replace(/,/g, ""))
                        : parseInt(newUser?.balance.replace(/,/g, "")) + payload.balance,
                    totalDeposit: this.isEmpty(payload.total_deposit)
                        ? parseInt(newUser?.total_deposit.replace(/,/g, ""))
                        : parseInt(newUser?.total_deposit.replace(/,/g, "")) +
                            payload.total_deposit,
                    totalWithdraws: this.isEmpty(payload.total_withdraws)
                        ? parseInt(newUser?.total_withdraws.replace(/,/g, ""))
                        : parseInt(newUser?.total_withdraws.replace(/,/g, "")) +
                            payload.total_withdraws,
                    totalBonus: this.isEmpty(payload.total_bonus)
                        ? parseInt(newUser?.total_bonus.replace(/,/g, ""))
                        : parseInt(newUser?.total_bonus.replace(/,/g, "")) +
                            payload.total_bonus,
                    totalReferralBonus: this.isEmpty(payload.total_referral_bonus)
                        ? parseInt(newUser?.total_referral_bonus.replace(/,/g, ""))
                        : parseInt(newUser?.total_referral_bonus.replace(/,/g, "")) +
                            payload.total_referral_bonus,
                })
                    .save();
                session.flash("form.success", "User topup added");
                return response.redirect().toRoute("addTopUp.show");
            }
            session.flashAll();
            session.flash("form.error", "Can not add user topup with empty fields.");
            return response.redirect().toRoute("addTopUp.show");
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
    async reduceTopUp({ request, response, session, }) {
        try {
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    user_id: Validator_1.schema.number.optional([
                        Validator_1.rules.requiredIfExistsAny([
                            "profit",
                            "balance",
                            "total_deposit",
                            "total_withdraws",
                            "total_bonus",
                            "total_referral_bonus",
                        ]),
                    ]),
                    profit: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    balance: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    total_deposit: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    total_withdraws: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    total_bonus: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    total_referral_bonus: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                }),
                messages: {
                    requiredIfExistsAny: "The {{field}} is required.",
                },
            });
            if (payload.user_id) {
                let user = await User_1.default.findBy("id", payload.user_id);
                let newUser = user?.toJSON();
                console.log(newUser);
                await user
                    ?.merge({
                    profit: this.isEmpty(payload.profit)
                        ? parseInt(newUser?.profit.replace(/,/g, ""))
                        : parseInt(newUser?.profit.replace(/,/g, "")) - payload.profit,
                    balance: this.isEmpty(payload.balance)
                        ? parseInt(newUser?.balance.replace(/,/g, ""))
                        : parseInt(newUser?.balance.replace(/,/g, "")) - payload.balance,
                    totalDeposit: this.isEmpty(payload.total_deposit)
                        ? parseInt(newUser?.total_deposit.replace(/,/g, ""))
                        : parseInt(newUser?.total_deposit.replace(/,/g, "")) -
                            payload.total_deposit,
                    totalWithdraws: this.isEmpty(payload.total_withdraws)
                        ? parseInt(newUser?.total_withdraws.replace(/,/g, ""))
                        : parseInt(newUser?.total_withdraws.replace(/,/g, "")) -
                            payload.total_withdraws,
                    totalBonus: this.isEmpty(payload.total_bonus)
                        ? parseInt(newUser?.total_bonus.replace(/,/g, ""))
                        : parseInt(newUser?.total_bonus.replace(/,/g, "")) -
                            payload.total_bonus,
                    totalReferralBonus: this.isEmpty(payload.total_referral_bonus)
                        ? parseInt(newUser?.total_referral_bonus.replace(/,/g, ""))
                        : parseInt(newUser?.total_referral_bonus.replace(/,/g, "")) -
                            payload.total_referral_bonus,
                })
                    .save();
                session.flash("form.success", "User topup reduced");
                return response.redirect().toRoute("reduceTopUp.show");
            }
            session.flashAll();
            session.flash("form.error", "Can not reduce user topup with empty fields.");
            return response.redirect().toRoute("reduceTopUp.show");
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
    async configureUser({ request, response, session, }) {
        try {
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    user_id: Validator_1.schema.number.optional([
                        Validator_1.rules.requiredIfExistsAny([
                            "trade_duration",
                            "profit_positivity",
                            "profit_percentage",
                            "verification_status",
                        ]),
                    ]),
                    trade_duration: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    profit_positivity: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    profit_percentage: Validator_1.schema.number.optional([Validator_1.rules.trim()]),
                    verification_status: Validator_1.schema.string.optional([Validator_1.rules.trim()]),
                }),
                messages: {
                    requiredIfExistsAny: "The {{field}} is required.",
                },
            });
            if (payload.user_id) {
                let user = await User_1.default.findBy("id", payload.user_id);
                let newUser = user?.toJSON();
                await user
                    ?.merge({
                    tradeDuration: this.isEmpty(payload.trade_duration)
                        ? newUser?.tradeDuration
                        : payload.trade_duration,
                    profitPositivity: this.isEmpty(payload.profit_positivity)
                        ? newUser?.profitPositivity
                        : payload.profit_positivity,
                    profitPercentage: this.isEmpty(payload.profit_percentage)
                        ? newUser?.profitPercentage
                        : payload.profit_percentage,
                    isVerified: true,
                    account_status: this.isEmpty(payload.verification_status)
                        ? newUser?.accountStatus
                        : payload.verification_status,
                })
                    .save();
                session.flash("form.success", "User configured");
                return response.redirect().toRoute("users.list");
            }
            session.flashAll();
            session.flash("form.error", "Can not configure users with empty fields.");
            return response.redirect().toRoute("users.list");
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
    async deleteUser({ response, params, session }) {
        try {
            const id = params.id;
            await User_1.default.query().where("id", parseInt(id)).delete();
            session.flash("form.success", "User delete successfull");
            return response.redirect().toRoute("users.list");
        }
        catch (error) {
            session.flash("form.error", "Internal Server Error");
            console.log(error);
            response.redirect().back();
        }
    }
    async addTopupShow({ view, auth }) {
        return view.render("admin/topup/add", { ...auth.user?.toJSON() });
    }
    async reduceTopupShow({ view, auth }) {
        return view.render("admin/topup/reduce", { ...auth.user?.toJSON() });
    }
    async usersDepositShow({ view, auth }) {
        const transactions = await Database_1.default.from("transactions").select("*");
        return view.render("admin/deposits", {
            ...auth.user?.toJSON(),
            transactions,
        });
    }
    async usersWithdrawsShow({ view, auth }) {
        const transactions = await Database_1.default.from("transactions").select("*");
        return await view.render("admin/withdraws", {
            ...auth.user?.toJSON(),
            transactions,
        });
    }
    async approveWithdrawal({ session, params, response, }) {
        try {
            await Database_1.default.rawQuery("update transactions set status = ? where id = ?", [true, params.id]);
            session.flash("form.success", "Withdrawal approved");
            return response.redirect().toRoute("usersWithdraws.show");
        }
        catch (error) {
            session.flash("form.error", "Internal Server Error");
            console.log(error);
            response.redirect().back();
        }
    }
    async sendMailShow({ auth, view }) {
        const users = await User_1.default.query();
        let newUsers = [];
        users.map((user) => newUsers.push(user.toJSON()));
        return view.render("admin/send_email", {
            ...auth.user?.toJSON(),
            users: newUsers,
        });
    }
    async sendMail({ request, response, session }) {
        try {
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    user_id: Validator_1.schema.number([Validator_1.rules.trim()]),
                    subject: Validator_1.schema.string([Validator_1.rules.trim()]),
                    body: Validator_1.schema.string([Validator_1.rules.trim()]),
                }),
                messages: {
                    required: "The {{field}} is required.",
                    "user_id.required": "Please select a user.",
                },
            });
            let user = await User_1.default.find(payload.user_id);
            await new EmailClient_1.default(user.email, payload.subject, payload.body).send();
            session.flash("form.success", "Email Sent");
            return response.redirect().toPath("/admin/send-mail");
        }
        catch (error) {
            session.flashAll();
            if (error.messages) {
                session.flash("form.error", Object.values(error.messages)[0][0]);
            }
            else {
                session.flash("form.error", error.message);
            }
            console.log(error);
            response.redirect().back();
        }
    }
}
exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map