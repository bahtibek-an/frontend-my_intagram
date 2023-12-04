import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import User from "./components/User/User";
import UserProfile from "./components/UserProfile/UserProfile"; // New component for user profile
import { useState } from "react";
import { auth } from "./Api/firebase";

function App() {
  const [user, setUser] = useState();
  auth.onAuthStateChanged((user) => setUser(user));

  return (
    <>
      <Routes>
        <Route path='/' element={!user ? <Login /> : <Home user={user} />} />
        <Route
          path='/sign-in'
          element={user ? <a href="/home">Back to Home Page</a> : <Register />}
        />
        <Route path='/home' element={user ? <Home user={user} /> : null} />
        <Route
          path='/profile'
          element={
            user ? (
              <User user={user} />
            ) : (
              <a href="/">Back to Login page</a>
            )
          }
        />
        <Route
          path='/:username'
          element={user ? <UserProfile user={user} /> : null}
        />
      </Routes>
    </>
  );
}

export default App;
