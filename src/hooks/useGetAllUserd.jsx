import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import useShowToast from "./useShowToast";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../config/firebase.config";

const useGetAllUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const authUser = useAuthStore((state) => state.user);
  const showToast = useShowToast();

  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, "users");
        const querySnapshot = await getDocs(usersRef);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setAllUsers(users);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    if (authUser) getAllUsers();
  }, [authUser, showToast]);

  return { isLoading, allUsers };
};

export default useGetAllUsers;
