import React from "react";
import "./components/style/style.css";
import { BrowserRouter } from "react-router-dom";
import useAuth from './hooks/useAuth';
import * as ROUTE from "./constants/routes";
import Layout from "./layouts/Layout.jsx";
import UserContext from "./context/user";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";
import IsUserLoggedIn from "./helpers/IsUserLoggedIn";
import EditUser from "./pages/UserPage/EditUser";
import Loading from "./layouts/Loading.jsx";

const Login = React.lazy(() => import ("./pages/Auth/Login"));
const SignUp = React.lazy(() => import ("./pages/Auth/SignUp"));
const Search = React.lazy(() => import("./components/pages/Search.jsx"));
const Create = React.lazy(() => import("./components/createPost/CreatePost.jsx"));
const HomePage = React.lazy(() => import ("./pages/HomePage/HomePage"));
const UserPage = React.lazy(() => import ("./pages/UserPage/UserPage"));
const ForgotPassword = React.lazy(() => import ("./pages/Auth/ForgotPassword"));

function App() {
  const { user } = useAuth();
  return (
    <>
      <main className="main">
        <UserContext.Provider value={{ user }}>
          <BrowserRouter>
            <React.Suspense fallback={(<Loading />)}>
              <Routes>
                <Route path={ROUTE.HOME} element={
                    <ProtectedRoute user={user}>
                      <Layout/>
                    </ProtectedRoute>
                  }>
                  <Route index element={<HomePage/>}/>
                  <Route path={ROUTE.PROFILE} element={<UserPage/>} />
                  <Route path={ROUTE.CREATE} element={<Create/>} />
                  <Route path={ROUTE.SEARCH} element={<Search/>} />
                  <Route path={ROUTE.EDIT_PROFILE} element={<EditUser/>} />
                </Route>
                <Route path={ROUTE.LOGIN} element={
                    <IsUserLoggedIn user={user}>
                      <Login/>
                    </IsUserLoggedIn>
                  }/>
                <Route path={ROUTE.FORGOTPASSWORD} element={
                    <IsUserLoggedIn user={user}>
                      <ForgotPassword/>
                    </IsUserLoggedIn>
                    }/>
                <Route path={ROUTE.SIGN_UP} element={
                    <IsUserLoggedIn>
                      <SignUp/>
                    </IsUserLoggedIn>
                  }/>
              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </UserContext.Provider>
      </main>
    </>
  );
}

export default App;
