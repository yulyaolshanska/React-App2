import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class UpdateTaskBoardDto {
  @Column()
  @ApiProperty()
  title: string;
}
