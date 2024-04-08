import { StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import TaskModal from "./TaskModal";
import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { task, columns, tasksArray, history } from "../../stories/mockData";

const MockedStore = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

const meta: Meta<typeof TaskModal> = {
  title: "Components/TaskModal",
  component: TaskModal,
  decorators: [
    (Story: StoryFn) => (
      <MockedStore>
        <Story />
      </MockedStore>
    ),
  ],
};

export default meta;

type Template = StoryObj<typeof TaskModal>;

export const OpenedModal: Template = {
  args: {
    isOpen: true,
    onClose: fn(),
    task,
    columns,
  },
};

export const WithHistory: Template = {
  args: {
    isOpen: true,
    onClose: fn(),
    task: {
      ...task,
      taskHistory: history,
    },
    columns,
  },
};
