import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TaskLists from "../../components/taskList/TaskList";
import { TaskList } from "../../interfaces/ TaskList.interface";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  addTaskList,
  fetchTaskLists,
} from "../../redux/taskList/ taskListAsyncThunk";
import {
  selectTaskLists,
  selectTaskListsError,
  selectTaskListsLoading,
} from "../../redux/taskList/taskListSelectors";
import { fetchTasks } from "../../redux/tasks/taskAsyncThunk";

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const taskLists = useSelector(selectTaskLists);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const isTaskListLoading = useSelector(selectTaskListsLoading);
  const taskListError = useSelector(selectTaskListsError);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTaskLists());
        await dispatch(fetchTasks());
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleAddNewList = () => {
    const maxId = Math.max(...taskLists.map((list) => list.id), 0);
    const newId = maxId + 1;
    const newTaskList: TaskList = {
      id: newId,
      title: "New List",
      created_at: new Date(),
      updated_at: new Date(),
      position: taskLists.length > 0 ? taskLists.length + 1 : 1,
      task: [],
    };
    dispatch(addTaskList(newTaskList));
  };

  return (
    <div>
      <div>
        <h1>My Task Board</h1>
        <button onClick={handleAddNewList}>+ Create new list</button>
      </div>

      <TaskLists
        taskLists={taskLists}
        tasks={tasks}
        loading={isTaskListLoading}
        error={taskListError}
      />
    </div>
  );
};

export default BoardPage;
