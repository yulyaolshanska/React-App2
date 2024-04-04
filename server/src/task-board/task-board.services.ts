import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskBoard } from './entities/task-board.entity';
import { CreateTaskBoardDto } from './dto/create-task-board.dto';
import { UpdateTaskBoardDto } from './dto/update-task-board.dto';

@Injectable()
export class TaskBoardService {
  constructor(
    @InjectRepository(TaskBoard)
    private taskBoardRepository: Repository<TaskBoard>,
  ) {}
  async create(createTaskBoardDto: CreateTaskBoardDto) {
    const newBoard = this.taskBoardRepository.create({ ...createTaskBoardDto });

    const savedBoard = await this.taskBoardRepository.save(newBoard);
    return savedBoard;
  }

  findAll() {
    return this.taskBoardRepository.find();
  }

  findOne(id: number) {
    return;
  }

  async update(id: number, updateTaskBoardDto: UpdateTaskBoardDto) {
    let existboard = await this.taskBoardRepository.findOne({
      where: { id },
    });

    if (!existboard) {
      throw new Error(`Board with ID ${id} not found`);
    }

    if (
      updateTaskBoardDto.title !== undefined &&
      updateTaskBoardDto.title !== existboard.title
    ) {
    }

    await this.taskBoardRepository.save({
      ...existboard,
      title: updateTaskBoardDto.title,
    });
  }

  async remove(id: number) {
    await this.taskBoardRepository.delete(id);
  }
}
