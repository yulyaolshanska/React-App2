import { PartialType } from '@nestjs/swagger';
import { CreateTaskBoardDto } from './create-task-board.dto';

export class UpdateTaskBoardDto extends PartialType(CreateTaskBoardDto) {}
