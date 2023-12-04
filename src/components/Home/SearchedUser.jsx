/** @format */

import React from "react";
import '../Likes/Comment.scss'
import "./SearchedUser.scss";
const SearchedUser = ({ data }) => {
  // console.log(data);
  return (
    <div className='search-modal'>
      <div className='card'>
        {data?.map((el) => (
          <>
            <div class='header-img-container '>
              <img class='card-header-img' src={el.userPhoto} alt='' />
              <h3>{el.userName}</h3>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SearchedUser;
