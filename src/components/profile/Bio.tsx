import React from "react";

const Bio = ({ fullName, bio }: { fullName: string; bio: string }) => {
  return (
    <div className="flex flex-col mt-5">
      <span className="font-bold leading-4">{fullName}</span>
      <span className="leading-4">{bio}</span>
    </div>
  );
};

export default Bio;
