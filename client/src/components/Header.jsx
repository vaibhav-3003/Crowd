import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse,faPlus,faMagnifyingGlass,faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
    const [tab,setTab] = useState(window.location.pathname)
  return (
    <div className="w-full py-6 flex justify-center items-center gap-12 md:gap-24 lg:gap-28">
      <Link to="/" onClick={() => setTab("/")}>
        {tab === "/" ? (
          <FontAwesomeIcon
            icon={faHouse}
            className="text-gray-800 text-xl transition-all duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <FontAwesomeIcon
            icon={faHouse}
            className="text-gray-400 text-xl transition-all duration-300 ease-in-out hover:scale-110"
          />
        )}
      </Link>
      <Link to="/add" onClick={() => setTab("/add")}>
        {tab === "/add" ? (
          <FontAwesomeIcon
            icon={faPlus}
            className="text-gray-800 text-2xl transition-all duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlus}
            className="text-gray-400 text-2xl transition-all duration-300 ease-in-out hover:scale-110"
          />
        )}
      </Link>
      <Link to="/search" onClick={() => setTab("/search")}>
        {tab === "/search" ? (
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-gray-800 text-xl transition-all duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="text-gray-400 text-xl transition-all duration-300 ease-in-out hover:scale-110"
          />
        )}
      </Link>
      <Link to="/account" onClick={() => setTab("/account")}>
        {tab === "/account" ? (
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-800 text-xl transition-all duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-400 text-xl transition-all duration-300 ease-in-out hover:scale-110"
          />
        )}
      </Link>
    </div>
  );
}

export default Header
