import React,{useEffect,useState} from 'react'
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Crowd from '../assets/Crowd.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from "@material-tailwind/react";


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
        <div className="w-full fixed bottom-0 border flex justify-between px-6 py-3 z-20 bg-white">
          <Link to="/">
            <IconButton variant="text">
              <FontAwesomeIcon icon={faHashtag} size="xl" />
            </IconButton>
          </Link>
          <Link to="/">
            <IconButton variant="text">
              <FontAwesomeIcon icon={faHashtag} size="xl" />
            </IconButton>
          </Link>
          <Link to="/">
            <IconButton variant="text">
              <FontAwesomeIcon icon={faHashtag} size="xl" />
            </IconButton>
          </Link>
          <Link to="/">
            <IconButton variant="text">
              <FontAwesomeIcon icon={faHashtag} size="xl" />
            </IconButton>
          </Link>
        </div>
      ) : (
        <Card className="h-full rounded-none w-full max-w-[5rem] md:max-w-[6rem] lg:max-w-[17rem] p-2 md:p-4 shadow-xl shadow-blue-gray-900/5">
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
          <List>
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              <p className="hidden lg:block">DashBoard</p>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <p className="hidden lg:block">DashBoard</p>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              <p className="hidden lg:block">DashBoard</p>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              <p className="hidden lg:block">DashBoard</p>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              <p className="hidden lg:block">DashBoard</p>
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              <p className="hidden lg:block">DashBoard</p>
            </ListItem>
          </List>
        </Card>
      )}
    </>
  );
}

export default Sidebar
