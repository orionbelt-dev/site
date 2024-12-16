"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = "users";
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer("trade_duration").unsigned().defaultTo(0);
            table.integer("profit_positivity").unsigned().defaultTo(0);
            table.integer("profit_percentage").unsigned().defaultTo(0);
            table.string("valid_thru_day").defaultTo("08");
            table.string("valid_thru_month").defaultTo("08");
        });
    }
    async down() { }
}
exports.default = default_1;
//# sourceMappingURL=1686446724907_add_more_columns_to_users.js.map