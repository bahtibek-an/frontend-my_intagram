import FollowHP from "components/itemsHomePage/FollowHP";
import Post from "components/itemsHomePage/Post";
import Story from "components/itemsHomePage/Story";
import { useAuth } from "contexts/auth-context";
import React from "react";
import LandingPage from "./LandingPage";
import Sidebar from "components/itemsHomePage/Sidebar"
import FooterLanding from "components/itemsLandingPages/FooterLanding";
// import LandingPage from "./LandingPage";

const HomePage = () => {
  const { userInfo } = useAuth();
  if (!userInfo) return <LandingPage></LandingPage>;
  return (
    <div className="home-container">
      <Sidebar></Sidebar>
      <Story></Story>
      <div className="humm">
        <Post></Post>
        <FollowHP></FollowHP>
      </div>
      <FooterLanding/>
    </div>
  );
};


export default HomePage;
