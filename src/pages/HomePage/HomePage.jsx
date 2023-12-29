import React from "react";
import useUser from "../../hooks/useUser";

const Timeline = React.lazy(() => import("../../components/Timeline"));
const User = React.lazy(() => import("../../components/Sidebar/User"));
const Sidebar = React.lazy(() => import("../../components/Sidebar/index"));

const HomePage = () => {
  const { user: { fullName, username, avatarSrc } } = useUser();

  return (
    <div className="home d-flex justify-content-around">
      <Timeline />
        <div className="profiles card m-2">
          <User username={username} fullName={fullName} avatarSrc={avatarSrc}/>
          <hr />
          <p className="ms-4">Suggested for you</p>
          <div className="sugest-post">
            <Sidebar />
          </div>
          <p className="mt-3 ms-4 mb-4">© 2023 build by <span className="text-primary"><a href="http://www.instagram.com/alone_martyn?igshid=OGQ5ZDc2ODk2ZA==" target="_blank" rel="noopener noreferrer">T.Oqilbek</a></span></p>
        </div>
    </div>
  );
};

export default HomePage;