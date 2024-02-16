
import { useState } from "react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";
import useGetSuggestedUsers from "../hooks/useGetSuggestedUsers";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const [seeAll, setSeeAll] = useState(false);

  if (isLoading) return null;
  return (
    <div className="py-8 px-6 space-y-4 ">
      <SuggestedHeader />
      {suggestedUsers.length !== 0 && (
        <div className="flex items-center justify-between w-full">
          <p className="text-xs font-semibold text-gray-500">
            Suggested for you
          </p>
          <p
            className="text-xs font-semibold cursor-pointer hover:text-gray-400"
            onClick={() => setSeeAll(!seeAll)}
          >
            See All
          </p>
        </div>
      )}
      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}

      <div className="text-xs text-gray-500 mt-5 text-center self-start">
        Made at Astrum IT Academy <br />
        By Maqsud Yusupov
      </div>
    </div>
  );
};

export default SuggestedUsers;
