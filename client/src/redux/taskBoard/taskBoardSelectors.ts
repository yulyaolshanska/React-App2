import { RootState } from "../store";

export const selectTaskBoards = (state: RootState) => state.taskBoards.taskBoards;

export const selectTaskBoardsLoading = (state: RootState) => state.taskBoards.loading;

export const selectTaskBoardsError = (state: RootState) => state.taskBoards.error;
