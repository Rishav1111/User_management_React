import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    coverage: {
      provider: "istanbul", // use c8 for coverage
      reporter: ["text", "html"], // specify the reporters
      reportsDirectory: "./coverage", // specify the directory to output coverage reports
    },
  },
});
