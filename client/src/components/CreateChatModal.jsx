import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import {UserContext} from '../context/UserContext'
import { Button } from '@material-tailwind/react';
import { ChatContext } from '../context/ChatContext';
import { useNavigate } from 'react-router-dom';

const CreateChatModal = () => {
  const {theme,user,allUsers} = useContext(UserContext)
  const {createChat,newChat} = useContext(ChatContext)

  const [searchValue,setSearchValue] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [selectedUser,setSelectedUser] = useState(null)

  const modalRef = useRef(null);
  const navigate = useNavigate()

  const showUsers = (e) => {

    const searchText = e.target.value;
    setSearchValue(searchText);

    let users = [];
    if (searchText !== "") {
      users = allUsers.filter((user) => {
        return searchText === "" || (user.username.includes(searchText) || user.name.includes(searchText));
      });
    }

    setFilteredUsers(users);
  };

  const handleSelectedUser = (user)=>{
    setSelectedUser(user)
  }

  const handleCreateChat = async()=>{
    await createChat({
      sender: user._id,
      receiver: selectedUser._id
    })
    setSelectedUser(null)
    setSearchValue('')
    modalRef.current.checked = false
  }

  useEffect(() => {
    const closeModal = (e) => {
      if (e.target === modalRef.current) {
        setSelectedUser(null);
      }
    };

    document.addEventListener("click", closeModal);

    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, []);

  useEffect(() => {
    if (searchValue === "" || !modalRef.current.checked) {
      setSelectedUser(null);
    }
  }, [searchValue, modalRef.current]);

  useEffect(()=>{
    if (newChat) {
      navigate(`/direct/t/${newChat._id}`);
    }
  },[newChat])

  return (
    <div>
      <input type="checkbox" id="chat_modal" className="modal-toggle" ref={modalRef}/>
      <div className="modal">
        <div className="modal-box p-0 md:min-w-[550px]">
          {/* header */}
          <div className="flex justify-between items-center p-4">
            <div></div>
            <h2 className="font-bold">New Message</h2>
            <label htmlFor="chat_modal" className="cursor-pointer">
              Cancel
            </label>
          </div>

          <div
            className={`border-b border-t ${
              theme === "dark" && "border-dark"
            } px-4 py-2 flex items-center`}
          >
            <span className="">To :</span>
            <input
              type="text"
              className="text-sm bg-transparent flex-grow px-2 outline-none"
              placeholder="Search..."
              value={searchValue}
              onChange={showUsers}
            />
          </div>

          <div className="h-[260px] py-2 overflow-y-auto flex flex-col gap-2">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => {
                return (
                  <div className={`flex justify-between items-center gap-2 px-4 py-2 hover:cursor-pointer hover:bg-[#2c3742] ${selectedUser && selectedUser._id===user._id && 'bg-[#2c3742]'}`} key={user._id} onClick={()=>handleSelectedUser(user)}>
                    <div className='flex items-center gap-2'>
                      <img
                        src={user.avatar.url}
                        alt=""
                        className="rounded-full w-10 h-10 object-cover"
                      />
                      <div className="">
                        <h2 className="">{user.name}</h2>
                        <p
                          className={`text-sm ${
                            theme === "light"
                              ? "text-gray-300"
                              : "text-gray-600"
                          }`}
                        >
                          {user.username}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : searchValue !== "" ? (
              <p className="text-gray-500 px-4">No account found</p>
            ) : (
              <p className="text-gray-500 px-4">No account found</p>
            )}
          </div>

          <div className='px-4'>
            <Button className='nunito bg-primary w-full my-5 text-md normal-case font-normal text-white p-2' disabled={selectedUser ? false:true} onClick={handleCreateChat}>
              Chat
            </Button>
          </div>

        </div>

        <label className="modal-backdrop" htmlFor="chat_modal">
          
        </label>
      </div>
    </div>
  );
}

export default CreateChatModal
