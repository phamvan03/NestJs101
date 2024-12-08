"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const dynamoose_1 = require("dynamoose");
exports.UserSchema = new dynamoose_1.Schema({
    user_id: {
        type: String,
        hashKey: true,
    },
    username: {
        type: String,
        index: {
            name: 'UsernameIndex',
            project: ['user_id', 'username'],
        },
    },
    password: {
        type: String,
    },
    created_at: {
        type: Number,
    },
    updated_at: {
        type: Number,
    },
    deleted_at: {
        type: Number,
    },
});
//# sourceMappingURL=user.schema.js.map