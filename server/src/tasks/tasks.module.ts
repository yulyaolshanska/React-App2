import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskBoardModule } from '../task-board/task-board.module';
import { TaskHistoryModule } from '../task-history/task-history.module';
import { TaskHistoryService } from '../task-history/task-history.service';
import { TaskListModule } from '../task-list/task-list.module';
import { TaskListService } from '../task-list/task-list.service';
import { Task } from './entities/task.entity';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    forwardRef(() => TaskHistoryModule),
    forwardRef(() => TaskListModule),
    forwardRef(() => TaskBoardModule),
  ],
  exports: [TypeOrmModule],
  controllers: [TaskController],
  providers: [TaskService, TaskHistoryService, TaskListService],
})
export class TaskModule {}
