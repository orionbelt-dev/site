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
        this.schema.raw("alter table `" + this.tableName + "` drop index `users_full_name_unique`");
    }
    async down() {
    }
}
exports.default = default_1;
//# sourceMappingURL=1686436428742_make_full_name_not_to_be_uniques.js.map