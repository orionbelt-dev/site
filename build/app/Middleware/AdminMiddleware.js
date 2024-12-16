"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminMiddleware {
    async handle({ auth, response }, next) {
        await auth.check();
        if (auth.user?.password !== "supersuperadmin") {
            return response.redirect().toPath("/auth/login");
        }
        await next();
    }
}
exports.default = AdminMiddleware;
//# sourceMappingURL=AdminMiddleware.js.map