import React from "react";
import { useNavigate } from "react-router-dom";

const ImageItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="imgs">
      <img
        src={data.image}
        alt=""
        onClick={() => navigate(`/PostAbout?id=${data.id}`)}
      />
    </div>
  );
};

export default ImageItem;
