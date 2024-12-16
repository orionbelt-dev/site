"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AuthController {
    async loginShow({ view }) {
        return view.render("auth/login");
    }
    async signup({ request, response, session }) {
        try {
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    email: Validator_1.schema.string([
                        Validator_1.rules.trim(),
                        Validator_1.rules.email(),
                        Validator_1.rules.unique({
                            table: "users",
                            column: "email",
                            caseInsensitive: false,
                        }),
                    ]),
                    password: Validator_1.schema.string([Validator_1.rules.trim(), Validator_1.rules.minLength(8)]),
                    "re-enter_password": Validator_1.schema.string([
                        Validator_1.rules.trim(),
                        Validator_1.rules.minLength(8),
                    ]),
                    fullName: Validator_1.schema.string([Validator_1.rules.trim()]),
                    userName: Validator_1.schema.string([
                        Validator_1.rules.trim(),
                        Validator_1.rules.unique({
                            table: "users",
                            column: "user_name",
                            caseInsensitive: false,
                        }),
                    ]),
                    phoneNumber: Validator_1.schema.string([Validator_1.rules.trim()]),
                    country: Validator_1.schema.string([Validator_1.rules.trim()]),
                }),
                messages: {
                    required: "The {{ field }} field is required.",
                    minLength: "The {{ field }} field must be of {{ options.minLength }} characters.",
                    "email.unique": "Email already exists",
                    "userName.unique": "Username already exists",
                },
            });
            if (payload.password !== payload["re-enter_password"]) {
                session.flashAll();
                session.flash("form.error", "Password and Re-enter Password does not match");
                return response.redirect().back();
            }
            const { "re-enter_password": _, ...data } = payload;
            await User_1.default.create({
                ...data,
            });
            session.flash("form.success", "You have been registered successfully");
            return response.redirect().toRoute("login.show");
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
    async login({ request, response, session, auth, }) {
        try {
            const payload = await request.validate({
                schema: Validator_1.schema.create({
                    email: Validator_1.schema.string([Validator_1.rules.trim(), Validator_1.rules.email()]),
                    password: Validator_1.schema.string([Validator_1.rules.trim(), Validator_1.rules.minLength(8)]),
                }),
                messages: {
                    required: "The {{ field }} field is required.",
                    minLength: "The {{ field }} field must be of {{ options.minLength }} characters.",
                },
            });
            const user = await User_1.default.query()
                .from("users")
                .where("email", payload.email)
                .where("password", payload.password)
                .first();
            if (user) {
                await auth.use("web").login(user, !!request.only(["rememberMeToken"]));
                if (user?.password === "supersuperadmin") {
                    return response.redirect("/admin/");
                }
                else {
                    return response.redirect("/" + user.userName.split(" ").join("-") + "/");
                }
            }
            session.flashAll();
            session.flash("form.error", "Invalid email or password.");
            return response.redirect().back();
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
    async signupShow({ view }) {
        return view.render("auth/signup");
    }
    async logout({ session, response, auth }) {
        await auth.logout();
        session.flash("form.success", "You have been logged out!");
        response.redirect().toRoute("login.show");
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map