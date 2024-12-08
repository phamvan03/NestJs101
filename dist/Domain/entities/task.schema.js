"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = void 0;
const dynamoose_1 = require("dynamoose");
exports.TaskSchema = new dynamoose_1.Schema({
    task_id: {
        type: String,
        rangeKey: true,
    },
    user_id: {
        type: String,
        hashKey: true,
    },
    task_name: {
        type: String,
    },
    task_description: {
        type: String,
    },
    status: {
        type: Number,
        index: {
            name: 'status_index',
            type: 'local',
            project: ['user_id', 'task_id', 'task_name', 'status'],
        },
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
//# sourceMappingURL=task.schema.js.map