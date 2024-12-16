"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
Route_1.default.on("/dashboard").redirect("login.show");
Route_1.default.group(() => {
    Route_1.default.get("/login", "AuthController.loginShow")
        .as("login.show")
        .middleware(["bounce-login-page"]);
    Route_1.default.get("/signup", "AuthController.signupShow").as("signup.show");
    Route_1.default.get("/logout", "AuthController.logout").as("logout");
    Route_1.default.post("/login", "AuthController.login").as("login");
    Route_1.default.post("/signup", "AuthController.signup").as("signup");
    Route_1.default.get("/forgot-password", "ForgotPasswordsController.forgotPasswordShow").as("forgot-password.show");
    Route_1.default.post("/forgot-password", "ForgotPasswordsController.forgotPassword").as("forgot-password");
    Route_1.default.get("/forgot-password/reset-link/verify-with-code", "ForgotPasswordsController.confirmLink").as("confirm-password-reset-link");
}).prefix("auth");
Route_1.default.group(() => {
    Route_1.default.get("/", "AdminController.users");
    Route_1.default.get("/list-users", "AdminController.users").as("users.list");
    Route_1.default.get("/wallets", "WalletController.show").as("wallets.show");
    Route_1.default.get("/add-topup", "AdminController.addTopupShow").as("addTopUp.show");
    Route_1.default.get("/reduce-topup", "AdminController.reduceTopupShow").as("reduceTopUp.show");
    Route_1.default.get("/users-deposit", "AdminController.usersDepositShow").as("usersDeposit.show");
    Route_1.default.get("/users-withdraws", "AdminController.usersWithdrawsShow").as("usersWithdraws.show");
    Route_1.default.post("/user/configure", "AdminController.configureUser").as("user.configure");
    Route_1.default.post("/user/topup/add", "AdminController.addTopUp").as("topup.add");
    Route_1.default.post("/user/topup/reduce", "AdminController.reduceTopUp").as("topup.reduce");
    Route_1.default.get("/user/withdraw/:id/approve", "AdminController.approveWithdrawal");
    Route_1.default.get("/wallets/:id/delete", "WalletController.delete").as("wallets.delete");
    Route_1.default.get("/user/:id/delete", "AdminController.deleteUser").as("user.delete");
    Route_1.default.get("/users-get-all.json", async () => {
        const users = await User_1.default.query();
        let newUsers = [];
        users.map((user) => newUsers.push(user.toJSON()));
        return users;
    });
    Route_1.default.get("/send-mail", "AdminController.sendMailShow");
    Route_1.default.post("/send-mail", "AdminController.sendMail").as("send.mail");
    Route_1.default.post("/wallets", "WalletController.create").as("wallets.create");
})
    .prefix("admin")
    .middleware("admin");
Route_1.default.group(() => {
    Route_1.default.get("/", "TradeCenterController").as("trade-center");
    Route_1.default.get("/deposit", "DepositController.show").as("deposit.show");
    Route_1.default.get("/withdraw", "WithdrawController.show").as("withdraw.show");
    Route_1.default.get("/profile", "ProfileController.show").as("profile.show");
    Route_1.default.get("/change-password", "ProfileController.changePasswordShow").as("change-password.show");
    Route_1.default.get("/wallets", async () => {
        const wallets = await Database_1.default.rawQuery("select wallet_name as coin from wallets");
        return wallets[0];
    });
    Route_1.default.post("/change-password", "ProfileController.changePassword").as("change-password");
    Route_1.default.post("/withdraw", "WithdrawController.withdraw").as("withdraw");
    Route_1.default.post("/withdraw/by/address", "WithdrawController.withdrawByAddress").as("withdraw-address");
    Route_1.default.post("/deposit", "DepositController.deposit").as("deposit");
})
    .prefix(":username")
    .middleware("auth")
    .middleware("bounce-unrecognised-url-username");
//# sourceMappingURL=routes.js.map