import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import Dots from "@/assets/icons/More.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const FeedPostHeader = ({
  userName,
  profileImage,
  createdAt,
}: {
  userName: string;
  profileImage: string;
  createdAt: Date;
}) => {
  return (
    <div className="flex items-center justify-between px-1 sm:px-0">
      <div className="flex gap-2 items-center">
        <Link href={`/${userName}`} className="flex items-center gap-2">
          <Avatar src={profileImage} />
          <span className="text-lg font-semibold hover:opacity-60">
            {userName}
          </span>
        </Link>
        <span className="text-gray-600">•</span>
        <span className="text-gray-600">{dayjs(createdAt).fromNow()}</span>
      </div>
      <Dots className="cursor-pointer" />
    </div>
  );
};

export default FeedPostHeader;
