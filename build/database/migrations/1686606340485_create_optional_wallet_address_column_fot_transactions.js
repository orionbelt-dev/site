"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = "transactions";
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string("wallet_address").nullable();
        });
    }
    async down() { }
}
exports.default = default_1;
//# sourceMappingURL=1686606340485_create_optional_wallet_address_column_fot_transactions.js.map