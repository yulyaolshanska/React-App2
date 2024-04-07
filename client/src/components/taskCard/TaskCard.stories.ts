import { Meta, StoryObj } from "@storybook/react";
import { Priority } from "../../interfaces/Task";
import TaskCard from "./TaskCard";

const meta: Meta<typeof TaskCard> = {
  title: "Components/TaskCard",
  component: TaskCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

const task = {
  id: 1,
  position: 1,
  column: {
    id: 2,
    title: "",
    position: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  priority: Priority.LOW,
  taskHistory: [],
  title: "Task Card",
  description: "Description",
  due_date: new Date(),
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

const defaultArgs = {
  task: task,
  columns: [
    {
      id: 1,
      title: "Task List",
      position: 1,
      board_id: 1,
      task: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
};

export const HeighPriority: Story = {
  args: {
    ...defaultArgs,
  },
};
