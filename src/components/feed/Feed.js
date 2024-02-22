import React from "react";
import InfoCard from "../info_card/InfoCard";
import { useSelector } from "react-redux";
import { selectMobile, selectPosts } from "../../Slice";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import ShowPost from "../showPosts/ShowPosts";
import "../feed/Feed.css"

function Feed() {
  const mobile = useSelector(selectMobile);
  const posts = useSelector(selectPosts);
  const [user] = useAuthState(auth);

  return (
    <div className="FeedContainer">
        <div className="PostsContainer">
          {posts?.map((post) => (
            <ShowPost post={post} key={post.id} user={user} />
          ))}
        </div>
      {!mobile ? (
        <div className="Widgets">
          <InfoCard user={user} />
          <div className="SuggestionsContainer">
            <div className="SuggestionsHeader">
              <h4>Suggestions For You</h4>
              <p>See All</p>
            </div>
          </div>
          <p style={{ color: "rgb(212 212 216)", fontSize: 13, marginTop: 50 }}>
          © 2022 INSTAGRAM FROM META
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Feed;