import React,{useEffect,useState} from 'react'
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import Crowd from '../assets/Crowd.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from "@material-tailwind/react";
import { faSquarePlus, faCompass } from "@fortawesome/free-regular-svg-icons";


const Sidebar = () => {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
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
        <div className="w-full fixed bottom-0 border flex justify-between px-4 py-3 z-20 bg-white items-center">
          <Link to="/">
            <IconButton variant="text">
              <HomeIcon className="h-6 w-6" />
            </IconButton>
          </Link>
          <Link to="/search">
            <IconButton variant="text">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </IconButton>
          </Link>
          <Link to="/explore">
            <IconButton variant="text">
              <FontAwesomeIcon icon={faCompass} className="h-6 w-6" />
            </IconButton>
          </Link>
          <Link to="/p/create">
            <IconButton variant="text">
              <FontAwesomeIcon icon={faSquarePlus} className="h-6 w-6" />
            </IconButton>
          </Link>
          <Link to="/profile">
            <Avatar
              src="https://imgs.search.brave.com/Q8AkIdA-GfI00-jf8f-t44jmlpCYCB_3sXIEdX4HuOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0"
              className="w-8 h-8"
            />
          </Link>
        </div>
      ) : (
        <Card className="h-full rounded-none w-full max-w-[5rem] fixed left-0 md:max-w-[6rem] lg:max-w-[17rem] p-2 md:p-4 z-20">
          <div className="mb-2 py-4 px-2">
            <Link to="/" className="flex items-center gap-4">
              <FontAwesomeIcon
                icon={faHashtag}
                size="xl"
                className="px-4 lg:border-r-2 lg:border-gray-500"
              />
              <img
                src={Crowd}
                alt="logo"
                className="hidden lg:block w-16 md:w-20"
              />
            </Link>
          </div>
          <List className="gap-4">
            <Link to="/">
              <ListItem>
                <ListItemPrefix>
                  <HomeIcon className="h-7 w-7" />
                </ListItemPrefix>
                <p className="hidden lg:block">Home</p>
              </ListItem>
            </Link>
            <Link to="/search">
              <ListItem>
                <ListItemPrefix>
                  <MagnifyingGlassIcon className="h-7 w-7" />
                </ListItemPrefix>
                <p className="hidden lg:block">Search</p>
              </ListItem>
            </Link>
            <Link to="/explore">
              <ListItem>
                <ListItemPrefix>
                  <FontAwesomeIcon icon={faCompass} className="h-7 w-7" />
                </ListItemPrefix>
                <p className="hidden lg:block">Explore</p>
              </ListItem>
            </Link>
            <Link to={"/p/create"}>
              <ListItem>
                <ListItemPrefix>
                  <FontAwesomeIcon icon={faSquarePlus} className="h-7 w-7" />
                </ListItemPrefix>
                <p className="hidden lg:block">Create</p>
              </ListItem>
            </Link>
            <Link to="/profile">
              <ListItem>
                <ListItemPrefix>
                  <Avatar
                    src="https://imgs.search.brave.com/Q8AkIdA-GfI00-jf8f-t44jmlpCYCB_3sXIEdX4HuOE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTM4/NzA5MzYyL3Bob3Rv/L3BvcnRyYWl0LW9m/LWEtZ2lybC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VVFH/WHBlaUxySTc4bk8x/QjlwZVVuMEQwZkNT/UnJtLUo4eG9oTVdH/Mkxtcz0"
                    className="w-7 h-7"
                  />
                </ListItemPrefix>
                <p className="hidden lg:block">Profile</p>
              </ListItem>
            </Link>
          </List>
        </Card>
      )}
    </>
  );
}

export default Sidebar
