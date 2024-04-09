import { Controller, Get, Param } from '@nestjs/common';
import { TaskHistoryService } from './task-history.service';

@Controller('api')
export class TaskHistoryController {
  constructor(private readonly taskHistoryService: TaskHistoryService) {}

  @Get('/task-history/:taskId')
  async getTaskHistory(@Param('taskId') taskId: number) {
    return this.taskHistoryService.findAllByTaskId(taskId);
  }

  @Get('/board-history/:boardId')
  async getBoardHistory(@Param('boardId') boardId: number) {
    return this.taskHistoryService.findBoardHistory(boardId);
  }
}
