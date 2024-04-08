import { forwardRef, Module } from '@nestjs/common';
import { TaskList } from './entities/task-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';
import { TaskModule } from '../tasks/tasks.module';
import { TaskHistoryModule } from '../task-history/task-history.module';
import { TaskBoardModule } from '../task-board/task-board.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskList]),
    forwardRef(() => TaskModule),
    forwardRef(() => TaskHistoryModule),
    forwardRef(() => TaskBoardModule),
  ],
  exports: [TypeOrmModule],
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
