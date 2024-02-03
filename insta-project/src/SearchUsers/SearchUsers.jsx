import React, { useState, useEffect, useContext } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "@firebase/firestore";
import { db } from "../Datebase/Datebase";
import { AuthContext } from '../Datebase/Auth';
import Sidebar from "../Sidebar/Sidebar"

const SearchUsers = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { currentUser } = useContext(AuthContext);

    const performSearch = async () => {
        if (!currentUser || !searchQuery) {
            setSearchResults([]);
            return;
        }

        try {
            const usersCollection = collection(db, "Users");
            const querySnapshot = await getDocs(query(usersCollection, orderBy("displayName"), limit(10)));
            const results = [];

            querySnapshot.forEach((doc) => {
                const user = doc.data();

                if (user && user.uid !== currentUser.uid) {
                    const displayNameLower = user.displayName ? user.displayName.toLowerCase() : "";
                    const searchQueryLower = searchQuery.toLowerCase();

                    if (displayNameLower.includes(searchQueryLower)) {
                        results.push(user);
                    }
                }
            });

            setSearchResults(results);
        } catch (error) {
            console.error("Error performing search:", error);
        }
    };

    useEffect(() => {
        performSearch();
    }, [searchQuery, currentUser]);

    return (
        <>
            <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
                    <div className="mx-auto my-4 overflow-hidden bg-white border border-gray-300 rounded-md shadow-lg w-96">
                        <div className="p-4">
                            <div className="flex items-center">
                                <SearchIcon className="w-6 h-6 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search users"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 ml-2 border-none focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="p-4">
                            {searchResults.length === 0 ? (
                                <p className="text-gray-500">No results found</p>
                            ) : (
                                <ul className="space-y-2">
                                    {searchResults.map((user) => (
                                        <li key={user.uid} className="flex items-center">
                                            <img
                                                src={user.photoURL}
                                                alt={`${user.name} avatar`}
                                                className="w-8 h-8 mr-2 rounded-full"
                                            />
                                            <Link to={`/user/${user.uid}`} className="font-semibold">{user.displayName}</Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchUsers;
