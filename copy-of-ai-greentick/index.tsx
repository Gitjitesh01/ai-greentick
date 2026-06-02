import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const container = document.getElementById("root");
if (container) {
  try {
    const root = createRoot(container);
    root.render(<App />);
  } catch (error) {
    console.error("Failed to mount application:", error);
    container.innerHTML = '<div style="color:red; padding:20px;">Error loading application. Check console for details.</div>';
  }
} else {
  console.error("Root element not found");
}