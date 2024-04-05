import { Task } from "./Task";

export interface TaskList {
  id: number;
  title: string;
  position: number;
  board_id: number;
  task: Task[];
  created_at: Date;
  updated_at: Date;
}
