import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskHistoryModule } from 'src/task-history/task-history.module';
import { TaskListModule } from 'src/task-list/task-list.module';
import { TaskListService } from 'src/task-list/task-list.services';
import { TaskModule } from 'src/tasks/tasks.module';
import { TaskBoard } from './entities/task-board.entity';
import { TaskBoardController } from './task-board.controller';
import { TaskBoardService } from './task-board.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskBoard]),
    forwardRef(() => TaskListModule),
    forwardRef(() => TaskHistoryModule),
    forwardRef(() => TaskModule),
  ],
  exports: [TypeOrmModule],
  controllers: [TaskBoardController],
  providers: [TaskBoardService, TaskListService],
})
export class TaskBoardModule {}
