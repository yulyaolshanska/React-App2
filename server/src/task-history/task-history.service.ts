import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../tasks/entities/task.entity';
import { Repository } from 'typeorm';
import { TaskHistoryDto } from './dto/task-history.dto';
import { TaskHistory } from './entities/task-history.entity';
import { TaskBoard } from '../task-board/entities/task-board.entity';

@Injectable()
export class TaskHistoryService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(TaskHistory)
    private taskHistoryRepository: Repository<TaskHistory>,
    @InjectRepository(TaskBoard)
    private boardRepository: Repository<TaskBoard>,
  ) {}

  async create(taskHistoryDto: TaskHistoryDto) {
    const task = await this.taskRepository.findOne({
      where: { id: taskHistoryDto.task_id },
      relations: ['column'],
    });

    const board = await this.boardRepository.findOne({
      where: { id: taskHistoryDto.boardId },
      relations: ['board'],
    });

    const newChanges = this.taskHistoryRepository.create({
      ...taskHistoryDto,
      task,
      board,
    });
    const savedChanges = await this.taskHistoryRepository.save({
      ...newChanges,
    });

    return savedChanges;
  }

  async findBoardHistory(boardId: number) {
    return await this.taskHistoryRepository.find({
      where: {
        board: { id: boardId },
      },
      relations: ['board'],
    });
  }

  async findAllByTaskId(id: number) {
    return await this.taskHistoryRepository.find({
      where: {
        task: { id: id },
      },
      relations: ['task'],
    });
  }

  async logTaskAction(
    action: string,
    taskId: number,
    username: string,
    boardId: number,
  ) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
      relations: ['boardHistory'],
    });

    const newChange = new TaskHistory();
    newChange.action = action;
    newChange.user = username;
    newChange.created_at = new Date();
    newChange.task = task;
    newChange.board = board;

    return this.taskHistoryRepository.save(newChange);
  }

  async logTaskCreation(taskId: number, username: string, boardId: number) {
    return this.logTaskAction('Create', taskId, username, boardId);
  }

  async logTaskRenaming(
    taskId: number,
    username: string,
    newName: string,
    boardId: number,
  ) {
    return this.logTaskAction(
      `Rename to '${newName}'`,
      taskId,
      username,
      boardId,
    );
  }

  async logTaskDescriptionUpdate(
    taskId: number,
    username: string,
    newDescription: string,
    boardId: number,
  ) {
    return this.logTaskAction(
      `Update description to '${newDescription}'`,
      taskId,
      username,
      boardId,
    );
  }

  async logTaskDueDateUpdate(
    taskId: number,
    username: string,
    newDueDate: Date,
    boardId: number,
  ) {
    return this.logTaskAction(
      `Update due date to '${newDueDate.toISOString()}'`,
      taskId,
      username,
      boardId,
    );
  }

  async logTaskMovement(
    taskId: number,
    username: string,
    newColumn: string,
    boardId: number,
  ) {
    return this.logTaskAction(
      `Move to '${newColumn} column'`,
      taskId,
      username,
      boardId,
    );
  }

  async logTaskPriorityUpdate(
    taskId: number,
    username: string,
    newPriority: string,
    boardId: number,
  ) {
    return this.logTaskAction(
      `Update priority to '${newPriority}'`,
      taskId,
      username,
      boardId,
    );
  }
}
