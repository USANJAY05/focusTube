import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";

const Search = () => {
  return (
    <div className='flex gap-3 justify-center items-center w-1/2'>
        <div className='flex w-3/4 pr-2 items-center p-[0.8px] rounded-3xl bg-gray-700'>
            <input type="text" 
                placeholder='Search'
                tabIndex={1}
                aria-label='search-box'
                className='w-full dark:bg-black rounded-l-3xl py-1 px-5 outline-none focus:border-blue-500' />
            <CiSearch className='w-8 h-8 ml-3' />
        </div>
        <FaMicrophone className='text-1xl bg-gray-600 box-content rounded-2xl p-2' />
    </div>
  )
}

export default Search