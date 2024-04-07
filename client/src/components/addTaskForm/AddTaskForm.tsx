import React, { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { AddTaskFormData } from "../../interfaces/AddTaskFormData.interface";
import { useAppDispatch } from "../../redux/store";
import { addTask } from "../../redux/tasks/taskAsyncThunk";

interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  listId: number;
}

const AddTaskForm: React.ForwardRefRenderFunction<
  HTMLDivElement,
  AddTaskFormProps
> = ({ isOpen, onClose, listId }, ref) => {
  const dispatch = useAppDispatch();

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
    data.columnId = listId;
    dispatch(addTask(data));
    reset();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 overflow-y-auto flex justify-center items-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div
            ref={ref}
            className="relative bg-white rounded-lg flex flex-col items-center p-10  w-2/5 shadow-md z-50"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 w-6 h-6 flex items-center justify-center rounded-full bg-pink-800 text-white hover:bg-red-600"
            >
              &times;
            </button>
            <h2 className="text-center font-bold text-lg mb-5"> Add Task</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full">
              <div className="mb-5">
                <label htmlFor="title" className="mb-1 font-bold block">
                  Name:
                </label>
                <input
                  type="text"
                  id="title"
                  aria-invalid={errors.title ? "true" : "false"}
                  required
                  className={`w-full p-2 border-solid border-1 border-gray-400 rounded-md ${
                    errors.title ? "text-red-500" : ""
                  }
                  `}
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

              <div className="mb-5">
                <label htmlFor="description" className="mb-1 font-bold block">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  aria-invalid={errors.description ? "true" : "false"}
                  minLength={2}
                  maxLength={100}
                  required
                  className={`w-full p-2 border-solid border-1 border-gray-400 rounded-md ${
                    errors.description ? "text-red-500" : ""
                  }
                  `}
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

              <div className="mb-5">
                <label htmlFor="due_date" className="mb-1 font-bold block">
                  Due Date:
                </label>
                <input
                  type="date"
                  id="due_date"
                  aria-invalid={errors.due_date ? "true" : "false"}
                  required
                  className={`w-full p-2 border-solid border-1 border-gray-400 rounded-md ${
                    errors.due_date ? "text-red-500" : ""
                  }
                  `}
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

              <div className="mb-5">
                <label htmlFor="priority" className="mb-1 font-bold block">
                  Priority:
                </label>
                <select
                  id="priority"
                  className="w-full p-3 border-solid border-1 border-gray-300 rounded-md"
                  {...register("priority")}
                  name="priority"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>

              <button
                type="submit"
                className="mx-auto flex bg-blue-600 w-48 justify-center text-white py-2 px-4 rounded-lg cursor-pointer  hover:bg-blue-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default forwardRef(AddTaskForm);
