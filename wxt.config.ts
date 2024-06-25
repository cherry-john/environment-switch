import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  manifest: {
    name: "Environment Switcher",
    short_name: "Env Switch",
    permissions: ["storage", "activeTab"],
    browser_specific_settings: {
      gecko: {
        id: "extension@environment-switcher.xyz",
      },
    },
  },
});
