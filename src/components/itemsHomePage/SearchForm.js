import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { debounce } from "lodash";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai"

const SearchForm = () => {
  const { control } = useForm({
    mode: "onChange",
  });

  const [showSearchForm, setShowSearchForm] = useState(false);
  const handleButtonClick = () => {
    setShowSearchForm(true);
  };

  const formRef = useRef(null);
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (
        showSearchForm &&
        formRef.current &&
        !formRef.current.contains(event.target)
      ) {
        setShowSearchForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideModal);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [showSearchForm]);

  const [filter, setFilter] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "users");
    const newRef = query(
      colRef,
      where("username", ">=", filter),
      where("username", "<=", filter + "\uf8ff")
    );
    onSnapshot(newRef, (snapshot) => {
      const results = [];
      snapshot.forEach((item) => {
        results.push({
          id: item.id,
          ...item.data(),
        });
      });
      setSearchUser(results);
    });
  }, [filter]);
  const handleInputFilter = debounce((e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
  }, 500);
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={handleButtonClick}
        className="sidebar-icon flex items-center px-5 mt-2 rounded-lg ss:px-5 sm:py-1 sm:my-3 hover:cursor-pointer lg:pr-20 hover:bg-slate-200"
      >
        <i className="text-3xl bx bx-search-alt"><AiOutlineSearch/></i>
        <p className="hidden ml-3 text-base lg:block">Search</p>
      </div>
      {showSearchForm && (
        <div className="fixed pt-10 top-0 left-0 flex items-start justify-center w-full h-full bg-[rgba(0,0,0,0.5)] z-99">
          <form
            ref={formRef}
            className="search-con w-full px-5 py-5 mx-2 bg-white h-3/4 sm:w-1/2 lg:w-4/12 rounded-2xl"
          >
            <h2 className="w-full h-auto border-b-black">Search</h2>
            <div className="flex flex-col ">
              <input
                onChange={handleInputFilter}
                control={control}
                type="text"
                name="search"
                placeholder="  search"
                className="border  border-black rounded-lg outline-sky-600"
              ></input>
            </div>
            <div className="w-full h-full max-h-[400px] ">
              {searchUser.map((item) => (
                <div key={item.id} className="px-2 mt-5">
                  <div
                    onClick={() =>
                      navigate(`/Personal?userName=${item.username}`)
                    }
                    className="search-con-it flex flex-wrap items-center mb-4 cursor-pointer"
                  >
                    <img
                      src={
                        item.avatar ||
                        "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
                      }
                      alt=""
                      className="object-cover w-10 h-10 border border-gray-400 rounded-full"
                    />
                    {item.status === 2 ? (
                      <p className="flex items-center px-2 text-sm font-semibold">
                        {item?.username || item.fullname}{" "}
                        <i className="text-blue-500 bx bxs-brightness"></i>{" "}
                      </p>
                    ) : (
                      <p className="px-2 text-sm font-medium">
                        {item?.username || item.fullname}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchForm;
