import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserDataByUserName } from "@/firebase/fetchUserData";
import { UserData } from "@/types";
import Link from "next/link";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const Comment = ({
  userName,
  comment,
  createdAt,
}: {
  userName: string;
  comment: string;
  createdAt: Date;
}) => {
  const [commentUser, setCommentUser] = useState<UserData | null>(null);
  const { isLoading } = useQuery({
    queryKey: ["fetch-user", userName],
    queryFn: () => fetchUserDataByUserName(userName),
    onSuccess: (data) => setCommentUser(data),
  });
  return (
    <div className="flex flex-col">
      {!isLoading && commentUser && (
        <>
          <div className="flex items-start gap-2">
            <Link href={`/${userName}`}>
              <Avatar alt={userName} src={commentUser.profileImage} />
            </Link>
            <div className="flex flex-col">
              <div className="flex items-end gap-4">
                <Link className="font-medium" href={`/${userName}`}>
                  {userName}
                </Link>
                <span className="text-sm text-slate-600">
                  {dayjs(createdAt).fromNow()}
                </span>
              </div>
              <span className="text-ellipsis overflow-hidden">{comment}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
