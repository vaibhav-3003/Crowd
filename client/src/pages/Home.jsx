import React from 'react'
import Post from '../components/Post'
import Suggestions from '../components/Suggestions'

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-full max-h-auto px-28 py-10">
      <div className="pb-20 md:pb-5 md:ml-72 flex justify-between">
        <div className="flex flex-col gap-6">
          <Post
            image={
              "https://imgs.search.brave.com/-ubwA6j-IXAw-aPpigoKMBVNG6StM-XE5LyzFFhXVHE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2I2L1BlbmNpbF9k/cmF3aW5nX29mX2Ff/Z2lybF9pbl9lY3N0/YXN5LmpwZw"
            }
          />
          <Post
            image={
              "https://imgs.search.brave.com/Q8AkIdA-GfI00-jf8f-t44jmlpCYCB_3sXIEdX4HuOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0"
            }
          />
          <Post
            image={
              "https://imgs.search.brave.com/Q8AkIdA-GfI00-jf8f-t44jmlpCYCB_3sXIEdX4HuOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0"
            }
          />
        </div>
        <Suggestions />
      </div>
    </div>
  );
}

export default Home
