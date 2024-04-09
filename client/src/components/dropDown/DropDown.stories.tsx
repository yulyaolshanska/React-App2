import { Meta, StoryObj } from "@storybook/react";
import DropDown from "./DropDown";
import { fn } from "@storybook/test";

const meta: Meta<typeof DropDown> = {
  title: "Components/DropDown",
  component: DropDown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DropDown>;

const defaultArgs = {
  onAddClick: fn(),
  onEditClick: fn(),
  onDeleteClick: fn(),
};

export const TaskModeDefault = () => (
  <div className="relative border-solid border-1 border-zinc-400 w-[200px] h-[200px]">
    <DropDown {...defaultArgs} mode="task" />
  </div>
);

export const ListModeDefault = () => (
  <div className="relative border-solid border-1 border-zinc-400 w-[200px] h-[200px]">
    <DropDown {...defaultArgs} mode="list" />
  </div>
);
