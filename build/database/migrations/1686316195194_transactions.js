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
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary();
            table
                .integer("user_id")
                .unsigned()
                .references("id")
                .inTable("users")
                .onDelete("CASCADE");
            table.integer("amount").unsigned().notNullable();
            table.enu("transaction_type", ["DEPOSIT", "WITHDRAWAL"]).notNullable();
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1686316195194_transactions.js.map