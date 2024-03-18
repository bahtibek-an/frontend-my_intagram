import React from "react";
import Post from "./Post";

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userUID={post.userUID}
          username={post.username} // Добавляем username в список постов
          avatarUrl={post.avatarUrl}
          imageUrl={post.imageUrl}
          likes={post.likes}
          caption={post.caption}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default PostList;
