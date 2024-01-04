/** @format */

import React, { useEffect, useState } from "react";
import "./Header.scss";
import TelegramIcon from "@mui/icons-material/Telegram";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/extraReducer";
import SearchedUser from "../Home/SearchedUser";
const Header = ({ user, setModalState, modalState}) => {
  const { users } = useSelector((state) => state.posts);
  const [filteredData, setFilteredData] = useState(users);
  const [searchTerm, setSearchTerm] = useState(null);
  var dispatch = useDispatch();
  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Filter the data based on the search term
    const filteredResults = users?.filter((item) =>
      item.userName.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const localUser = JSON.parse(localStorage.getItem("currentUser"))
  const theUser = users?.find((el) => el.userEmail  == localUser?.email);
  console.log(theUser)
  return (
    <>
      <header class='grid this-head'>
        <div class='conta-flex header-container'>
          <span class='logo logo-nav headoItem'>Instagram</span>

          <div class='headoItem bartheSearch '>
            <label for='bartheSearch '>
              <div class='conta-flex position-relative'>
                <div class='conta-searchicon'>
                  <svg
                    class='search-nav-icon'
                    viewBox='0 0 512 512'
                    width='100'
                    title='search'>
                    <path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z' />
                  </svg>
                </div>

                <input
                  id='bartheSearch'
                  type='text'
                  class='bartheSearch-input'
                  placeholder='Search...'
                  onChange={handleInputChange}
                />
                {searchTerm ? <SearchedUser data={filteredData} /> : null}
              </div>
            </label>
          </div>
          <nav class='headoItem main-nav'>
            <ul class='navbar conta-flex'>
              <li class='theitemnavbar'>
                <a href='/home'>
                  <TelegramIcon sx={{ fontSize: 30 }} />
                </a>
              </li>
              <li
                class='theitemnavbar'
                onClick={() => setModalState(!modalState)}>
                <AddBoxIcon sx={{ fontSize: 30 }} />
              </li>
              <li class='theitemnavbar'>
                <a href='/home'>
                  <FavoriteIcon sx={{ fontSize: 30 }} />
                </a>
              </li>
              <li class='theitemnavbar no-hover'>
                <a href='/profile'>
                  <img src={theUser?.userPhoto} alt='' />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
