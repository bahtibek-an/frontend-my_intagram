import FeedPosts from "../components/FeedPosts";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
  return (
    <div className="container mx-auto md:block px-4 lg:px-0">
      <div className="flex">
        <div className="flex-1 py-10 justify-center">
          <FeedPosts />
        </div>
        <div className="flex ml-20">
          <SuggestedUsers />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
