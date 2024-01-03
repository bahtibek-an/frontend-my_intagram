import React from "react";
import Button from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/contexts/AuthContext";
import { follow } from "@/firebase/follow";
import { UserData } from "@/types";

const FollowButton = ({ userId }: { userId: string }) => {
  const { userData, setUserData } = useAuthContext();
  const { isLoading, mutate } = useMutation({
    mutationKey: ["follow"],
    mutationFn: () =>
      follow({ followedId: userId, followerId: userData?.userId || "" }),
    onSuccess: () =>
      setUserData({
        ...userData,
        following: [...(userData?.following || [""]), userId],
      } as UserData),
  });
  return (
    <Button
      className="font-extrabold px-5 text-sm bg-blue hover:bg-sky-500 active:opacity-60 text-white disabled:opacity-60"
      onClick={() => mutate()}
      disabled={isLoading}
    >
      Follow
    </Button>
  );
};

export default FollowButton;
