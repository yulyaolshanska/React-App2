import { Meta, StoryFn, StoryObj } from "@storybook/react";
import BoardCard from "./BoardCart";
import { Provider } from "react-redux";
import store from "../../redux/store";

const meta: Meta<typeof BoardCard> = {
  title: "Components/BoardCard",
  component: BoardCard,
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
type Story = StoryObj<typeof BoardCard>;

const defaultArgs = {
  board: { id: 1, title: "Board 1" },
};

export const Default = () => (
  <Provider store={store}>
    {/* <BoardCard {...defaultArgs}>
      <p>...</p>
    </BoardCard> */}
  </Provider>
);
