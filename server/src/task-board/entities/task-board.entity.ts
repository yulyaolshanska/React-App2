import { ApiProperty } from '@nestjs/swagger';
import { TaskList } from '../../task-list/entities/task-list.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskHistory } from '../../task-history/entities/task-history.entity';

@Entity()
export class TaskBoard {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @OneToMany(() => TaskList, (column) => column.board, { cascade: true })
  @ApiProperty()
  column: TaskList[];

  @OneToMany(() => TaskHistory, (taskHistory) => taskHistory.board, {
    onDelete: 'CASCADE',
  })
  boardHistory: TaskHistory[];
}
