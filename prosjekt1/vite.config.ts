/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/project1",
	plugins: [react()],
	server: {
		open: true,
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "src/test/setup.ts",
	},
});
