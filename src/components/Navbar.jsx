import React, { useState, useContext, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../Database/firebase";
import { AuthContext } from "../context/AuthContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const performSearch = async () => {
    if (!currentUser || !searchQuery) {
      setSearchResults([]);
      setShowSearchModal(false);
      return;
    }

    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("displayName", "==", searchQuery));

    try {
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        results.push(user);
      });

      setSearchResults(results);
      setShowSearchModal(true);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  useEffect(() => {
    performSearch();
  }, [searchQuery, currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light position-sticky fixed-top shadow">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <i><b><svg aria-label="Instagram" className="_ab6-" color="rgb(0, 0, 0)" fill="rgb(245, 245, 245)" height="29" role="img" viewBox="32 4 113 32" width="103"> {/* ... SVG Path ... */}</svg></b></i>
        </a>
        <form className="d-flex w-25">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by username"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", borderRadius: "5px 5px 0px 0px" }}
          />
          {showSearchModal && <SearchResults results={searchResults} />}
        </form>

        <div className="d-flex justify-content-end" id="navbarTogglerDemo03">
          {/* ... Navbar Links ... */}
        </div>
      </div>
    </nav>
  );
};

const SearchResults = ({ results }) => (
  <div className="search-results">
    <p style={{ margin: "13px" }}>Search Results</p>
    <ul>
      {results.map((result) => (
        <li key={result.id}>
          <Link to={`/profile/${result.uid}`}>{result.displayName}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Navbar;
