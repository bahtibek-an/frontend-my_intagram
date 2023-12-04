import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React from "react";
import { RxExit } from "react-icons/rx"

const SignOut = () => {
  return (
    <div
      onClick={() => signOut(auth)}
      className="sidebar-icon "
    >
      <i className="out-icon"><RxExit/></i>
      <p className="out-txt">Sign out</p>
    </div>
  );
};

export default SignOut;
