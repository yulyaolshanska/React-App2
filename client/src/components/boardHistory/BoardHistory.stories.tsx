import { StoryFn } from "@storybook/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../redux/store";
import HistorySidebar from "./BoardHistory";
import { Meta, StoryObj } from "@storybook/react";

const MockedStore = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

const meta: Meta<typeof HistorySidebar> = {
  title: "Components/HistorySidebar",
  component: HistorySidebar,
  decorators: [
    (Story: StoryFn) => (
      <MockedStore>
        <Story />
      </MockedStore>
    ),
  ],
};

export default meta;

type Template = StoryObj<typeof HistorySidebar>;

export const Defualt: Template = {};
