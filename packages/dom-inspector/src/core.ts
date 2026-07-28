import { createDomInspectorPlugin, type DomInspectorOptions } from "./utils/create-plugin";
import { detectFileType } from "./utils/file-type-detector";
import { transformJSX } from "./compiler/jsx-transform";
import { compileVue } from "./compiler/vue-transform";
import { compileSvelte } from "./compiler/svelte-transform";

export type { DomInspectorOptions };

export const unplugin = createDomInspectorPlugin("unplugin-dom-inspector", () => {
  return async (code, id) => {
    if (!id || id.includes("node_modules")) return null;

    const fileType = detectFileType(id);
    if (!fileType) return null;

    try {
      switch (fileType) {
        case "jsx":
          return transformJSX({ code, id });
        case "vue":
          return compileVue({ code, id });
        case "svelte":
          return compileSvelte({ code, id });
        default:
          return null;
      }
    } catch (error) {
      console.error(`[dom-inspector] Failed to transform ${id}:`, error);
      return null;
    }
  };
});
