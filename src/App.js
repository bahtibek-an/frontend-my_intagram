/** @format */

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from './pages/HomePage/HomePage'
import SignUp from './Auth/Sign/SignUp'
import { auth } from "./comonents/redux/api";
import Profile from './pages/Profile/Profile'
import UserProfile from "./pages/UserProfile/UserProfile";
import Home from "./Auth/Login/Home";
import { useState } from "react";

function App() {
  const [user, setUser] = useState();
  let currUser = JSON.parse(localStorage.getItem("currUser"));
  auth.onAuthStateChanged((el) => {
    setUser(el);
    if (!currUser) {
      localStorage.setItem("currUser", JSON.stringify(el));
    }
  });
  console.log(currUser);
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={currUser ? <Homepage user={user} /> : <Home />}
        />
        <Route
          path='/sign-up'
          element={currUser ? <Homepage user={user} /> : <SignUp />}
        />
        <Route
          path='/homepage'
          element={currUser ? <Homepage user={user} /> : <Home />}
        />
        <Route
          path='/profile'
          element={currUser ? <Profile user={user} /> : <Home />}
        />
             <Route
          path='/profile/:id'
          element={currUser ? <UserProfile user={user} /> : <Home />}
        />
      </Routes>
    </>
  );
}

export default App;
