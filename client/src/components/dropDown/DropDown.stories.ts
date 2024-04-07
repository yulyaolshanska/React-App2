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

export const Default: Story = {
  args: {
    onAddClick: fn(),
    onEditClick: fn(),
    onDeleteClick: fn(),
  },
};

export const ListModeDefault: Story = {
  args: {
    ...Default.args,
    mode: "list",
  },
};
