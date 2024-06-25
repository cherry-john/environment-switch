import "./style.css";
import ReactDom from "react-dom/client";
import App from "./App";

export default defineContentScript({
  matches: ["<all_urls>"],
  runAt: "document_start",
  cssInjectionMode: "ui",
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "environment-switch-page-overlay",
      position: "overlay",
      onMount: (container) => {
        const app = document.createElement("div");
        container.insertBefore(app, container.firstChild);

        const root = ReactDom.createRoot(app);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        // Unmount the root when the UI is removed
        root?.unmount();
      },
    });

    ui.mount();
  },
});
