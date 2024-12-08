import { UsersService } from '../Application/use-cases/users/users.service';
import { CreateUserDto } from '../Application/use-cases/users/dto/create-user.dto';
import { UpdateUserDto } from '../Application/use-cases/users/dto/update-user.dto';
import { User } from 'src/Domain/entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
