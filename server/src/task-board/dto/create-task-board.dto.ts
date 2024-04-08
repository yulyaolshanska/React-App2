import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

export class CreateTaskBoardDto {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;
}
