import React,{useCallback, useContext, useState} from 'react'
import { IconButton } from "@material-tailwind/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { UserContext } from '../context/UserContext';

const ThemeSwitcher = () => {
    const {theme,toggleTheme} = useContext(UserContext)

  return (
    <IconButton onClick={toggleTheme} variant="text" className='rounded-full'>
      {theme === "light" ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6 text-gray-500" />
      )}
    </IconButton>
  );
}

export default ThemeSwitcher
