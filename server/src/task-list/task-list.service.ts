import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskHistory } from '../task-history/entities/task-history.entity';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { TaskList } from './entities/task-list.entity';
import { TaskBoard } from '../task-board/entities/task-board.entity';

@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskHistory)
    private readonly taskHistoryRepository: Repository<TaskHistory>,
    @InjectRepository(TaskBoard)
    private boardRepository: Repository<TaskBoard>,
  ) {}

  async createTaskList(
    createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    const allTaskLists = await this.taskListRepository.find();
    let targetPos = allTaskLists.length > 0 ? allTaskLists.length + 1 : 1;

    const taskBoard = await this.boardRepository.findOne({
      where: { id: createTaskListDto.board_id },
    });
    if (!taskBoard) {
      throw new Error(`Board with ID ${createTaskListDto.board_id} not found`);
    }

    const newList = this.taskListRepository.create({
      ...createTaskListDto,
      position: targetPos,
      board: taskBoard,
    });

    const savedList = await this.taskListRepository.save(newList);

    return savedList;
  }

  async findAllByBoardId(id: number) {
    const board = await this.boardRepository.findOne({
      relations: ['column'],
      where: { id },
    });
    const taskLists = await this.taskListRepository.find({
      where: { board: { id: board.id } },
      relations: ['task', 'board'],
    });
    return taskLists;
  }

  async getAllTaskLists(): Promise<TaskList[]> {
    return this.taskListRepository.find({
      relations: ['task', 'board'],
    });
  }

  getTaskListById(id: number) {
    return this.taskListRepository.findOne({
      where: { id },
    });
  }

  async updateTaskList(id: number, updateTaskListDto: UpdateTaskListDto) {
    try {
      const list = await this.taskListRepository.findOneOrFail({
        where: { id },
      });

      Object.assign(list, updateTaskListDto);

      return await this.taskListRepository.save(list);
    } catch (err) {
      console.log('err', err);
    }
  }

  async removeTaskList(id: number) {
    const tasks = await this.taskRepository.find({ where: { column: { id } } });

    for (const task of tasks) {
      await this.taskHistoryRepository.delete({ task: { id: task.id } });
    }

    await this.taskRepository.delete({ column: { id } });

    await this.taskListRepository.delete(id);

    return { message: `Task with id ${id} deleted` };
  }
}
