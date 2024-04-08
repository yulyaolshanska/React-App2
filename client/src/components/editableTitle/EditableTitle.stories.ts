import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import EditableTitle from "./EditableTitle";

const meta: Meta<typeof EditableTitle> = {
  title: "Components/EditableTitle",
  component: EditableTitle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EditableTitle>;

const title = {
  id: 1,
  initialValue: "New Title",
  onSave: fn(),
  handleClick: fn(),
};

export const Default: Story = {
  args: { ...title, isActive: false },
};

export const Active: Story = {
  args: { ...title, isActive: true },
};
