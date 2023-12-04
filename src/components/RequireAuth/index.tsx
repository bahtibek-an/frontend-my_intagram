import { authSelector } from 'features/auth';
import { useAppSelector } from 'hooks';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth: React.FC = ({ children }) => {
   const { isLogin } = useAppSelector(authSelector);
   let location = useLocation();
   if (!isLogin) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   return <>{children}</>;
};

export default RequireAuth;
