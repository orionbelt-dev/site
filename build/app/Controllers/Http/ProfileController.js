"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class ProfileController {
    async show({ view, auth }) {
        return view.render("[user_name]/profile", { ...auth.user?.toJSON() });
    }
    async changePasswordShow({ view, auth }) {
        return view.render("[user_name]/change_password", {
            ...auth.user?.toJSON(),
        });
    }
    async changePassword({ auth, session, request, response, bouncer, }) {
        try {
            const canPerformNormalUserActions = await bouncer.allows("canPerformNormalUserActions");
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    "repeat-password": Validator_1.schema.string([Validator_1.rules.trim(), Validator_1.rules.minLength(8)]),
                    "new-password": Validator_1.schema.string([Validator_1.rules.trim(), Validator_1.rules.minLength(8)]),
                }),
                messages: {
                    required: "The {{ field }} field is required.",
                    minLength: "The {{ field }} field must be of {{ options.minLength }} characters.",
                },
            });
            if (canPerformNormalUserActions) {
                if (payload["new-password"] !== payload["repeat-password"]) {
                    session.flashAll();
                    session.flash("form.error", "New Password and Re-enter Password does not match");
                    return response.redirect().back();
                }
                let user = await User_1.default.updateOrCreate({}, { password: payload["new-password"] });
                if (user) {
                    await auth.use("web").login(user);
                    session.flash("form.success", "You have successfully changed your password.");
                    return response
                        .redirect()
                        .toRoute("change-password.show", { username: auth.user?.userName });
                }
            }
            session.flashAll();
            session.flash("form.error", "Action not allowed, you're not activated");
            return response
                .redirect()
                .toRoute("change-password.show", { username: auth.user?.userName });
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
exports.default = ProfileController;
//# sourceMappingURL=ProfileController.js.map