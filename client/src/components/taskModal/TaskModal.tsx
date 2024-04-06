import React, { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskList } from "../../interfaces/ TaskList.interface";
import { AddTaskFormData } from "../../interfaces/AddTaskFormData.interface";
import { Task } from "../../interfaces/Task";
import { useAppDispatch } from "../../redux/store";
import { updateTask } from "../../redux/tasks/taskAsyncThunk";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  columns: TaskList[];
}

const TaskModal: React.ForwardRefRenderFunction<
  HTMLDivElement,
  TaskModalProps
> = ({ task, isOpen, onClose, columns }, ref) => {
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(task?.column?.id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<AddTaskFormData>({
    mode: "onChange",
    shouldUnregister: true,
  });
  const handleFormSubmit = (data: AddTaskFormData) => {
    if (selectedColumnId) {
      data.columnId = selectedColumnId;
    }

    dispatch(updateTask({ id: task.id, updatedTask: data }));
    reset();
    onClose();
  };

  const handleClose = () => {
    setIsEditMode(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex justify-center items-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        ref={ref}
        className="=orelative bg-white rounded-lg flex   w-5/6 shadow-md z-50"
      >
        <div className="w-3/5 p-5 flex flex-col justify-center relative">
          <h2 className="text-center font-semibold text-xl mb-5"> Task info</h2>
          <button
            className="border-solid border-1 border-cyan-500 rounded-md ml-auto mb-5 p-2  w-28 text-sm"
            onClick={() => setIsEditMode(true)}
          >
            Edit Task
          </button>
          {!isEditMode ? (
            <div className="flex flex-col">
              <div className="mb-5 flex items-center h-10">
                <p className="w-1/4 font-bold block mr-4">Title:</p>
                <p> {task.title}</p>
              </div>
              <div className="mb-5 flex items-center h-10">
                <p className=" w-1/4 font-bold block mr-4">Description:</p>
                <p>{task.description}</p>
              </div>
              <div className="mb-5 flex items-center h-10">
                <p className=" w-1/4 font-bold block mr-4">Due Date:</p>
                <p> {new Date(task.due_date).toISOString().split("T")[0]}</p>
              </div>
              <div className="mb-5 flex items-center h-10">
                <p className="w-1/4 font-bold block mr-4">Priority: </p>
                <p>{task.priority}</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="flex flex-col"
            >
              <div className="mb-5 flex items-center h-10">
                <label htmlFor="title" className="w-1/4 font-bold block mr-4">
                  Title:
                </label>
                <div className="flex flex-col m-b-1 w-3/5">
                  <input
                    type="text"
                    id="title"
                    aria-invalid={errors.title ? "true" : "false"}
                    required
                    className={` p-2 border-solid border-1 border-gray-400 rounded-md ${
                      errors.title ? "text-red-500 mt-5" : ""
                    }
                  `}
                    defaultValue={task.title}
                    {...register("title", {
                      required: "This field is required",
                      minLength: {
                        value: 2,
                        message: "Title should be at least 2 characters long",
                      },
                      maxLength: {
                        value: 30,
                        message: "Title should not exceed 30 characters",
                      },
                    })}
                    name="title"
                  />
                  {errors?.title && touchedFields.title && (
                    <p className="text-xs text-red-500">
                      {errors?.title?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-5 flex items-center h-10">
                <label
                  htmlFor="description"
                  className="w-1/4 font-bold block mr-4"
                >
                  Description:
                </label>
                <div className="flex flex-col m-b-1 w-3/5">
                  <input
                    type="text"
                    id="description"
                    aria-invalid={errors.description ? "true" : "false"}
                    minLength={2}
                    maxLength={100}
                    required
                    className={`p-2 border-solid border-1 border-gray-400 rounded-md ${
                      errors.description ? "text-red-500 mt-5" : ""
                    }
                  `}
                    defaultValue={task.description}
                    {...register("description", {
                      required: "This field is required",
                      minLength: {
                        value: 2,
                        message:
                          "Description should be at least 2 characters long",
                      },
                      maxLength: {
                        value: 100,
                        message: "Description should not exceed 100 characters",
                      },
                    })}
                    name="description"
                  />
                  {errors.description && touchedFields.description && (
                    <p className="text-xs text-red-500">
                      {errors.description?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-5 flex items-center h-10">
                <label
                  htmlFor="due_date"
                  className="w-1/4 font-bold block mr-4"
                >
                  Due Date:
                </label>
                <div className="flex flex-col m-b-1 w-3/5">
                  <input
                    type="date"
                    id="due_date"
                    aria-invalid={errors.due_date ? "true" : "false"}
                    required
                    className={`p-2 border-solid border-1 border-gray-400 rounded-md ${
                      errors.due_date ? "text-red-500 mt-5" : ""
                    }
                  `}
                    defaultValue={
                      task.due_date
                        ? new Date(task.due_date).toISOString().split("T")[0]
                        : ""
                    }
                    {...register("due_date", {
                      required: "This field is required",
                      validate: {
                        futureDate: (value) => {
                          const selectedDate = new Date(value);
                          const today = new Date();
                          return (
                            selectedDate >= today ||
                            "Due Date must be a future date"
                          );
                        },
                      },
                    })}
                    name="due_date"
                  />
                  {errors.due_date && touchedFields.due_date && (
                    <p className="text-xs text-red-500">
                      {errors.due_date?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-5 flex items-center h-10">
                <label
                  htmlFor="priority"
                  className="w-1/4 font-bold block mr-4"
                >
                  Priority:
                </label>
                {isEditMode ? (
                  <select
                    id="priority"
                    className="w-3/5 p-2 border-solid border-1 border-gray-400 rounded-md"
                    defaultValue={task.priority}
                    {...register("priority")}
                    name="priority"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                ) : (
                  <p>{task.priority}</p>
                )}
              </div>
              <div className="mb-5 flex items-center h-10">
                <label
                  htmlFor="columnId"
                  className="w-1/4 font-bold block mr-4"
                >
                  Move to:
                </label>
                <select
                  id="columnId"
                  value={selectedColumnId}
                  onChange={(e) => setSelectedColumnId(+e.target.value)}
                  className="w-3/5 p-2 border-solid border-1 border-gray-400 rounded-md"
                  name="columnId"
                >
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </select>
              </div>

              {isEditMode && (
                <button
                  type="submit"
                  className="bg-blue-600 w-48 justify-center text-white py-2 px-4 rounded-lg cursor-pointer mx-auto mb-4 hover:bg-blue-700"
                >
                  Submit
                </button>
              )}
            </form>
          )}
          <button
            onClick={handleClose}
            className="bg-red-500 text-white py-2 px-4 rounded-lg cursor-pointer w-48 mx-auto hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
        <div className="w-5/12 p-5 bg-gray-400 bg-opacity-40">
          <h2 className="text-center font-semibold text-xl mb-5">
            Task history
          </h2>
          <ul className="pl-1">
            {task.taskHistory &&
              task.taskHistory.map((history) => (
                <li className="list-disc mb-3">{history.action}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(TaskModal);
