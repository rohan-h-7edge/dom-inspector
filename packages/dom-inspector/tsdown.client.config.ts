import { defineConfig } from "tsdown";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";
import fs from "fs";
import path from "path";

export default defineConfig({
  entry: ["client/inspector.tsx", "client/sidebar.tsx"],
  format: ["esm"],
  outDir: "client/dist",
  clean: true,
  dts: false,
  external: [], // Don't externalize anything
  noExternal: [/@mcpc-tech\/cmcp/, /.*/], // Bundle everything including @mcpc-tech/cmcp
  platform: "browser",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  minify: true,
  treeshake: true,
  plugins: [
    {
      name: "path-alias-resolver",
      resolveId(id, _importer) {
        // Resolve client/lib/utils to actual path
        if (id === "client/lib/utils") {
          return path.resolve(process.cwd(), "client/lib/utils.ts");
        }
        // Resolve client/components/ui/* to actual paths (without .tsx extension in import)
        if (id.startsWith("client/components/ui/")) {
          const componentName = id.split("/").pop(); // Get last part (e.g., "card")
          return path.resolve(process.cwd(), `client/components/ui/${componentName}.tsx`);
        }
        return null;
      },
    },
    {
      name: "asset-inline-handler",
      resolveId(id, _importer) {
        // Handle ?raw (SVG) and ?png imports
        const match = id.match(/\?(raw|png)$/);
        if (!match) return null;

        const suffix = match[0];
        const cleanId = id.replace(suffix, "");
        const importerDir = _importer
          ? path.dirname(_importer.replace(/\?.*$/, ""))
          : process.cwd();
        const resolved = path.resolve(importerDir, cleanId);
        return {
          id: resolved + suffix,
          moduleSideEffects: false,
        };
      },
      load(id) {
        if (id.endsWith("?raw")) {
          const content = fs.readFileSync(id.replace("?raw", ""), "utf-8");
          return `export default ${JSON.stringify(content)}`;
        }
        if (id.endsWith("?png")) {
          const content = fs.readFileSync(id.replace("?png", ""));
          return `export default "data:image/png;base64,${content.toString("base64")}"`;
        }
        return null;
      },
    },
    {
      name: "asset-handler",
      resolveId(id) {
        // Handle binary assets (fonts, images, etc.) - externalize
        if (/\.(ttf|woff|woff2|eot|otf|png|jpg|jpeg|gif)$/.test(id)) {
          return { id, external: true };
        }
        return null;
      },
    },
    {
      name: "css-handler",
      resolveId(id, importer) {
        if (!id.endsWith(".css")) return null;

        // The app-wide entry stylesheet keeps its dedicated Tailwind pipeline.
        if (id.endsWith("styles.css")) {
          return "\0virtual:styles";
        }

        // Scope the plain-postcss fallback to CSS imported from our own
        // vendored sources (client/vendor/visbug's per-component stylesheets).
        // Anything else (e.g. a dependency like streamdown importing katex's
        // CSS via its own resolution) is left to default handling, unchanged
        // from before this plugin existed.
        if (!importer || !importer.includes(`${path.sep}vendor${path.sep}visbug${path.sep}`)) {
          return null;
        }

        const resolved = path.isAbsolute(id) ? id : path.resolve(path.dirname(importer), id);
        // Encode the real path so the virtual id does NOT end in ".css" --
        // rolldown appears to auto-extract any module whose id ends in
        // ".css" into its own standalone CSS-asset output chunk (the normal,
        // sensible thing to do for a real stylesheet asset), which silently
        // disconnects it from the JS import graph entirely: the module
        // never actually lands inside inspector.js, so `export default
        // "<css text>"` never reaches the `VisBugStyles`/etc. constants that
        // read it. Base64-encoding it avoids that path-suffix sniffing.
        return `\0virtual-css-module:${Buffer.from(resolved, "utf-8").toString("base64")}`;
      },
      async load(id) {
        if (id === "\0virtual:styles") {
          const cssInput = fs.readFileSync("client/styles.css", "utf-8");

          const clientDir = path.resolve(process.cwd(), "client");
          const result = await postcss([
            tailwindcss({
              base: clientDir,
              optimize: {
                minify: false,
              },
            }),
          ]).process(cssInput, {
            from: path.join(clientDir, "styles.css"),
            to: undefined,
          });

          // Ensure dist directory exists for reference file
          if (!fs.existsSync("client/dist")) {
            fs.mkdirSync("client/dist", {
              recursive: true,
            });
          }

          // Write the processed CSS files for reference
          fs.writeFileSync("client/dist/inspector.css", result.css);
          fs.writeFileSync("client/dist/sidebar.css", result.css);

          // Return the processed CSS as a default export
          return `export default ${JSON.stringify(result.css)}`;
        }

        if (id.startsWith("\0virtual-css-module:")) {
          const realPath = Buffer.from(
            id.slice("\0virtual-css-module:".length),
            "base64",
          ).toString("utf-8");
          const cssInput = fs.readFileSync(realPath, "utf-8");
          // VisBug's CSS uses `@import` (including bare npm specifiers like
          // `open-props/...`) and native CSS nesting (e.g.
          // `:not(...)&:hover`, `&` not in leading position). Its upstream
          // build flattens both at build time via postcss-import/
          // postcss-nested; relying on the browser's native parser for
          // either breaks silently — `@import` resolves against the page's
          // URL (not this file's real directory) and 404s, and this exact
          // non-leading-`&` nesting form isn't reliably parsed natively,
          // which was observed to blow up layout-critical rules (e.g. the
          // toolbar host rendering full-page-sized instead of a small
          // floating icon strip).
          const result = await postcss([postcssImport(), postcssNested()]).process(cssInput, {
            from: realPath,
            to: undefined,
          });
          return `export default ${JSON.stringify(result.css)}`;
        }

        return null;
      },
    },
  ],
});
