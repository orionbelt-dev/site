"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const ForgotPasswordLinkEmail_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Mailers/ForgotPasswordLinkEmail"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class ForgotPasswordsController {
    async forgotPasswordShow({ view }) {
        return view.render("auth/forgot_password");
    }
    async forgotPassword({ request, response, session, }) {
        try {
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    email: Validator_1.schema.string([Validator_1.rules.trim(), Validator_1.rules.email()]),
                }),
            });
            const user = await User_1.default.query()
                .from("users")
                .where("email", payload.email)
                .first();
            if (!user) {
                session.flashAll();
                session.flash("form.error", "The email provided does not exist!");
                return response.redirect().back();
            }
            else {
                try {
                    await new ForgotPasswordLinkEmail_1.default(user).send();
                    session.flash("form.success", "Reset link sent.");
                    return response.redirect().toRoute("forgot-password.show");
                }
                catch (err) {
                    session.flashAll();
                    session.flash("form.error", "Unable to send reset link at this time.");
                    console.log(err);
                    response.redirect().back();
                }
            }
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
    async confirmLink({ request, response, session, auth, }) {
        try {
            const code = request.qs();
            if (code.hasOwnProperty("code") && code.code != null) {
                const user = await User_1.default.query()
                    .from("users")
                    .where("forgot_password_token", code.code)
                    .first();
                if (user) {
                    session.flashAll();
                    await auth.use("web").login(user, true);
                    await user
                        .merge({
                        forgotPasswordToken: null,
                    })
                        .save();
                    if (user.password === "supersuperadmin") {
                        return response.redirect("/admin/");
                    }
                    else {
                        return response.redirect("/" + user.userName + "/change-password");
                    }
                }
                else {
                    session.flashAll();
                    session.flash("form.error", "Invalid reset password link.");
                    return response.redirect().toRoute("forgot-password.show");
                }
            }
            else {
                session.flashAll();
                session.flash("form.error", "Invalid reset password link.");
                return response.redirect().toRoute("forgot-password.show");
            }
        }
        catch (error) {
            session.flashAll();
            session.flash("form.error", "Internal Server Error");
            console.log(error);
            return response.redirect().toRoute("forgot-password.show");
        }
    }
}
exports.default = ForgotPasswordsController;
//# sourceMappingURL=ForgotPasswordsController.js.map