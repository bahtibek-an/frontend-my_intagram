"use client";
import React from "react";
const Stats = ({
  postsNumber,
  followersNumber,
  followingNumber,
}: {
  postsNumber: Number;
  followersNumber: Number;
  followingNumber: Number;
}) => {
  return (
    <div className="mt-5 flex gap-[40px]">
      <div className="flex gap-1 flex-col sm:flex-row flex-grow sm:flex-grow-0 items-center">
        <span className="font-bold">{`${postsNumber}`}</span>
        <span>posts</span>
      </div>
      <div className="flex gap-1 flex-col sm:flex-row flex-grow sm:flex-grow-0 items-center">
        <span className="font-bold">{`${followersNumber}`}</span>
        <span>followers</span>
      </div>
      <div className="flex gap-1 flex-col sm:flex-row flex-grow sm:flex-grow-0 items-center">
        <span className="font-bold">{`${followingNumber}`}</span>
        <span>following</span>
      </div>
    </div>
  );
};

export default Stats;
