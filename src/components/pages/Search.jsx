import React, { useState } from "react";

const SearchUser = React.lazy(() => import("./SearchUser"));

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="container w-100 h-100">
      <div className="profile p-4">
        <h3>Search users</h3>
        <form className="d-flex mt-3 justify-content-between align-items-center">
          <div class="form-floating mb-3 w-75 mt-3">
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" class="form-control bg-transparent text-light" id="searchUsername" placeholder="alone_martyn" required />
            <label for="searchUsername">Username</label>
          </div>
          <button className="btn btn-outline-primary w-25 m-3" style={{height: "70px"}} type="submit">Search</button>
        </form>
      </div>  
      <SearchUser searchInput={search} />
    </div>
  );
};

export default Search;