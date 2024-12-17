import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../src/Application/use-cases/users/users.service';
import { CreateUserDto } from '../src/Application/use-cases/users/dto/create-user.dto';
import { UpdateUserDto } from '../src/Application/use-cases/users/dto/update-user.dto';
import { UsersController } from 'src/Controller/users.controller';

const mockUsersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call create with correct arguments', async () => {
    const createUserDto: CreateUserDto = {
      user_id: '1',
      username: 'testuser',
      password: 'password',
    };
    const result = { ...createUserDto };
    mockUsersService.create.mockResolvedValue(result);

    expect(await controller.create(createUserDto)).toEqual(result);
    expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should return all users', async () => {
    const users = [{ user_id: '1', username: 'user1' }];
    mockUsersService.findAll.mockResolvedValue(users);

    expect(await controller.findAll()).toEqual(users);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should return a user by ID', async () => {
    const user = { user_id: '1', username: 'testuser' };
    mockUsersService.findOne.mockResolvedValue(user);

    expect(await controller.findOne('1')).toEqual(user);
    expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a user by ID', async () => {
    const updateUserDto: UpdateUserDto = { userName: 'updatedUser', password: 'updatedPassword' };
    const updatedUser = { user_id: '1', ...updateUserDto };
    mockUsersService.update.mockResolvedValue(updatedUser);

    expect(await controller.update('1', updateUserDto)).toEqual(updatedUser);
    expect(mockUsersService.update).toHaveBeenCalledWith('1', updateUserDto);
  });

  it('should delete a user by ID', async () => {
    const result = { message: 'User deleted' };
    mockUsersService.remove.mockResolvedValue(result);

    expect(await controller.remove('1')).toEqual(result);
    expect(mockUsersService.remove).toHaveBeenCalledWith('1');
  });
});