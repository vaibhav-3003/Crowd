import React from "react";
import UserPost from "./UserPost";

const SavedPosts = ({ posts }) => {

  return (
    <div className="w-full mt-5 grid grid-cols-3 gap-1 ">
      {posts.length > 0 ? (
        posts.map((post) => {
          return (
            <UserPost
              key={post._id}
              postId={post._id}
              source={post.image.url}
              likes={post.likes.length}
              comments={post.comments.length}
              type={post.type}
            />
          );
        })
      ) : (
        <h2 className="text-lg md:text-3xl font-bold">No Posts Yet</h2>
      )}
    </div>
  );
};

export default SavedPosts;
