import Header from 'components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
   return (
      <>
         <Header />
         <div className=" mt-[calc(var(--header-height))] flex ">
            <div className="container-app">
               <Outlet />
            </div>
         </div>
      </>
   );
};

export default Layout;
