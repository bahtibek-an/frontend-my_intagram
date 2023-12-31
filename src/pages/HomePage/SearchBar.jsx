/** @format */

import React from "react";
import "./SearchBar.scss";
const SearchBar = ({ data }) => {
  console.log(data);
  return (
    <div className='sorch-modal'>
      {/* this is Search modal comment */}
      <div className='card'>
        {/* this is Search modal comment */}
        {data?.map((el) => (
          <>
            <a href={`/profile/${el.id}`}>
              <div class='user-image-container-search'>
                <img class='card-header-img' src={el.userPhoto} alt='' />
                {/* this is Search modal comment */}
                <h3>{el.userName}</h3>
              </div>
            </a>
          </>
        ))}
      </div>
      {/* this is Search modal comment */}
    </div>
  );
};

export default SearchBar;
