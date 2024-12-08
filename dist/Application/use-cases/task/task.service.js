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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
let TaskService = class TaskService {
    constructor(dbContext, exception) {
        this.dbContext = dbContext;
        this.exception = exception;
    }
    async create(createTaskDto) {
        try {
            const newTask = {
                user_id: createTaskDto.user_id,
                task_id: createTaskDto.task_id,
                task_name: createTaskDto.task_name,
                task_description: createTaskDto.task_description,
                status: createTaskDto.status,
                created_at: new Date().getTime(),
            };
            await this.dbContext.task.create(newTask);
            return newTask;
        }
        catch (error) {
            console.error('Eror Create user:', error);
            throw error;
        }
    }
    findAll() {
        return this.dbContext.task.scan().exec();
    }
    findByUserId(user_id) {
        const user = this.dbContext.task.query("user_id").eq(user_id).exec();
        if (!user) {
            this.exception.notFoundException({
                message: `Tasks with UserID ${user_id} not found`,
                errorCode: 404,
            });
        }
        return user;
    }
    async findByStatus(user_id, status) {
        const id = String(user_id);
        const s = Number(status);
        const existingTask = await this.dbContext.task.query('user_id')
            .eq(id)
            .where('status')
            .eq(s)
            .using('status_index')
            .exec();
        console.log(existingTask, s, id);
        if (!existingTask || existingTask.length === 0) {
            this.exception.notFoundException({
                message: `Task not found`,
                errorCode: 404,
            });
        }
        return existingTask;
    }
    async update(user_id, task_id, updateTaskDto) {
        try {
            const existingTask = await this.dbContext.task.query('user_id')
                .eq(user_id)
                .and()
                .where('task_id')
                .eq(task_id)
                .exec();
            if (!existingTask || existingTask.length === 0) {
                this.exception.notFoundException({
                    message: `Task with ID ${task_id} for user with ID ${user_id} not found`,
                    errorCode: 404,
                });
            }
            const updatedUser = await this.dbContext.task.update({ user_id, task_id }, { ...updateTaskDto, updated_at: Date.now() });
            return updatedUser;
        }
        catch (error) {
            console.error(`Error updating ID ${user_id}:`, error);
            throw error;
        }
    }
    async underlineTask(user_id, task_id) {
        try {
            const existingTask = await this.dbContext.task.query('user_id')
                .eq(user_id)
                .and()
                .where('task_id')
                .eq(task_id)
                .exec();
            if (!existingTask || existingTask.length === 0) {
                this.exception.notFoundException({
                    message: `Task with ID ${task_id} for user with ID ${user_id} not found`,
                    errorCode: 404,
                });
            }
            existingTask[0].status = 2;
            const updatedUser = await this.dbContext.task.update({ user_id, task_id }, { status: 2 });
            return updatedUser;
        }
        catch (error) {
            console.error(`Error updating ID ${user_id}:`, error);
            throw error;
        }
    }
    async remove(user_id, task_id) {
        try {
            const existingTask = await this.dbContext.task.query('user_id')
                .eq(user_id)
                .and()
                .where('task_id')
                .eq(task_id)
                .exec();
            if (!existingTask || existingTask.length === 0) {
                this.exception.notFoundException({
                    message: `Task with ID ${task_id} for user with ID ${user_id} not found`,
                    errorCode: 404,
                });
            }
            await this.dbContext.task.delete({ user_id, task_id });
            return { message: `Task with ID ${task_id} has been deleted` };
        }
        catch (error) {
            console.error(`Error deleting ID ${task_id}:`, error);
            throw error;
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IDbContext')),
    __param(1, (0, common_1.Inject)('IException')),
    __metadata("design:paramtypes", [Object, Object])
], TaskService);
//# sourceMappingURL=task.service.js.map