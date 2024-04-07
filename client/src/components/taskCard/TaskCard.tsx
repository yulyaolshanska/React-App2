import React, { useState } from "react";
import { weekdays } from "../../constants";
import { TaskList } from "../../interfaces/ TaskList.interface";
import { Task } from "../../interfaces/Task";
import { useAppDispatch } from "../../redux/store";
import { updateTask } from "../../redux/tasks/taskAsyncThunk";

interface TaskCardProps {
  task: Task;
  children: React.ReactElement;
  columns: TaskList[];
}

const TaskCard: React.FC<TaskCardProps> = ({ task, columns, children }) => {
  const dispatch = useAppDispatch();
  const [selectedColumnId, setSelectedColumnId] = useState(task?.column?.id);

  const formatDueDate = (dueDate: Date): string => {
    const date = new Date(dueDate);

    const day = weekdays[date.getDay()];
    const month = date.toLocaleString("en-US", { month: "short" });

    return `${day}, ${date.getDate()} ${month} `;
  };

  const handleMoveTask = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumnId(+e.target.value);
    try {
      await dispatch(
        updateTask({ id: task.id, updatedTask: { columnId: +e.target.value } })
      );
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  return (
    <div className="relative bg-white border border-gray-300 rounded-md p-4 mb-3 flex flex-col gap-3 w-full">
      {children}
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p className="text-base">{task.description}</p>
      <p className="text-base text-gray-700 font-semibold">
        Due Date:
        <span className="ml-1 text-sm font-medium">
          {formatDueDate(task.due_date)}
        </span>
      </p>
      <p className="text-base text-gray-700 font-semibold">
        Priority:
        <span className="ml-1 text-sm font-medium">{task.priority}</span>
      </p>
      <div className="bg-gray-300 bg-opacity-60 text-base w-3/4 rounded-md p-1">
        <label htmlFor="columnId" className="cursor-default">
          Move to:
        </label>
        <select
          id="columnId"
          onChange={(e) => handleMoveTask(e)}
          className="cursor-pointer "
          name="columnId"
        >
          <option value={task.column.title}></option>
          {columns
            .filter((column) => column.id !== task.column.id)
            .map((column) => (
              <option key={column.id} value={column.id}>
                {column.title}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};
export default TaskCard;
