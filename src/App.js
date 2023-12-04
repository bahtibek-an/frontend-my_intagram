import "./App.css";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FormSignUp from "components/itemsLandingPages/FormSignUp";
import HomePage from "pages/HomePage";
import Testj from "components/Testj";
import { AuthProvider } from "contexts/auth-context";
import PostDetail from "components/addPost/PostDetail";
import PersonalPage from "pages/PersonalPage";
import FormLogin from "components/itemsLandingPages/FormLogin";
import EditUser from "components/user/EditUser";

function App() {
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage></LandingPage>} />
        <Route path="/signup" element={<FormSignUp></FormSignUp>}></Route>
        <Route path="/signIn" element= {<FormLogin></FormLogin>}></Route>
        <Route path="/HomePage" element={<HomePage></HomePage>}></Route>
        <Route path="/concec" element={<Testj></Testj>}></Route>
        <Route path="/PostAbout" element={<PostDetail></PostDetail>}></Route>
        <Route path="/Personal" element={<PersonalPage></PersonalPage>}></Route>
        <Route path="/Personal/EditUser" element={<EditUser></EditUser>}></Route>

      </Routes>
    </AuthProvider>
  );
}

export default App;
