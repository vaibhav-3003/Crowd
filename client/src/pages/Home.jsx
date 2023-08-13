import React from 'react'
import User from '../components/User'
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

const Home = () => {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="w-3/4 flex gap-4">
        {/* left side of user */}
        <div className="w-3/4">
          {/* create post */}
          <div className="bg-accent py-4 rounded-lg">
            <CreatePost />
          </div>

          {/* posts */}
          <div className="bg-accent py-4 rounded-lg mt-4">
            <Post />
          </div>
        </div>

        {/* right side of user */}
        <div className="w-1/4">
          {/* following */}
          <div className="bg-accent py-4 rounded-lg">
            <h2 className="text-lg font-semibold text-neutral px-4">
              Following
            </h2>
            <div className="py-2 flex flex-col gap-4">
              <User userId="" name="" avatar="" />
              <User userId="" name="" avatar="" />
              <User userId="" name="" avatar="" />
            </div>
          </div>

          {/* followed */}
          <div className="bg-accent py-4 rounded-lg mt-4">
            <h2 className="text-lg font-semibold text-neutral px-4">
              Followers
            </h2>
            <div className="py-2 flex flex-col gap-4">
              <User userId="" name="" avatar="" />
              <User userId="" name="" avatar="" />
              <User userId="" name="" avatar="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home
