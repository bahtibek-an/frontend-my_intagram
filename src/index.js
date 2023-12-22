import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./w3.css";
import "./style.css"
import "./bootstrap-5.css"
import { AuthContextProvider } from "./context/AuthContext";
import { PostContextProvider } from "./context/PostContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <PostContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PostContextProvider>
  </AuthContextProvider>
);
