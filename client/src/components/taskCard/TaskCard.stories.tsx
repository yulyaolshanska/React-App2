import { Meta, StoryObj } from "@storybook/react";
import { Priority } from "../../interfaces/Task";
import TaskCard from "./TaskCard";
import { StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { task, columns } from "../../stories/mockData";

const meta: Meta<typeof TaskCard> = {
  title: "Components/TaskCard",
  component: TaskCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
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
type Story = StoryObj<typeof TaskCard>;

const defaultArgs = {
  task,
  columns,
};

export const Default = () => (
  <Provider store={store}>
    <TaskCard {...defaultArgs} />
  </Provider>
);

export const HighPriority: Story = {
  args: {
    task: { ...task, priority: Priority.HIGH },
    columns,
  },
};

export const MediumPriority: Story = {
  args: {
    task: { ...task, priority: Priority.MEDIUM },
    columns,
  },
};

export const LowPriority: Story = {
  args: {
    task: { ...task, priority: Priority.LOW },
    columns,
  },
};
