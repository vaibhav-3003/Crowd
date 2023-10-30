import React,{useContext, useEffect,useState} from 'react'
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";

import logo_light from '../assets/Crowd.png'
import logo_dark from '../assets/logo_dark.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  ChatCircleDots,
  House,
  MagnifyingGlass,
  Compass,
  PlusSquare,
  Hash,
  List as HamBurgerList,
  Bookmark,
  BookmarkSimple,
  Moon,
  Sun,
  User,
  SignOut,
  MessengerLogo,
} from "@phosphor-icons/react";
import { UserContext } from '../context/UserContext';
import SearchModal from './SearchModal';
import LoginModal from './LoginModal';

const Sidebar = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth<=715);
  const {user,theme,logout,toggleTheme} = useContext(UserContext)
  const location = useLocation()


  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 715);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    
  }, []); 

  const navigate = useNavigate()

  const handleLogout = async()=>{
    localStorage.removeItem("theme")
    await logout()
    navigate('/account/login')
  }

  return (
    <>
      {isMobile ? (
        <div
          className={`w-full fixed bottom-0 border-t ${
            theme === "dark" ? "border-dark bg-[#1D232A]" : "bg-white"
          } justify-between px-4 py-3 z-20 items-center ${
            location.pathname.slice(0, 10) === "/direct/t/" ? "hidden" : "flex"
          }`}
        >
          <Link to="/">
            <IconButton variant="text">
              <House
                className={`h-8 w-8 ${
                  theme === "light" ? "text-gray-800" : "text-gray-500"
                }`}
              />
            </IconButton>
          </Link>
          <IconButton
            variant="text"
            onClick={() => window.search_modal.showModal()}
          >
            <MagnifyingGlass
              className={`h-8 w-8 ${
                theme === "light" ? "text-gray-800" : "text-gray-500"
              }`}
            />
          </IconButton>
          <SearchModal />

          <Link to="/explore">
            <IconButton variant="text">
              <Compass
                className={`h-8 w-8 ${
                  theme === "light" ? "text-gray-800" : "text-gray-500"
                }`}
              />
            </IconButton>
          </Link>

          <Link to="/p/create">
            <IconButton variant="text">
              <PlusSquare
                className={`h-8 w-8 ${
                  theme === "light" ? "text-gray-800" : "text-gray-500"
                }`}
              />
            </IconButton>
          </Link>
          <Link to={`/${user.username}/`}>
            <Avatar src={user.avatar.url} className="w-8 h-8" />
          </Link>

          <Popover>
            <PopoverHandler>
              <ListItem
                className={`${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                } ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "w-fit"
                    : "w-fit lg:w-full"
                }`}
              >
                <ListItemPrefix
                  className={`${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "mr-0"
                      : "mr-0 lg:mr-4"
                  }`}
                >
                  <HamBurgerList
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`${
                    theme === "light" ? "text-black" : "text-gray-500"
                  } ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "hidden"
                      : "hidden lg:block"
                  }`}
                >
                  More
                </p>
              </ListItem>
            </PopoverHandler>
            <PopoverContent
              className={`z-20 p-2 ${
                theme === "dark" && "bg-[#1D232A] border-dark"
              }`}
            >
              <div className={`w-[200px]`}>
                <Link
                  to={`/${user && user.username}/`}
                  className={`flex items-center gap-2 w-full mb-2 ${
                    theme === "light"
                      ? "hover:bg-blue-gray-50"
                      : "hover:bg-dark"
                  } p-2.5 rounded-lg`}
                >
                  <BookmarkSimple
                    size={24}
                    className={`${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  />
                  <p
                    className={`${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    Saved
                  </p>
                </Link>

                <button
                  className={`flex items-center gap-2 w-full mb-2 ${
                    theme === "light"
                      ? "hover:bg-blue-gray-50"
                      : "hover:bg-dark"
                  } p-2.5 rounded-lg`}
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? (
                    <Moon
                      size={24}
                      className={`${
                        theme === "light" ? "text-gray-800" : "text-gray-500"
                      }`}
                    />
                  ) : (
                    <Sun
                      size={24}
                      className={`${
                        theme === "light" ? "text-gray-800" : "text-gray-500"
                      }`}
                    />
                  )}

                  <p
                    className={`${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    Switch appearence
                  </p>
                </button>

                <button
                  className={`flex items-center gap-2 w-full mb-2 ${
                    theme === "light"
                      ? "hover:bg-blue-gray-50"
                      : "hover:bg-dark"
                  } p-2.5 rounded-lg`}
                  onClick={() =>
                    document.getElementById("login_modal").showModal()
                  }
                >
                  <User
                    size={24}
                    className={`${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  />
                  <p
                    className={`${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    Switch accounts
                  </p>
                </button>

                <LoginModal />

                <div className="flex justify-center px-2 my-2">
                  <hr
                    className={`w-full ${theme === "dark" && "border-dark"}`}
                  />
                </div>

                <button
                  className={`flex text-red-500 items-center gap-2 w-full mb-2 ${
                    theme === "light"
                      ? "hover:bg-blue-gray-50"
                      : "hover:bg-dark"
                  } p-2.5 rounded-lg`}
                  onClick={handleLogout}
                >
                  <SignOut size={24} />
                  <p>Log out</p>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Card
          className={`h-full rounded-none w-full max-w-[5rem] fixed left-0 md:max-w-[6rem] lg:max-w-[17rem] p-2 md:p-4 z-20 border-r ${
            theme === "light" ? "bg-white" : "bg-[#1D232A] border-[#313a44]"
          } ${location.pathname.slice(0, 7) === "/direct" && "w-[6rem]"} `}
        >
          <div className="mb-2 py-4 px-2 flex justify-center lg:justify-between lg:px-2 items-center">
            <Link to="/" className="flex items-center lg:gap-4">
              <Hash
                className={`h-8 w-8 lg:ml-2 lg:border-gray-500 ${
                  theme === "light" ? "text-gray-800" : "text-gray-500"
                } ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "border-r-0"
                    : "lg:border-r-2"
                }`}
              />
              <img
                src={theme === "light" ? logo_light : logo_dark}
                alt="logo"
                className={`hidden lg:block ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "w-0"
                    : "w-16 md:w-20"
                }`}
              />
            </Link>
          </div>
          <List className="gap-4">
            <Link
              to="/"
              className={`${
                location.pathname.slice(0, 7) === "/direct" ? "w-fit" : "w-full"
              }`}
            >
              <ListItem
                className={`${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                } ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "w-fit"
                    : "w-fit lg:w-full"
                }`}
              >
                <ListItemPrefix
                  className={` ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "mr-0"
                      : "mr-0 lg:mr-4"
                  }`}
                >
                  <House
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`${
                    theme === "light" ? "text-black" : "text-gray-500"
                  } ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "hidden"
                      : "hidden lg:block"
                  }`}
                >
                  Home
                </p>
              </ListItem>
            </Link>

            <ListItem
              className={`${
                theme === "dark" &&
                "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
              } ${
                location.pathname.slice(0, 7) === "/direct"
                  ? "w-fit"
                  : "w-fit lg:w-full"
              }`}
              onClick={() => window.search_modal.showModal()}
            >
              <ListItemPrefix
                className={` ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "mr-0"
                    : "mr-0 lg:mr-4"
                }`}
              >
                <MagnifyingGlass
                  className={`h-7 w-7 ${
                    theme === "light" ? "text-gray-800" : "text-gray-500"
                  }`}
                />
              </ListItemPrefix>
              <p
                className={`${
                  theme === "light" ? "text-black" : "text-gray-500"
                } ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "hidden"
                    : "hidden lg:block"
                }`}
              >
                Search
              </p>
            </ListItem>
            <SearchModal />
            <Link
              to="/explore"
              className={`${
                location.pathname.slice(0, 7) === "/direct" ? "w-fit" : "w-full"
              }`}
            >
              <ListItem
                className={`${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                } ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "w-fit"
                    : "w-fit lg:w-full"
                }`}
              >
                <ListItemPrefix
                  className={` ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "mr-0"
                      : "mr-0 lg:mr-4"
                  }`}
                >
                  <Compass
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`${
                    theme === "light" ? "text-black" : "text-gray-500"
                  } ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "hidden"
                      : "hidden lg:block"
                  }`}
                >
                  Explore
                </p>
              </ListItem>
            </Link>

            <Link
              to="/direct/inbox"
              className={`${
                location.pathname.slice(0, 7) === "/direct" ? "w-fit" : "w-full"
              }`}
            >
              <ListItem
                className={`${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                } ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "w-fit"
                    : "w-fit lg:w-full"
                }`}
              >
                <ListItemPrefix
                  className={` ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "mr-0"
                      : "mr-0 lg:mr-4"
                  }`}
                >
                  <MessengerLogo
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`${
                    theme === "light" ? "text-black" : "text-gray-500"
                  } ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "hidden"
                      : "hidden lg:block"
                  }`}
                >
                  Messages
                </p>
              </ListItem>
            </Link>

            <Link
              to={"/p/create"}
              className={`${
                location.pathname.slice(0, 7) === "/direct" ? "w-fit" : "w-full"
              }`}
            >
              <ListItem
                className={`${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                } ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "w-fit"
                    : "w-fit lg:w-full"
                }`}
              >
                <ListItemPrefix
                  className={` ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "mr-0"
                      : "mr-0 lg:mr-4"
                  }`}
                >
                  <PlusSquare
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-gray-800" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`${
                    theme === "light" ? "text-black" : "text-gray-500"
                  } ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "hidden"
                      : "hidden lg:block"
                  }`}
                >
                  Create
                </p>
              </ListItem>
            </Link>
            <Link
              to={`/${user.username}/`}
              className={`${
                location.pathname.slice(0, 7) === "/direct" ? "w-fit" : "w-full"
              }`}
            >
              <ListItem
                className={`${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                } ${
                  location.pathname.slice(0, 7) === "/direct"
                    ? "w-fit"
                    : "w-fit lg:w-full"
                }`}
              >
                <ListItemPrefix
                  className={` ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "mr-0"
                      : "mr-0 lg:mr-4"
                  }`}
                >
                  <Avatar
                    src={user.avatar.url}
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-black" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`${
                    theme === "light" ? "text-black" : "text-gray-500"
                  } ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "hidden"
                      : "hidden lg:block"
                  }`}
                >
                  Profile
                </p>
              </ListItem>
            </Link>

            <Popover>
              <PopoverHandler>
                <ListItem
                  className={`${
                    theme === "dark" &&
                    "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                  } ${
                    location.pathname.slice(0, 7) === "/direct"
                      ? "w-fit"
                      : "w-fit lg:w-full"
                  }`}
                >
                  <ListItemPrefix
                    className={`${
                      location.pathname.slice(0, 7) === "/direct"
                        ? "mr-0"
                        : "mr-0 lg:mr-4"
                    }`}
                  >
                    <HamBurgerList
                      className={`h-7 w-7 ${
                        theme === "light" ? "text-gray-800" : "text-gray-500"
                      }`}
                    />
                  </ListItemPrefix>
                  <p
                    className={`${
                      theme === "light" ? "text-black" : "text-gray-500"
                    } ${
                      location.pathname.slice(0, 7) === "/direct"
                        ? "hidden"
                        : "hidden lg:block"
                    }`}
                  >
                    More
                  </p>
                </ListItem>
              </PopoverHandler>
              <PopoverContent
                className={`z-20 p-2 ${
                  theme === "dark" && "bg-[#1D232A] border-dark"
                }`}
              >
                <div className={`w-[200px]`}>
                  <Link
                    to={`/${user && user.username}/`}
                    className={`flex items-center gap-2 w-full mb-2 ${
                      theme === "light"
                        ? "hover:bg-blue-gray-50"
                        : "hover:bg-dark"
                    } p-2.5 rounded-lg`}
                  >
                    <BookmarkSimple
                      size={24}
                      className={`${
                        theme === "light" ? "text-gray-800" : "text-gray-500"
                      }`}
                    />
                    <p
                      className={`${
                        theme === "light" ? "text-gray-800" : "text-gray-500"
                      }`}
                    >
                      Saved
                    </p>
                  </Link>

                  <button
                    className={`flex items-center gap-2 w-full mb-2 ${
                      theme === "light"
                        ? "hover:bg-blue-gray-50"
                        : "hover:bg-dark"
                    } p-2.5 rounded-lg`}
                    onClick={toggleTheme}
                  >
                    {theme === "dark" ? (
                      <Moon
                        size={24}
                        className={`${
                          theme === "light" ? "text-gray-800" : "text-gray-500"
                        }`}
                      />
                    ) : (
                      <Sun
                        size={24}
                        className={`${
                          theme === "light" ? "text-gray-800" : "text-gray-500"
                        }`}
                      />
                    )}

                    <p
                      className={`${
                        theme === "light" ? "text-gray-800" : "text-gray-500"
                      }`}
                    >
                      Switch appearence
                    </p>
                  </button>

                  <button
                    className={`flex items-center gap-2 w-full mb-2 ${
                      theme === "light"
                        ? "hover:bg-blue-gray-50"
                        : "hover:bg-dark"
                    } p-2.5 rounded-lg`}
                    onClick={() =>
                      document.getElementById("login_modal").showModal()
                    }
                  >
                    <User
                      size={24}
                      className={`${
                        theme === "light" ? "text-gray-800" : "text-gray-500"
                      }`}
                    />
                    <p
                      className={`${
                        theme === "light" ? "text-gray-800" : "text-gray-500"
                      }`}
                    >
                      Switch accounts
                    </p>
                  </button>

                  <LoginModal />

                  <div className="flex justify-center px-2 my-2">
                    <hr
                      className={`w-full ${theme === "dark" && "border-dark"}`}
                    />
                  </div>

                  <button
                    className={`flex text-red-500 items-center gap-2 w-full mb-2 ${
                      theme === "light"
                        ? "hover:bg-blue-gray-50"
                        : "hover:bg-dark"
                    } p-2.5 rounded-lg`}
                    onClick={handleLogout}
                  >
                    <SignOut size={24} />
                    <p>Log out</p>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </List>
        </Card>
      )}
    </>
  );
}

export default Sidebar
