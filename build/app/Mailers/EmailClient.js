"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = global[Symbol.for('ioc.use')]("Adonis/Addons/Mail");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class EmailClient extends Mail_1.BaseMailer {
    constructor(email, subject, body) {
        super();
        this.email = email;
        this.subject = subject;
        this.body = body;
    }
    prepare(message) {
        message
            .subject(this.subject)
            .from(Env_1.default.get("SMTP_USERNAME"))
            .to(this.email)
            .htmlView("emails/clientmail", {
            subject: this.subject,
            body: this.body
                .split("\r\n")
                .map((text) => {
                if (text == "") {
                    return `<br>`;
                }
                else {
                    return `<p>${text}</p>`;
                }
            })
                .join(""),
        });
    }
}
exports.default = EmailClient;
//# sourceMappingURL=EmailClient.js.map