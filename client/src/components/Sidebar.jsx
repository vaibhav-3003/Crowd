import React,{useContext, useEffect,useState} from 'react'
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import logo_light from '../assets/Crowd.png'
import logo_dark from '../assets/logo_dark.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from "@material-tailwind/react";
import { faSquarePlus, faCompass } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from '../context/UserContext';
import SearchModal from './SearchModal';

const Sidebar = () => {

  const [isMobile, setIsMobile] = useState(window.innerWidth<=715);
  const {user,theme} = useContext(UserContext)

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


  return (
    <>
      {isMobile ? (
        <div
          className={`w-full bg-white fixed bottom-0 border-t ${
            theme === "dark" && "border-dark bg-[#1D232A]"
          } flex justify-between px-4 py-3 z-20 items-center`}
        >
          <Link to="/">
            <IconButton variant="text">
              <HomeIcon
                className={`h-6 w-6 ${theme === "dark" && "text-gray-500"}`}
              />
            </IconButton>
          </Link>
          <IconButton
            variant="text"
            onClick={() => window.search_modal.showModal()}
          >
            <MagnifyingGlassIcon
              className={`h-6 w-6 ${theme === "dark" && "text-gray-500"}`}
            />
          </IconButton>
          <SearchModal />
          
          <Link to="/explore">
            <IconButton variant="text">
              <FontAwesomeIcon
                icon={faCompass}
                className={`h-6 w-6 ${theme === "dark" && "text-gray-500"}`}
              />
            </IconButton>
          </Link>
          <Link to="/p/create">
            <IconButton variant="text">
              <FontAwesomeIcon
                icon={faSquarePlus}
                className={`h-6 w-6 ${theme === "dark" && "text-gray-500"}`}
              />
            </IconButton>
          </Link>
          <Link to={`/${user.username}/`}>
            <Avatar src={user.avatar.url} className="w-8 h-8" />
          </Link>
        </div>
      ) : (
        <Card
          className={`h-full rounded-none w-full max-w-[5rem] fixed left-0 md:max-w-[6rem] lg:max-w-[17rem] p-2 md:p-4 z-20 border-r ${
            theme === "light" ? "bg-white" : "bg-[#1D232A] border-[#313a44]"
          }`}
        >
          <div className="mb-2 py-4 px-2 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faHashtag}
                size="xl"
                className={`px-4 lg:border-r-2 lg:border-gray-500 ${
                  theme === "light" ? "text-black" : "text-gray-500"
                }`}
              />
              <img
                src={theme === "light" ? logo_light : logo_dark}
                alt="logo"
                className="hidden lg:block w-16 md:w-20"
              />
            </Link>
          </div>
          <List className="gap-4">
            <Link to="/">
              <ListItem
                className={`w-fit lg:w-full ${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                }`}
              >
                <ListItemPrefix className="mr-0 lg:mr-4">
                  <HomeIcon
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-black" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`hidden lg:block ${
                    theme === "light" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Home
                </p>
              </ListItem>
            </Link>
            <ListItem
              onClick={() => window.search_modal.showModal()}
              className={`w-fit lg:w-full ${
                theme === "dark" &&
                "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
              }`}
            >
              <ListItemPrefix className="mr-0 lg:mr-4">
                <MagnifyingGlassIcon
                  className={`h-7 w-7 ${
                    theme === "light" ? "text-black" : "text-gray-500"
                  }`}
                />
              </ListItemPrefix>
              <p
                className={`hidden lg:block ${
                  theme === "light" ? "text-black" : "text-gray-500"
                }`}
              >
                Search
              </p>
            </ListItem>
            <SearchModal />
            <Link to="/explore">
              <ListItem
                className={`w-fit lg:w-full ${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                }`}
              >
                <ListItemPrefix className="mr-0 lg:mr-4">
                  <FontAwesomeIcon
                    icon={faCompass}
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-black" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`hidden lg:block ${
                    theme === "light" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Explore
                </p>
              </ListItem>
            </Link>
            <Link to={"/p/create"}>
              <ListItem
                className={`w-fit lg:w-full ${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                }`}
              >
                <ListItemPrefix className="mr-0 lg:mr-4">
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-black" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`hidden lg:block ${
                    theme === "light" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Create
                </p>
              </ListItem>
            </Link>
            <a href={`/${user.username}/`}>
              <ListItem
                className={`w-fit lg:w-full ${
                  theme === "dark" &&
                  "hover:bg-[#313a44] active:bg-[#313a44] focus:bg-[#313a44]"
                }`}
              >
                <ListItemPrefix className="mr-0 lg:mr-4">
                  <Avatar
                    src={user.avatar.url}
                    className={`h-7 w-7 ${
                      theme === "light" ? "text-black" : "text-gray-500"
                    }`}
                  />
                </ListItemPrefix>
                <p
                  className={`hidden lg:block ${
                    theme === "light" ? "text-black" : "text-gray-500"
                  }`}
                >
                  Profile
                </p>
              </ListItem>
            </a>
          </List>
        </Card>
      )}
    </>
  );
}

export default Sidebar
