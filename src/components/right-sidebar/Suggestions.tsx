import { useAuthContext } from "@/contexts/AuthContext";
import { follow } from "@/firebase/follow";
import followSuggestions from "@/firebase/followSuggestions";
import { UserData } from "@/types";
import { Avatar } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
const Suggestions = () => {
  const { userData, setUserData } = useAuthContext();
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (userData) {
        const suggestions = await followSuggestions(userData);
        setUsers(suggestions);
      }
    };

    fetchSuggestions();
  }, [userData?.following]);
  const { isLoading, mutate } = useMutation({
    mutationKey: ["follow"],
    mutationFn: (userId: string) =>
      follow({ followedId: userId, followerId: userData?.userId || "" }),
    onSuccess: (data, userId) =>
      setUserData({
        ...userData,
        following: [...(userData?.following || [""]), userId],
      } as UserData),
  });
  return (
    users.length > 0 && (
      <div>
        <div className="flex justify-betwee0 mt-6">
          <span className="text-sm text-[#A8A8A8] font-medium">
            Suggested for you
          </span>
        </div>
        <ul className="flex flex-col gap-4 mt-4">
          {users.map((user) => (
            <div
              key={user.userId}
              className="flex items-center justify-between"
            >
              <div className="flex gap-3 items-center">
                <Link href={`/${user?.userName}`}>
                  <Avatar
                    className="w-[48px] h-[48px]"
                    src={user?.profileImage}
                  />
                </Link>
                <div className="flex flex-col">
                  <Link className="font-semibold" href={`/${user?.userName}`}>
                    {user?.userName}
                  </Link>
                  <span className="text-gray-600">{user?.fullName}</span>
                </div>
              </div>
              <button
                className="text-sm text-blue hover:opacity-60 font-semibold"
                disabled={isLoading}
                onClick={() => mutate(user.userId)}
              >
                Follow
              </button>
            </div>
          ))}
        </ul>
      </div>
    )
  );
};

export default Suggestions;
