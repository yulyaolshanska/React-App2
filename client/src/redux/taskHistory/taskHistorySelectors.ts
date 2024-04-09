import { RootState } from "../store";

export const selectTaskHistory = (state: RootState) =>
  state.history.taskHistory;
export const selectTaskHistoryLoading = (state: RootState) =>
  state.history.loading;
export const selectTaskHistoryError = (state: RootState) => state.history.error;

export const selectBoardHistory = (state: RootState) =>
  state.history.boardHistory;
export const selectBoardHistoryLoading = (state: RootState) =>
  state.history.loading;
export const selectBoardHistoryError = (state: RootState) =>
  state.history.error;
