import { RootState } from "../store";

export const selectTaskLists = (state: RootState) => state.taskLists.taskLists;

export const selectTaskListsLoading = (state: RootState): boolean =>
  state.taskLists.loading;

export const selectTaskListsError = (state: RootState) => state.taskLists.error;
