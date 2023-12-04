import React from "react";
import "./styleLoading.css";

const LoadingPost = () => {
  return (
    <div className=" loader">
      <div className="wrapper">
        <div className="circle" />
        <div className="line-1" />
        <div className="line-2" />
        <div className="line-3" />
        <div className="line-4" />
        Loading...
      </div>
    </div>
  );
};

export default LoadingPost;
