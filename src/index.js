import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./AuthContext";
import { PostContextProvider } from "./PostContext";

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