import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="min-w-[250px] min-h-[150px] font-semibold">
      <App />
    </div>
  </React.StrictMode>,
);
