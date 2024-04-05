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
import styles from "./TaskLists.module.scss";

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
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul className={styles.taskLists}>
        {taskLists.length > 0 &&
          [...taskLists]
            .sort(
              (first: TaskList, second: TaskList) =>
                first.position - second.position
            )
            .map((taskList) => (
              <li key={taskList.id}>
                <div className={styles.listTitleContainer}>
                  <EditableTitle
                    isActive={activeTitleInput === taskList.id}
                    onSave={handleListTitleSave}
                    id={taskList.id}
                    initialValue={taskList.title}
                  />
                  {taskList?.task && (
                    <p className={styles.taskCounter}>
                      {taskList?.task.length > 0 ? taskList?.task.length : 0}
                    </p>
                  )}
                  <DropDown
                    onAddClick={() => setIsOpenAddModal(true)}
                    onEditClick={() => focusInput(taskList.id)}
                    onDeleteClick={() => handleDeleteTaskList(taskList.id)}
                    mode="list"
                  />
                </div>
                <button
                  className={styles.addTaskBtn}
                  onClick={() => {
                    setIsOpenAddModal(true);
                    setActiveListId(taskList.id);
                  }}
                >
                  + Add new task
                </button>
                {activeListId && (
                  <AddTaskForm
                    ref={addModalRef}
                    listId={activeListId}
                    onClose={handleCloseModal}
                    isOpen={isOpenAddModal}
                  />
                )}
                {tasks &&
                  tasks
                    .filter((t: Task) => t?.column?.id === taskList.id)
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
              </li>
            ))}
      </ul>
    </div>
  );
};

export default TaskLists;
