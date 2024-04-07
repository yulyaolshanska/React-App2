import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTaskBoardDto } from './dto/create-task-board.dto';
import { UpdateTaskBoardDto } from './dto/update-task-board.dto';
import { TaskBoardService } from './task-board.service';

@Controller('api/task-board')
export class TaskBoardController {
  constructor(private readonly taskBoardService: TaskBoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateTaskBoardDto) {
    return this.taskBoardService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.taskBoardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskBoardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateTaskBoardDto) {
    return this.taskBoardService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskBoardService.remove(+id);
  }
}
