import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setLogout } from '../../redux/slice/profile-slice';
import useClickOutside from '../../hooks/useClickOutside';
import { toggle } from '../../redux/slice/toggleBar-slice';

const DropDown = ({ img, name, email, setToggle }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setToggle(false);
    dispatch(setLogout());
  };

  // Use the custom hook to detect clicks outside the dropdown
  useClickOutside(dropdownRef, () => {
    setTimeout(() => {
      if(toggle!==false){
        setToggle(false)
      }
    }, 100);
  });

  return (
    <div
      ref={dropdownRef}
      className="absolute top-10 right-10 mt-2 w-60 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md z-50"
    >
      <div className="flex items-center p-4 border-b dark:border-gray-700">
        <img src={img} alt="profile" className="w-10 h-10 rounded-full" />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
            {name || 'Guest'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {email.length > 24 ? email.slice(0, 18) + '...com' : email || 'guest@example.com'}
          </p>
        </div>
      </div>
      <ul className="py-2">
        <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          Profile
        </li>
        <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          Appearance
        </li>
        <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          Location
        </li>
        <li className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
          Settings
        </li>
        <li
          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => handleLogout()}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default DropDown;
