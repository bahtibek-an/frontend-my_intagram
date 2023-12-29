import React from "react";
import "./style/loading.css";

const Loading = () => {
  return (
    <>
        <div className="loading-container d-flex justify-content-center align-items-center position-absolute">
            <div className="loading-box d-flex justify-content-center align-items-center position-absolute">
                <div className="loading-box1 d-flex justify-content-center align-items-center position-absolute"></div>
                <div className="loading-row position-absolute"></div>
            </div>
        </div>
    </>
  );
};

export default Loading;