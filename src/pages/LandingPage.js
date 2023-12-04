import React from "react";
import HomePhone from "../components/itemsLandingPages/HomePhone";
import FormLogin from "../components/itemsLandingPages/FormLogin";
import FooterLanding from "components/itemsLandingPages/FooterLanding";
import { useAuth } from "contexts/auth-context";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const {userInfo} = useAuth();
  const navigate = useNavigate();
  
  if (userInfo) return navigate("/HomePage") 
  return (
    <>
    <div className="login-container">
      <HomePhone></HomePhone>
      <FormLogin></FormLogin>
    </div>
      <FooterLanding></FooterLanding>
      <p className="login-txt">Instagram clone by Shaxboz Shamsiddinov</p>
    </>
  );
};

export default LandingPage;
