import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import trTR from "antd/locale/tr_TR";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider locale={trTR}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
