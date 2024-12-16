"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TradeCenterController {
    async handle({ view, auth }) {
        await auth.user?.load("transactions");
        return view.render("[user_name]/trade_center", { ...auth.user?.toJSON() });
    }
}
exports.default = TradeCenterController;
//# sourceMappingURL=TradeCenterController.js.map