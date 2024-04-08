import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskBoard } from './entities/task-board.entity';
import { CreateTaskBoardDto } from './dto/create-task-board.dto';
import { UpdateTaskBoardDto } from './dto/update-task-board.dto';
import { TaskList } from "../task-list/entities/task-list.entity";
import { TaskListService } from '../task-list/task-list.service';

@Injectable()
export class TaskBoardService {
  constructor(
    @InjectRepository(TaskBoard)
    private taskBoardRepository: Repository<TaskBoard>,
    @InjectRepository(TaskList)
    private taskListRepository: Repository<TaskList>,
    private readonly taskListService: TaskListService,
  ) {}
  async create(createTaskBoardDto: CreateTaskBoardDto) {
    const newBoard = this.taskBoardRepository.create({ ...createTaskBoardDto });

    const savedBoard = await this.taskBoardRepository.save(newBoard);

    return savedBoard;
  }

  findAll() {
    return this.taskBoardRepository.find({
      relations: ['column'],
    });
  }

  findOne(id: number) {
    return;
  }

  async update(
    id: number,
    updateTaskBoardDto: UpdateTaskBoardDto,
  ): Promise<TaskBoard> {
    try {
      const board = await this.taskBoardRepository.findOne({
        where: { id },
      });

      if (!board) {
        throw new Error(`Board with ID ${id} not found`);
      }

      if (
        updateTaskBoardDto.title !== undefined &&
        updateTaskBoardDto.title !== board.title
      ) {
        const updatedBoard = { ...board, updateTaskBoardDto };

        return await this.taskBoardRepository.save(updatedBoard);
      } else {
        return board;
      }
    } catch (error) {
      console.error('Error updating task board:', error);
      throw new Error('Failed to update task board');
    }
  }

  async remove(id: number) {
    const taskBoard = await this.taskBoardRepository.findOne({
      where: { id },
      relations: ['column'],
    });

    if (taskBoard) {
      for (const taskList of taskBoard.column) {
        await this.taskListService.removeTaskList(taskList.id);
      }
    }
    await this.taskBoardRepository.delete(id);

    return { message: `Task Board with id ${id} deleted` };
  }
}
