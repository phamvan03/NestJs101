import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../src/Application/use-cases/task/task.service';
import { CreateTaskDto } from '../src/Application/use-cases/task/dto/create-task.dto';
import { UpdateTaskDto } from '../src/Application/use-cases/task/dto/update-task.dto';
import { TaskController } from 'src/Controller/task.controller';

const mockTaskService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findByUserId: jest.fn(),
  findByStatus: jest.fn(),
  update: jest.fn(),
  underlineTask: jest.fn(),
  remove: jest.fn(),
};

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a task', async () => {
    const createTaskDto: CreateTaskDto = {
      user_id: '1',
      task_id: '101',
      task_name: 'Task 1',
      task_description: 'Description 1',
      status: 1,
    };
    const result = { ...createTaskDto };
    mockTaskService.create.mockResolvedValue(result);

    expect(await controller.create(createTaskDto)).toEqual(result);
    expect(mockTaskService.create).toHaveBeenCalledWith(createTaskDto);
  });

  it('should return all tasks', async () => {
    const tasks = [{ task_id: '101', task_name: 'Task 1' }];
    mockTaskService.findAll.mockResolvedValue(tasks);

    expect(await controller.findAll()).toEqual(tasks);
    expect(mockTaskService.findAll).toHaveBeenCalled();
  });

  it('should find tasks by user ID', async () => {
    const tasks = [{ task_id: '101', task_name: 'Task 1' }];
    mockTaskService.findByUserId.mockResolvedValue(tasks);

    expect(await controller.findOne('1')).toEqual(tasks);
    expect(mockTaskService.findByUserId).toHaveBeenCalledWith('1');
  });

  it('should find tasks by status', async () => {
    const tasks = [{ task_id: '102', task_name: 'Task 2', status: 1 }];
    mockTaskService.findByStatus.mockResolvedValue(tasks);

    expect(await controller.findByStatus('1', 1)).toEqual(tasks);
    expect(mockTaskService.findByStatus).toHaveBeenCalledWith('1', 1);
  });

  it('should update a task', async () => {
    const updateTaskDto: UpdateTaskDto = { task_name: 'Updated Task', task_description: 'Updated Task Description', status: 1};
    const updatedTask = { task_id: '101', ...updateTaskDto };
    mockTaskService.update.mockResolvedValue(updatedTask);

    expect(await controller.update('1', '101', updateTaskDto)).toEqual(updatedTask);
    expect(mockTaskService.update).toHaveBeenCalledWith('1', '101', updateTaskDto);
  });

  it('should underline a task', async () => {
    const result = { message: 'Task underlined' };
    mockTaskService.underlineTask.mockResolvedValue(result);

    expect(await controller.underlineTask('1', '101')).toEqual(result);
    expect(mockTaskService.underlineTask).toHaveBeenCalledWith('1', '101');
  });

  it('should delete a task', async () => {
    const result = { message: 'Task deleted' };
    mockTaskService.remove.mockResolvedValue(result);

    expect(await controller.remove('1', '101')).toEqual(result);
    expect(mockTaskService.remove).toHaveBeenCalledWith('1', '101');
  });
});
