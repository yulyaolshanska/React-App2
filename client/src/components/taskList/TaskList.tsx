import React, { useEffect, useRef, useState } from "react";
import { TaskList } from "../../interfaces/ TaskList.interface";
import { Task } from "../../interfaces/Task";
import { useAppDispatch } from "../../redux/store";
import {
  deleteTaskList,
  updateTaskList,
} from "../../redux/taskList/ taskListAsyncThunk";
import { deleteTask } from "../../redux/tasks/taskAsyncThunk";
import AddTaskForm from "../addTaskForm/AddTaskForm";
import DropDown from "../dropDown/DropDown";
import EditableTitle from "../editableTitle/EditableTitle";
import TaskCard from "../taskCard/TaskCard";
import TaskModal from "../taskModal/TaskModal";

interface TaskListProps {
  taskLists: TaskList[];
  tasks: Task[];
  loading: boolean;
  error?: string | null;
}

const TaskLists: React.FC<TaskListProps> = ({
  taskLists,
  tasks,
  loading,
  error,
}) => {
  const dispatch = useAppDispatch();
  const addModalRef = useRef<HTMLDivElement>(null);
  const editModalRef = useRef<HTMLDivElement>(null);
  const editTitleRef = useRef<HTMLInputElement>(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [activeTitleInput, setActiveTitleInput] = useState<number | null>(null);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [taskForEdit, setTaskForEdit] = useState<Task | null>(null);
  const [activeListId, setActiveListId] = useState<number | undefined>(
    taskLists.length > 0 ? taskLists[0].id : undefined
  );

  const handleListTitleSave = (id: number, newTitle: string): void => {
    if (newTitle) {
      dispatch(updateTaskList({ id, newTitle }));
      setActiveTitleInput(null);
    }
  };

  const handleDeleteTaskList = (id: number): void => {
    dispatch(deleteTaskList(id));
  };

  const handleDeleteTask = (id: number): void => {
    dispatch(deleteTask(id));
  };

  const handleCloseModal = () => {
    setIsOpenAddModal(false);
    setIsOpenEditModal(false);
    setTaskForEdit(null);
  };

  const focusInput = (id: number) => {
    setActiveTitleInput(id);
    const input = document.getElementById(
      `input-${id}`
    ) as HTMLInputElement | null;
    if (input) {
      input.focus();
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      addModalRef.current &&
      !addModalRef.current.contains(e.target as Node)
    ) {
      setIsOpenAddModal(false);
    }
    if (
      editModalRef.current &&
      !editModalRef.current.contains(e.target as Node)
    ) {
      setIsOpenEditModal(false);
      setTaskForEdit(null);
    }
  };

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpenAddModal(false);
      setIsOpenEditModal(false);
      setTaskForEdit(null);
    }
  };

  useEffect(() => {
    if (isOpenAddModal || isOpenEditModal) {
      document.addEventListener("mousedown", handleOutsideClick);
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpenAddModal, isOpenEditModal]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <ul className="flex gap-10 pl-5 pr-5">
          {taskLists.length > 0 &&
            [...taskLists]
              .sort(
                (first: TaskList, second: TaskList) =>
                  first.position - second.position
              )
              .map(({ id, title, task }) => (
                <li
                  className="h-fit bg-gray-200 rounded-lg shadow-md p-2 flex flex-col justify-between"
                  key={id}
                >
                  <div className="relative p-2 flex">
                    <EditableTitle
                      ref={editTitleRef}
                      isActive={activeTitleInput === id}
                      onSave={handleListTitleSave}
                      handleClick={() => setActiveTitleInput(id)}
                      id={id}
                      initialValue={title}
                    />
                    {task && (
                      <p className="absolute right-10">
                        {task.length > 0 ? task.length : 0}
                      </p>
                    )}
                    <DropDown
                      onAddClick={() => setIsOpenAddModal(true)}
                      onEditClick={() => focusInput(id)}
                      onDeleteClick={() => handleDeleteTaskList(id)}
                      mode="list"
                    />
                  </div>

                  {activeListId && (
                    <AddTaskForm
                      ref={addModalRef}
                      listId={activeListId}
                      onClose={handleCloseModal}
                      isOpen={isOpenAddModal}
                    />
                  )}
                  {tasks.length > 0 &&
                    tasks
                      .filter((t: Task) => t?.column?.id === id)
                      .sort(
                        (first: Task, second: Task) =>
                          first.position - second.position
                      )
                      .map((task) => (
                        <TaskCard task={task} key={task.id} columns={taskLists}>
                          <DropDown
                            onEditClick={() => {
                              setIsOpenEditModal(true);
                              setTaskForEdit(task);
                            }}
                            onDeleteClick={() => handleDeleteTask(task.id)}
                            mode="task"
                          />
                        </TaskCard>
                      ))}
                  {taskForEdit && (
                    <TaskModal
                      columns={taskLists}
                      task={taskForEdit}
                      ref={editModalRef}
                      onClose={handleCloseModal}
                      isOpen={isOpenEditModal}
                    />
                  )}
                  <button
                    className="flex border border-gray-400 rounded-md p-1 text-lg w-full justify-center font-semibold"
                    onClick={() => {
                      setIsOpenAddModal(true);
                      setActiveListId(id);
                    }}
                  >
                    + Add new task
                  </button>
                </li>
              ))}
        </ul>
      )}
    </>
  );
};

export default TaskLists;
