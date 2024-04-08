import { StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import AddTaskForm from "./AddTaskForm";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const MockedStore = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

const meta: Meta<typeof AddTaskForm> = {
  title: "Components/AddTaskForm",
  component: AddTaskForm,
  decorators: [
    (Story: StoryFn) => (
      <MockedStore>
        <Story />
      </MockedStore>
    ),
  ],
};

export default meta;

type Template = StoryObj<typeof AddTaskForm>;

export const ClosedModal: Template = {
  args: {
    isOpen: false,
    onClose: fn(),
  },
};

export const OpenedModal: Template = {
  args: {
    isOpen: true,
    onClose: fn(),
  },
};
