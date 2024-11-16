import React from 'react'
import { CiSearch } from "react-icons/ci";
import { FaMicrophone } from "react-icons/fa";

const Search = () => {
  return (
    <div className='flex gap-5 justify-center items-center w-1/2'>
        <div className='flex w-3/4 pr-4 items-center p-[0.8px] rounded-3xl dark:bg-slate-800 bg-gray-100'>
            <input type="text" 
                placeholder='Search'
                tabIndex={1}
                aria-label='search-box'
                className='w-full dark:bg-black rounded-l-3xl py-1 px-5 outline-1 focus:outline' />
            <CiSearch className='w-8 h-8 ml-3' />
        </div>
        <FaMicrophone className='text-1xl dark:bg-slate-800 bg-gray-100 box-content rounded-3xl p-3' />
    </div>
  )
}

export default Search