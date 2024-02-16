// import { useState } from "react";
// import ProfilePost from "./ProfilePost";
// import useGetUserPosts from "../hooks/useGetUsersPosts";

// const ProfilePosts = () => {
//   const { isLoading, posts } = useGetUserPosts();
//   const [selectedPostId, setSelectedPostId] = useState(null);

//   const NoPostFound = !isLoading && posts.length === 0;
//   // eslint-disable-next-line
//   if (NoPostFound) return <NoPostFound />;

//   const handlePostClick = (postId) => {
//     if (selectedPostId === postId) {
//       setSelectedPostId(null);
//     } else {
//       setSelectedPostId(postId);
//     }
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-1 sm:gap-1">
//       {isLoading ? (
//         [0, 1, 2, 3].map((_, index) => (
//           <div key={index} className="flex flex-col gap-9">
//             <div className="skeleton w-64">
//               {/* <div className="box h-300px items-center">Content</div> */}
//             </div>
//           </div>
//         ))
//       ) : (
//         posts.map((post) => (
//           <div key={post.id} onClick={() => handlePostClick(post.id)}>
//             <ProfilePost post={post} isVisible={selectedPostId === post.id} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ProfilePosts;



// eslint-disable-next-line
import React, { useState } from "react";
import ProfilePost from "./ProfilePost";
import useGetUserPosts from "../hooks/useGetUsersPosts";

const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();
  const [selectedPostId, setSelectedPostId] = useState(null);

  const NoPostFound = !isLoading && posts.length === 0;

  if (NoPostFound) {
    return <div>No posts found.</div>; // Return a message if no posts are found
  }

  const handlePostClick = (postId) => {
    setSelectedPostId((prevSelectedPostId) =>
      prevSelectedPostId === postId ? null : postId
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-1 sm:gap-1">
      {isLoading
        ? [0, 1, 2, 3].map((_, index) => (
            <div key={index} className="flex flex-col gap-9">
              <div className="skeleton w-64"></div>
            </div>
          ))
        : posts.map((post) => (
            <div key={post.id} onClick={() => handlePostClick(post.id)}>
              <ProfilePost post={post} isVisible={selectedPostId === post.id} />
            </div>
          ))}
    </div>
  );
};

export default ProfilePosts;
