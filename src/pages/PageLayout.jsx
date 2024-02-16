import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [user, loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== '/auth' && user;
  const canRenderNavbar = !user && !loading && pathname !== '/auth';

  const checkUserIsAuth = !user && loading;
  if (checkUserIsAuth) return <PageLayoutSpinner />;

  return (
    <div className="flex flex-col md:flex-row">
      {canRenderSidebar && (
        <div className="w-70px md:w-240px">
          <Sidebar />
        </div>
      )}
      {canRenderNavbar && <Navbar />}
      <div className="flex-1 w-full md:w-auto mx-auto">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="border-4 border-gray-200 h-12 w-12 rounded-full animate-spin"></div>
    </div>
  );
};
