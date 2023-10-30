import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Avatar } from '@material-tailwind/react'
import { Link } from 'react-router-dom'

const SearchModal = () => {
    const [searchText,setSearchText] = useState('')
    const [filteredUsers,setFilteredUsers] = useState([])

    const {allUsers,theme} = useContext(UserContext)

    const showUsers = (e)=>{
        const searchText = e.target.value;
        setSearchText(searchText);

        let users = [];
        if(searchText!==''){
            users = allUsers.filter((user) => {
              return searchText === "" || user.username.includes(searchText);
            });
        }

        setFilteredUsers(users);
    }

  return (
    <dialog id="search_modal" className="modal">
      <form method="dialog" className="modal-box" data-theme={theme}>
        <button
          className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2 border-none ${
            theme === "light" ? "hover:bg-gray-200" : "hover:bg-[#313a44]"
          }`}
        >
          ✕
        </button>
        <h3 className="font-bold text-2xl">Search</h3>

        <div
          className={`relative mt-8 flex items-center w-full py-2 px-4 rounded-lg outline-none ${
            theme === "light" ? "bg-gray-100" : "bg-[#313a44]"
          }`}
        >
          <input
            type="text"
            value={searchText}
            className="w-full bg-transparent outline-none"
            placeholder="Search..."
            onChange={showUsers}
          />
          <button
            className="p-2 bg-transparent rounded-full"
            type="reset"
            onClick={() => setSearchText("")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-600 fill-current"
              viewBox="0 0 24 24"
            >
              <path
                className="heroicon-ui"
                d="M13.41 12l5.3-5.29a1 1 0 10-1.42-1.42L12 10.59l-5.29-5.3a1 1 0 10-1.42 1.42l5.3 5.29-5.3 5.29a1 1 0 001.42 1.42L12 13.41l5.29 5.3a1 1 0 001.42-1.42z"
              />
            </svg>
          </button>
        </div>
        <hr className={`mt-6 ${theme === "dark" && "border-[#313a44]"}`} />

        <div className="py-4 max-h-72 overflow-y-auto flex flex-col gap-2">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              return (
                <Link
                  className={`p-2 rounded-lg flex gap-4 items-center ${
                    theme === "light"
                      ? "hover:bg-gray-100"
                      : "hover:bg-[#313a44]"
                  }`}
                  to={`/${user.username}`}
                  key={user._id}
                >
                  <Avatar src={user.avatar.url} className="w-12 h-12" />
                  <div>
                    <p className="font-bold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.name}</p>
                  </div>
                </Link>
              );
            })
          ) : searchText !== "" ? (
            <p className="text-gray-500">No results found</p>
          ) : null}
        </div>
      </form>
    </dialog>
  );
}

export default SearchModal
