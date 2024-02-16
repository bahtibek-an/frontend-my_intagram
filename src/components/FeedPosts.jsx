import FeedPost from "./FeedPost";
import useGetFeedPosts from "../hooks/useGetFeedPosts";

const FeedPosts = () => {
  const { isLoading, posts } = useGetFeedPosts();

  return (
    <div className="max-w-sm mx-auto py-10 px-2 flex-col justify-center items-center">
      {isLoading && [0, 1, 2].map(index => (
        <div key={index} className="space-y-4 mb-10">
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 w-70"></div>
              <div className="h-4 bg-gray-300 w-40"></div>
            </div>
          </div>
          <div className="w-full bg-gray-300 h-64"></div>
        </div>
      ))}

      {!isLoading && posts.length > 0 && posts.map(post => (
        <FeedPost key={post.id} post={post} />
      ))}

      {!isLoading && posts.length === 0 && (
        <div>
          <p className="text-md text-gray-400">Follow people to see their posts in your feed</p>
        </div>
      )}
    </div>
  );
};

export default FeedPosts;