import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IDbContext } from 'src/Application/common/interfaces/db-context.interface';
import { IException } from 'src/Application/common/interfaces/exceptions.interface';
import { User } from 'src/Domain/entities/user.entity';
export declare class UsersService {
    private readonly dbContext;
    private readonly exception;
    constructor(dbContext: IDbContext, exception: IException);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(user_id: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(user_id: string): Promise<{
        message: string;
    }>;
}
