import { createSlice } from "@reduxjs/toolkit";
import { BoardHistory } from "../../interfaces/BoardHistory.interface";
import { TaskHistory } from "../../interfaces/TaskHistory.interface";
import { fetchTaskHistory, fetchBoardHistory } from "./taskHistoryAsyncThunk";

interface HistoryState {
  taskHistory: TaskHistory[];
  loading: boolean;
  error: string | null;
  boardHistory: BoardHistory[];
}

const initialState: HistoryState = {
  taskHistory: [],
  loading: false,
  error: null,
  boardHistory: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.taskHistory = action.payload;
      })
      .addCase(fetchTaskHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchBoardHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBoardHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.boardHistory = action.payload;
      })
      .addCase(fetchBoardHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      });
  },
});

export const historyActions = historySlice.actions;
export const historyReducer = historySlice.reducer;
