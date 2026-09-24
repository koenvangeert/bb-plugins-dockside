import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@bb\/plugin-sdk\/app$/, replacement: "@get-bb/plugin-sdk/app" },
      { find: /^@bb\/plugin-sdk$/, replacement: "@get-bb/plugin-sdk" },
      { find: /^@\//, replacement: fileURLToPath(new URL("./", import.meta.url)) },
    ],
  },
  test: {
    include: ["test/**/*.test.tsx"],
  },
});
