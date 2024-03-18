import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./components/AuthContext";

import Profile from "./pages/ProfilePage/Profile";
import SearchUsers from "./pages/SearchUserPage/SearchUserPage";
import Signup from "./pages/SingupPage/Signup";
import Home from "./pages/HomePage/Home";
import NewPostForm from "./pages/NewPostFormPage/NewPostForm";
import ModifyProfile from "./pages/ModifyProfilePage/ModifyProfile";
import LoginForm from "./pages/LoginPage/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<Signup />} />
          <Route index path="/" element={<PrivateRoute><Home /> </PrivateRoute>} />
          <Route path="/addpost" element={<PrivateRoute><NewPostForm /></PrivateRoute>} />
          <Route path="/search-users" element={<PrivateRoute><SearchUsers /></PrivateRoute>} />
          <Route path="/:uid" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/edit" element={<PrivateRoute><ModifyProfile /></PrivateRoute>} />
          {/* <Route path="/user/:uid" element={<UserProfile />} /> */}
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
