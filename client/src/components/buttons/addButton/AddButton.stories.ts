import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import AddButton from "./AddButton";

const meta: Meta<typeof AddButton> = {
  title: "Components/AddButton",
  component: AddButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof AddButton>;

export const DefaultAddList: Story = {
  args: {
    onClick: fn(),
    text: "+ Create new list",
  },
};

export const DefaultAddBoard: Story = {
  args: {
    onClick: fn(),
    text: "+ Create new board",
  },
};
