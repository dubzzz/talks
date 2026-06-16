import { defineShikiSetup } from "@slidev/types";
//import darkPlus from "tm-themes/themes/dark-plus.json";
import darkPlus from "tm-themes/themes/github-dark-high-contrast.json";
import lightPlus from "tm-themes/themes/light-plus.json";

export default defineShikiSetup(() => {
  return {
    themes: {
      dark: darkPlus,
      light: lightPlus,
    },
    transformers: [
      // ...
    ],
  };
});
