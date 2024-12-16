"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Mail");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class ForgotPasswordLinkEmail extends Mail_1.BaseMailer {
    constructor(user) {
        super();
        this.user = user;
    }
    async prepare(message) {
        const resetCode = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        await this.user
            .merge({
            forgotPasswordToken: resetCode,
        })
            .save();
        message
            .subject("Password Reset Request")
            .from("Admin " + "<" + Env_1.default.get("SMTP_USERNAME") + ">")
            .to(this.user.email)
            .htmlView("emails/clientmail", {
            subject: "Password Reset Request",
            body: `Dear ${this.user.fullName},

We received a request to reset the password for your account. To proceed with the password reset process, please click on the following link:

<a href="https://orion-belt.space/auth/forgot-password/reset-link/verify-with-code/?code=${resetCode}">Reset Link</a>

If you did not request a password reset or are unsure why you received this email, please disregard it. Your account security is important to us, and we recommend contacting our support team if you have any concerns.`
                .split("\n")
                .map((text) => {
                if (text == "") {
                    return ``;
                }
                else {
                    return `<p>${text}</p>`;
                }
            })
                .join(""),
        });
    }
}
exports.default = ForgotPasswordLinkEmail;
//# sourceMappingURL=ForgotPasswordLinkEmail.js.map