import React from "react";
import { Link } from "react-router-dom"; // Add this import
import '../Likes/Comment.scss'
import "./SearchedUser.scss";

const SearchedUser = ({ data }) => {
  return (
    <div className='search-modal'>
      <div className='card'>
        {data?.map((el) => (
          <div key={el.id} className='header-img-container'>
            <img className='card-header-img' src={el.userPhoto} alt='' />
            <Link to={`/${el.userName}`}>{el.userName}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchedUser;
