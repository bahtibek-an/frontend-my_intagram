import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./Datebase/Auth";
import { Posts } from './Datebase/Posts';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Posts>
        <App />
      </Posts>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);