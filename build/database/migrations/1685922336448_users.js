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
        this.schema.createTable(this.tableName, (table) => {
            table.increments("id").primary();
            table.string("full_name").notNullable().unique();
            table.boolean("is_verified").defaultTo(false);
            table.string("email", 255).notNullable().unique();
            table.string("user_name").notNullable().unique();
            table.string("country").notNullable();
            table.string("password", 180).notNullable();
            table.string("remember_me_token").nullable();
            table.integer("profit").unsigned().defaultTo(0);
            table.integer("balance").unsigned().defaultTo(0);
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1685922336448_users.js.map