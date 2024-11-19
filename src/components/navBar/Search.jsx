import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";

const Search = () => {
  return (
    <div className='flex gap-5 justify-center items-center w-1/2'>
        <div className='flex w-4/5 h-10 relative'>
            <input type="text" 
                placeholder='Search'
                tabIndex={1}
                aria-label='search-box'
                className='w-full h-full  -mr-3 dark:bg-black outline -outline-offset-2 dark:outline-gray-700 outline-gray-300 focus:outline-blue-500 rounded-l-3xl py-1 px-5 outline-1 focus:outline' 
              />
            <CiSearch className='w-10 h-full ml-3 px-3 rounded-r-2xl box-content bg-gray-300 dark:bg-slate-800' />
        </div>
        <FaMicrophone className='text-1xl dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-gray-700 bg-gray-100 box-content rounded-3xl p-3' />
    </div>
  )
}

export default Search