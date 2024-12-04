import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaMicrophone } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const Search = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const searchItem =() =>{
    navigate(`search/${search}`)
  }
  return (
    <div className="flex gap-5 justify-center items-center w-1/2">
      <div className="flex w-4/5 h-10 relative">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchItem(search)}
          placeholder="Search"
          tabIndex={1}
          aria-label="search-box"
          className="w-full h-full -mr-3 dark:bg-black border outline-none border-slate-400 dark:border-slate-700 focus:border-blue-500 rounded-l-3xl py-1 px-5"
        />
        <CiSearch
          className="w-10 h-full ml-3 px-3 rounded-r-2xl box-content bg-gray-100 hover:bg-gray-200 dark:hover:bg-slate-700 dark:bg-slate-800"
          onClick={() => searchItem(search)}
        />
      </div>
      <FaMicrophone className="text-1xl dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-gray-700 bg-gray-100 box-content rounded-3xl p-3" />
    </div>
  );
};

export default Search;
