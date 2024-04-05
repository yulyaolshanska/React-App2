import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../../tasks/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskBoard } from 'src/task-board/entities/task-board.entity';

@Entity()
export class TaskList {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column('float', { nullable: true })
  @ApiProperty()
  position: number;

  @OneToMany(() => Task, (task) => task.column, { cascade: true })
  @ApiProperty()
  task: Task[];

  @ManyToOne(() => TaskBoard, (taskBoard) => taskBoard.column)
  @JoinColumn({ name: 'board_id' })
  @ApiProperty()
  board: TaskBoard;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;
}
