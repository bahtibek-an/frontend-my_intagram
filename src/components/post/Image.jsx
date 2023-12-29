import React from "react";

const Image = ({ src, caption }) => {
    return (
        <img src={src} alt={caption} className="img-fluid mt-3" />
    );
};

export default Image;