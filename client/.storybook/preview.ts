import type { Preview } from "@storybook/react";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import "tailwindcss/tailwind.css";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
