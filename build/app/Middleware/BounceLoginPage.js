"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BounceLoginPage {
    async handle({ auth, response, request }, next) {
        if (await auth.check()) {
            if (auth.user?.password === "supersuperadmin") {
                return response.redirect().toPath("/admin/");
            }
            else {
                return response
                    .redirect()
                    .toRoute("trade-center", { username: auth.user?.userName });
            }
        }
        await next();
    }
}
exports.default = BounceLoginPage;
//# sourceMappingURL=BounceLoginPage.js.map