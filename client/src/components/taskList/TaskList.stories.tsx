import { Meta, StoryObj } from "@storybook/react";
import { Priority } from "../../interfaces/Task";
import TaskList from "./TaskList";
import { StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { task, columns, tasksArray } from "../../stories/mockData";

const meta: Meta<typeof TaskList> = {
  title: "Components/TaskList",
  component: TaskList,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: StoryFn) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TaskList>;

const defaultArgs = {
  tasks: [],
  taskLists: columns,
  loading: false,
  error: null,
};

export const Default = () => (
  <Provider store={store}>
    <TaskList {...defaultArgs} />
  </Provider>
);

export const TaskListWithTasks: Story = {
  args: {
    tasks: tasksArray,
    taskLists: columns,
    loading: false,
    error: null,
  },
};

export const TaskListLoading: Story = {
  args: {
    tasks: tasksArray,
    taskLists: columns,
    loading: true,
    error: null,
  },
};

export const TaskListError: Story = {
  args: {
    tasks: tasksArray,
    taskLists: columns,
    loading: false,
    error: "Error in task list",
  },
};

// export const MediumPriority: Story = {
//   args: {
//     task: { ...task, priority: Priority.MEDIUM },
//     columns,
//   },
// };

// export const LowPriority: Story = {
//   args: {
//     task: { ...task, priority: Priority.LOW },
//     columns,
//   },
// };
