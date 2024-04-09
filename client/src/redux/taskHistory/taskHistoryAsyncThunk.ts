import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { BoardHistory } from "../../interfaces/BoardHistory.interface";
import { TaskHistory } from "../../interfaces/TaskHistory.interface";

export const fetchTaskHistory = createAsyncThunk<TaskHistory[], number>(
  "taskHistory/fetchTaskHistory",
  async (taskId: number) => {
    const response = await fetch(`${BASE_URL}/task-history/${taskId}`);
    const data = await response.json();

    return data;
  }
);

export const fetchBoardHistory = createAsyncThunk<BoardHistory[], number>(
  "boardHistory/fetchBoardHistory",
  async (boardId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/board-history/${boardId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch board history");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error("An error occurred");
    }
  }
);
