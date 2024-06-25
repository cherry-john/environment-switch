import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="h-full mb-4">
      <App />
      <p className="fixed bottom-1 right-1">Icons from svgrepo.com</p>
    </div>
  </React.StrictMode>,
);
