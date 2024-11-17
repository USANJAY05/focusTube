import React, { useState } from 'react';

const ScrollBar = () => {
  const items = [
    'All', 'games', 'Trending', 'Movies', 'About Linux', 'Ethical Hacking', 
    'Movie Review', 'Tamil Culture', 'Indian Politics', 'Best Smartphone', 
    'Apple Products', 'Gaming Channel', 'Tech Channel', 'Home Workout', 'Lifestyle',
    'workout', 'android', 'tesla car', 'space x', 'tech innovation'
  ];

  const [active, setActive] =useState('All')


  return (
    <div className='w-full overflow-x-auto dark:bg-black p-2 box-border dark:text-white'>
      <ul className='flex whitespace-nowrap gap-3 overflow-x-auto scrollbar'>
        {items.map((item, id) => (
          <li 
            className={`px-2 py-1 w-auto text-sm font-semibold rounded-lg dark:hover:bg-gray-700 hover:bg-gray-400  dark:bg-slate-800 bg-gray-100 dark:text-white hover:cursor-pointer scrollbar-none ${active == item?'dark:bg-gray-700 bg-gray-400':''}`}
            onClick={() => setActive(item)}
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