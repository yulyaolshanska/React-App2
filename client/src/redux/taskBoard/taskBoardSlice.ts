import { createSlice } from "@reduxjs/toolkit";
import { TaskBoard } from "../../interfaces/TaskBoard.interface";
import {
  addTaskBoard,
  deleteTaskBoard,
  getAllTaskBoards,
  updateTaskBoard,
} from "./taskBoardAsyncThunk";

interface TaskBoardState {
  taskBoards: TaskBoard[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskBoardState = {
  taskBoards: [],
  loading: false,
  error: null,
};

const taskBoardSlice = createSlice({
  name: "taskBoards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTaskBoards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTaskBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.taskBoards = action.payload;
      })
      .addCase(getAllTaskBoards.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ??
          "An error occurred while fetching task boards";
      })
      .addCase(addTaskBoard.fulfilled, (state, action) => {
        state.taskBoards.push(action.payload);
      })
      .addCase(updateTaskBoard.fulfilled, (state, action) => {
        const updatedTaskBoard = action.payload;
        const index = state.taskBoards.findIndex(
          (taskBoard) => taskBoard.id === updatedTaskBoard.id
        );
        if (index !== -1) {
          state.taskBoards[index] = updatedTaskBoard;
        }
      })
      .addCase(deleteTaskBoard.fulfilled, (state, action) => {
        state.taskBoards = state.taskBoards.filter(
          (taskBoard) => taskBoard.id !== action.payload
        );
      });
  },
});

export default taskBoardSlice.reducer;
