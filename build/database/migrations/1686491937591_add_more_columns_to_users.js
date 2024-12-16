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
            table.integer("total_deposit").unsigned().defaultTo(0);
            table.integer("total_withdraws").unsigned().defaultTo(0);
            table.integer("total_bonus").unsigned().defaultTo(0);
            table.integer("total_referral_bonus").unsigned().defaultTo(0);
        });
    }
    async down() { }
}
exports.default = default_1;
//# sourceMappingURL=1686491937591_add_more_columns_to_users.js.map