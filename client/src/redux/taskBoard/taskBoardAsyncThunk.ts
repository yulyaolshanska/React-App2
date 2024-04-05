import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants";
import { TaskBoard } from "../../interfaces/TaskBoard.interface";

export const getAllTaskBoards = createAsyncThunk<TaskBoard[]>(
  "taskBoards/fetchTaskBoards",
  async () => {
    const response = await fetch(`${BASE_URL}/task-board`);
    const data = await response.json();

    return data;
  }
);

export const addTaskBoard = createAsyncThunk(
  "taskBoards/addTaskBoard",
  async (newTaskBoard: TaskBoard) => {
    const response = await fetch(`${BASE_URL}/task-board`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTaskBoard),
    });
    const data = await response.json();

    return data;
  }
);

export const updateTaskBoard = createAsyncThunk<
  TaskBoard,
  { id: number; newTitle: string }
>("taskBoards/updateTaskBoard", async ({ id, newTitle }) => {
  try {
    const response = await fetch(`${BASE_URL}/task-board/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (!response.ok) {
      throw new Error("Failed to update task board");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating task board:", error);
    throw error;
  }
});

export const deleteTaskBoard = createAsyncThunk<number, number>(
  "taskBoards/deleteTaskBoard",
  async (id) => {
    await fetch(`${BASE_URL}/task-board/${id}`, {
      method: "DELETE",
    });

    return id;
  }
);
