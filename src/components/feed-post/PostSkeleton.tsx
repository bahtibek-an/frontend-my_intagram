import { Skeleton } from "@mui/material";
import React from "react";

const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[470px] [&:not(:first-child)]:border-t py-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={200} />
        </div>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={40} />
      </div>
      <Skeleton variant="rounded" width={470} height={470} />
    </div>
  );
};

export default PostSkeleton;
