import Layout from 'components/Layout';
import RequireAuth from 'components/RequireAuth';
import { ROUTES } from 'constant';
import { ForgetPassword, Login, Register } from 'pages/Auth';
import Chat from 'pages/Chat';
import Home from 'pages/Home';
import Posts from 'pages/Post';
import Profile from 'pages/Profile';
import Setting from 'pages/Setting';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
   return (
      <div className="App">
         <ToastContainer />
         <Routes>
            <Route
               path={ROUTES.home}
               element={
                  <RequireAuth>
                     <Layout />
                  </RequireAuth>
               }
            >
               <Route index element={<Home />} />
               <Route path={ROUTES.profile} element={<Profile />} />
               <Route path={ROUTES.chat} element={<Chat />}>
                  <Route path={ROUTES.conversation} element={<Chat />} />
               </Route>
               <Route path={ROUTES.setting} element={<Setting />} />
               <Route path={ROUTES.post} element={<Posts />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path={ROUTES.forgetPassword} element={<ForgetPassword />} />
         </Routes>
      </div>
   );
}

export default App;
