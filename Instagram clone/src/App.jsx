import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import Sidebar from "./components/Sidebar/Sidebar";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
	const [authUser] = useAuthState(auth);

  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <PageLayout><HomePage /></PageLayout>: <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={!authUser ? <AuthPage /> : <Navigate to="/" />}
      />
      <Route
        path="/:username"
        element={
          <PageLayout>
            <ProfilePage />
          </PageLayout>
        }
      />
      <Route element={<Sidebar />} />
    </Routes>
  );
}

export default App;

<Route element={<Sidebar />} />
