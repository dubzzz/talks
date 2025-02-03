import type { NavOperations, ShortcutOptions } from "@slidev/types";
import { defineShortcutsSetup } from "@slidev/types";

export default defineShortcutsSetup(
  (nav: NavOperations, sourceOptions: ShortcutOptions[]) => {
    const mergedOptions = sourceOptions.map((option) =>
      option.name?.includes("next")
        ? { ...option, fn: () => nav.next() }
        : { ...option, fn: () => nav.prev() }
    );
    console.log(mergedOptions);
    return mergedOptions;
  }
);
