import { Task } from "./Task";
import { TaskBoard } from "./TaskBoard.interface";

export interface TaskList {
  id: number;
  title: string;
  position: number;
  board_id: number;
  board?: TaskBoard;
  task: Task[];
  created_at: Date;
  updated_at: Date;
}
