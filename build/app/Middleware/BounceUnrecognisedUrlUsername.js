"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BounceUnrecognisedUrlUsername {
    async handle({ response, auth, params }, next) {
        if (auth.isLoggedIn &&
            params.username.split("-").join(" ") !== auth.user?.userName) {
            await auth.logout();
            return response.status(302).redirect().toRoute("login.show");
        }
        await next();
    }
}
exports.default = BounceUnrecognisedUrlUsername;
//# sourceMappingURL=BounceUnrecognisedUrlUsername.js.map