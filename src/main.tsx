import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./store.ts";
import { Provider } from "react-redux";

// ...

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <Router> */}
        <Toaster richColors  position="top-right"  />
        <App />
      {/* </Router> */}
    </Provider>
  </StrictMode>
);
