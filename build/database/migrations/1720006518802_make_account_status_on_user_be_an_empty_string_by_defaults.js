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
        this.schema.raw(`ALTER TABLE ` +
            this.tableName +
            ` MODIFY account_status VARCHAR(255) DEFAULT '';
`);
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => { });
    }
}
exports.default = default_1;
//# sourceMappingURL=1720006518802_make_account_status_on_user_be_an_empty_string_by_defaults.js.map