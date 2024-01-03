import React from "react";
import More from "@/assets/icons/More.svg";
import Button from "../ui/Button";
import Link from "next/link";
import FollowButton from "../FollowButton";
import isFollowing from "@/utils/isFollowing";
import { useAuthContext } from "@/contexts/AuthContext";
const ProfileButtons = ({
  isPersonal,
  userId,
}: {
  isPersonal: boolean;
  userId: string;
}) => {
  const { userData } = useAuthContext();
  console.log(userId, "hehe", userData?.following);
  return !isPersonal ? (
    <div className="flex items-center gap-2">
      {isFollowing({ followers: userData?.following || [""], userId }) ? (
        <Button className="font-extrabold px-4 text-sm">Following</Button>
      ) : (
        <FollowButton userId={userId} />
      )}
      <Button className="font-extrabold px-4 text-sm">Message</Button>
      <More className="cursor-pointer" />
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Link href="/edit">
        <Button className="font-extrabold px-4 text-sm">Edit profile</Button>
      </Link>
      <Link href="/archive/stories">
        <Button className="font-extrabold px-4 text-sm">View archive</Button>
      </Link>
    </div>
  );
};

export default ProfileButtons;
