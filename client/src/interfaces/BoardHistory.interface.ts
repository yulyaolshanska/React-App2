import { TaskBoard } from "./TaskBoard.interface";

export interface BoardHistory {
  id: number;
  action: string;
  user: string;
  created_at: Date;
  board?: TaskBoard;
}
