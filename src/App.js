/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
// this is comment too
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
// this is comment too
import User from "./components/User/User";
import { useState } from "react";
import { auth } from "./Api/firebase";
import UserProfile from "./components/UserProfile/UserProfile";
// this is comment too

function App() {
  const [user, setUser] = useState();
  auth.onAuthStateChanged((user) => {
    setUser(user)
    localStorage.setItem("currentUser", JSON.stringify(user));
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={!currentUser ? <Login /> : <Home user={user} />}
        />
        {/* this is comment for app */}
        <Route
          path='/sign-in'
          element={
            currentUser ? <a href='/home'>Back to Home Page</a> : <Register />
          }
        />
        {/* this is comment for app */}
        <Route
          path='/home'
          element={currentUser ? <Home user={user} /> : null}
        />
        <Route
          path='/profile'
          // this is comment for app
          element={
            currentUser ? (
              <User user={user} />
            ) : (
              <a href='/'>Back to Login page</a>
            )
          }
        />
        <Route
          path='/user/:id'
          element={currentUser ? <UserProfile user={user}/> : null}
        />
      </Routes>
    </>
  );
}

export default App;
// this is comment for app
