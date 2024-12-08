"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("../Application/use-cases/task/task.service");
const create_task_dto_1 = require("../Application/use-cases/task/dto/create-task.dto");
const update_task_dto_1 = require("../Application/use-cases/task/dto/update-task.dto");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    create(createTaskDto) {
        return this.taskService.create(createTaskDto);
    }
    findAll() {
        return this.taskService.findAll();
    }
    findOne(user_id) {
        return this.taskService.findByUserId(user_id);
    }
    findByStatus(user_id, status) {
        return this.taskService.findByStatus(user_id, status);
    }
    async update(user_id, task_id, updateTaskDto) {
        return this.taskService.update(user_id, task_id, updateTaskDto);
    }
    async underlineTask(user_id, task_id) {
        return this.taskService.underlineTask(user_id, task_id);
    }
    async remove(user_id, task_id) {
        return this.taskService.remove(user_id, task_id);
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/findByUserId'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/findByStatus'),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], TaskController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.Patch)(':user_id/:task_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Param)('task_id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('/underline'),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Query)('task_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "underlineTask", null);
__decorate([
    (0, common_1.Delete)(':user_id/:task_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __param(1, (0, common_1.Param)('task_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "remove", null);
exports.TaskController = TaskController = __decorate([
    (0, common_1.Controller)('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
//# sourceMappingURL=task.controller.js.map