import { useNavigate } from "react-router-dom";
import React, { useState, useEffect} from "react";
import { getAllUsers } from "../../services/firebase";

const SearchUser = ({ searchInput }) => {
    const portal = useNavigate();
    const [ users, setUsers ] = useState([]);
    const [ filteredItems, setFilteredItems ] = useState([]);
  
    const getUsers = async () => {
        const result = await getAllUsers();
        setUsers(result);
    };
  
    const searchUsers = () => {
        if(searchInput.trim()) {
            const filteredArray = users.filter(item =>
                item.username.toLowerCase().includes(searchInput.toLowerCase())
            );
  
            setFilteredItems(filteredArray);
        } else {
            setFilteredItems([]);
        }
    };
  
    useEffect(() => {
        getUsers();
    }, []);
  
    useEffect(() => {
        searchUsers();
    }, [searchInput]);
  return (
    <>
        <div className={!filteredItems.length && "search-profiles"}>
            {!filteredItems.length && (
                <>
                    <p className="text-center mt-5">User with this username doesn't exist</p>
                </>
            )}
            {filteredItems.map(profile => (
                <>
                    <div className="suggested-profile d-flex justify-content-around align-items-center mt-2">
                        <div key={profile.userId} className="d-flex justify-content-around align-items-center mt-1">
                            <div className="img">
                                <img style={{width: "80px", height: "80px"}} src={profile.avatarSrc} alt={profile.username} className="img-fluid rounded-circle" />
                            </div>
                            <div className="ms-2 mt-1">
                                <p>{profile.username} <br /> <span className="text-muted">{profile.fullName}</span></p>
                            </div>
                        </div>
                        <div className="follow">
                            <button onClick={() => portal(`/${profile.username}`)} className="btn btn-outline-primary">Profile</button>
                        </div>
                    </div>
                </>
            ))}
        </div>
    </>
  );
};

export default SearchUser;