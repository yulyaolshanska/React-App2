import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import HistorySidebar from "../../components/boardHistory/BoardHistory";
import AddButton from "../../components/buttons/addButton/AddButton";
import TaskLists from "../../components/taskList/TaskList";
import { TaskList } from "../../interfaces/ TaskList.interface";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchBoardHistory } from "../../redux/taskHistory/taskHistoryAsyncThunk";
import {
  addTaskList,
  getTaskListsByBoardId,
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
        if (id) {
          await dispatch(getTaskListsByBoardId(+id));
          await dispatch(fetchBoardHistory(+id));
        }
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
      position: taskLists.length > 0 ? taskLists.length + 1 : 1,
      task: [],
      board_id: id ? +id : 1,
      created_at: new Date(),
      updated_at: new Date(),
    };
    dispatch(addTaskList(newTaskList));
  };

  return (
    <>
      {isTaskListLoading ? (
        <div>Loading</div>
      ) : (
        <div className="p-0  pb-5">
          <div className="flex bg-blue-300 p-3 mb-5">
            <Link to="/">
              <h2 className="border-solid border-1 border-cyan-600 text-xl rounded-lg p-2 mr-5">
                All Boards
              </h2>
            </Link>
            <div className="flex ml-auto">
              <HistorySidebar />
              <AddButton onClick={handleAddNewList} text="+ Create new list" />
            </div>
          </div>
          <h1 className="text-xl text-center mb-5">
            {taskLists[0]?.board?.title}
          </h1>

          <TaskLists
            taskLists={taskLists}
            tasks={tasks}
            loading={isTaskListLoading}
            error={taskListError}
          />
        </div>
      )}
    </>
  );
};

export default BoardPage;
