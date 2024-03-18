import React, { useState, useEffect, useContext } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "@firebase/firestore"; 
import { db } from "../../firebase/firebase"; 
import { AuthContext } from "../../components/AuthContext";
import Sidebar from "../SidebarComponent/Sidebar";
import { Input, Stack, Text, Button } from "@chakra-ui/react";

const SearchUsers = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const performSearch = async () => {
    if (!currentUser || !searchInput) {
      setSearchResults([]);
      return;
    }

    try {
      const usersCollection = collection(db, "Users");
      const q = query(usersCollection, orderBy("displayName"), limit(10));
      const querySnapshot = await getDocs(q);
      const results = [];

      querySnapshot.forEach((doc) => {
        const user = doc.data();

        if (user && user.uid !== currentUser.uid) {
          const displayNameLower = user.displayName
            ? user.displayName.toLowerCase()
            : "";
          const searchInputLower = searchInput.toLowerCase();

          if (displayNameLower.includes(searchInputLower)) {
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
  }, [searchInput, currentUser]);

  const handleSearch = () => {
    performSearch();
  };

  return (
    <Stack minHeight="100vh" spacing={0} direction="row" alignItems="stretch">
      <Sidebar />

      <Stack flexGrow={1} bg="gray.700" color={"white"}>
        <Stack
          bg="gray.800"
          width="96"
          mx="auto"
          my="4"
          borderRadius="md"
          boxShadow="md"
          p="4"
        >
          <Stack direction="row" alignItems="center">
            <SearchIcon color="gray.500" />
            <Input
              type="text"
              placeholder="Search users"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              flex="1"
              ml="2"
              borderWidth="1"
              borderColor={"gray.500"}
              _focus={{ outline: "none" }}
            />
            <Button
              bgColor={"gray.600"}
              color={"white"}
              rounded="full"
              _hover={{ bg: "gray.700" }}
              flexShrink="0"
              ml="2"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Stack>

          <Stack p="4" alignItems="stretch">
            {searchResults.length === 0 ? (
              <Text color="gray.500"></Text>
            ) : (
              <Stack alignItems="flex-start" spacing={2}>
                {searchResults.map((user) => (
                  <Link
                    key={user.uid}
                    to={`/user/${user.uid}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      textDecoration: "none",
                      padding: "8px",
                      borderRadius: "4px",
                      backgroundColor: "#f3f4f6",
                    }}
                  >
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt={`${user.name} avatar`}
                        width="40px"
                        height="40px"
                        style={{ borderRadius: "50%", marginRight: "8px" }}
                      />
                    )}
                    <Text fontWeight="semibold">
                      {user.displayName || "Unknown"}
                    </Text>
                  </Link>
                ))}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SearchUsers;
