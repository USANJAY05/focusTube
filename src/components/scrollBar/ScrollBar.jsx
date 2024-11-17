import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setScrollActive } from '../../redux/slice/scrollBarActive-slice';

const ScrollBar = () => {
  const items = [
    'All', 'games', 'Trending', 'Movies', 'About Linux', 'Ethical Hacking', 
    'Movie Review', 'Tamil Culture', 'Indian Politics', 'Best Smartphone', 
    'Apple Products', 'Gaming Channel', 'Tech Channel', 'Home Workout', 'Lifestyle',
    'workout', 'android', 'tesla car', 'space x', 'tech innovation'
  ];

  const active = useSelector((state) => state.scrollBarActive.value)
  const dispatch = useDispatch()


  return (
    <div className='w-full overflow-x-auto dark:bg-black p-2 box-border dark:text-white'>
      <ul className='flex whitespace-nowrap gap-3 overflow-x-auto scrollbar'>
        {items.map((item, id) => (
          <li 
            className={`px-2 py-1 w-auto text-sm font-semibold rounded-lg dark:hover:bg-gray-700 hover:bg-gray-400  dark:bg-slate-800 bg-gray-100 dark:text-white hover:cursor-pointer scrollbar-none ${active == item?'dark:bg-gray-700 bg-gray-400':''}`}
            onClick={() => dispatch(setScrollActive(item))}
            key={id}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollBar;