"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
let UsersService = class UsersService {
    constructor(dbContext, exception) {
        this.dbContext = dbContext;
        this.exception = exception;
    }
    async create(createUserDto) {
        try {
            const existUser = await this.dbContext.user
                .query('username')
                .eq(createUserDto.username)
                .using('UsernameIndex')
                .exec();
            if (existUser.count > 0) {
                this.exception.badRequestException({
                    message: 'User already exists',
                    errorCode: 409,
                });
            }
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
            createUserDto.password = hashedPassword;
            const newUser = {
                user_id: createUserDto.user_id,
                username: createUserDto.username,
                password: hashedPassword,
                created_at: new Date().getTime(),
                updated_at: new Date().getTime(),
            };
            await this.dbContext.user.create(newUser);
            return newUser;
        }
        catch (error) {
            console.error('Eror Create user:', error);
            throw error;
        }
    }
    async findAll() {
        try {
            const users = await this.dbContext.user.scan().exec();
            if (!users || users.count === 0) {
                this.exception.notFoundException({
                    message: 'No users found',
                    errorCode: 404,
                });
            }
            return users;
        }
        catch (error) {
            console.error('Error users:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const user = await this.dbContext.user.get(id);
            if (!user) {
                this.exception.notFoundException({
                    message: `User with ID ${id} not found`,
                    errorCode: 404,
                });
            }
            return user;
        }
        catch (error) {
            console.error(`Error ${id}:`, error);
            throw error;
        }
    }
    async update(user_id, updateUserDto) {
        try {
            const existingUser = await this.dbContext.user.query('user_id')
                .eq(user_id)
                .exec();
            if (!existingUser) {
                this.exception.notFoundException({
                    message: `User with ID ${user_id} not found`,
                    errorCode: 404,
                });
            }
            const updatedUser = await this.dbContext.user.update({ user_id }, { ...updateUserDto });
            return updatedUser;
        }
        catch (error) {
            console.error(`Error updating ID ${user_id}:`, error);
            throw error;
        }
    }
    async remove(user_id) {
        try {
            const existingUser = await this.dbContext.user.get({ user_id: user_id });
            if (!existingUser) {
                this.exception.notFoundException({
                    message: `User with ID ${user_id} not found`,
                    errorCode: 404,
                });
            }
            await this.dbContext.user.delete(user_id);
            return { message: `User with ID ${user_id} has been deleted` };
        }
        catch (error) {
            console.error(`Error deleting ID ${user_id}:`, error);
            throw error;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IDbContext')),
    __param(1, (0, common_1.Inject)('IException')),
    __metadata("design:paramtypes", [Object, Object])
], UsersService);
//# sourceMappingURL=users.service.js.map