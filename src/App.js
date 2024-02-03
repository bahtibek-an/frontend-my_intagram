import React from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Main from "./Main/Main";
import UploadPost from "./UploadPost/UploadPost";
import SearchUsers from "./SearchUsers/SearchUsers";
import Profile from "./Profile/Profile";
import EditPage from "./EditPage/EditPage";
import IsCurrentUser from "./Datebase/IsCurrentUser";
import ViewUsers from './ViewUsers/ViewUsers';
import { AuthContext } from "./Datebase/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route index path="/" element={<IsCurrentUser>
            <Main />
          </IsCurrentUser>} />
          <Route path="/addpost" element={<IsCurrentUser>
            <UploadPost />
          </IsCurrentUser>} />
          <Route path="/search-users" element={<IsCurrentUser>
            <SearchUsers />
          </IsCurrentUser>} />
          <Route path="/profile" element={<IsCurrentUser>
            <Profile />
          </IsCurrentUser>} />
          <Route path="/edit" element={<IsCurrentUser>
              <EditPage setCurrentUser={AuthContext}/>
            </IsCurrentUser>} />
          <Route path="/user/:uid" element={<IsCurrentUser>
            <ViewUsers />
          </IsCurrentUser>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
