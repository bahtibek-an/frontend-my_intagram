/** @format */

import React from "react";
import "../Likes/Comment.scss";
import "./SearchedUser.scss";
import { Link } from "react-router-dom";
const SearchedUser = ({ data }) => {
  console.log(data)
  return (
    <div className='sorch-modal'>
      {/* this is Search modal comment */}
      <div className='card'>
        {/* this is Search modal comment */}
        {data?.map((el) => (
          <>
            <div class='user-image-container-search'>
              <Link to={`/user/${el.id}`} style={{display:"flex", alignItems:"center", gap:"10px", cursor:"pointer"}}>
                <img class='card-header-img' src={el.userPhoto} alt='' />
                {/* this is Search modal comment */}
                <h3 style={{display:"flex"}}>{el.userName}</h3>
              </Link>
            </div>
          </>
        ))}
      </div>
      {/* this is Search modal comment */}
    </div>
  );
};

export default SearchedUser;
