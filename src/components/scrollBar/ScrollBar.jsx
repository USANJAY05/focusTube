import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setScrollActive } from '../../redux/slice/scrollBarActive-slice';

const ScrollBar = () => {
  const [categories, setCategories] = useState([]); // State for video categories
  const dispatch = useDispatch()
  const active = useSelector((state) => state.scrollBarActive.value);

  // Function to fetch video categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/videoCategories`, {
        params: {
          part: 'snippet',
          regionCode: 'IN',
          key: import.meta.env.VITE_API_KEY
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching categories: ', error);
      return null;
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      if (data && data.items) {
        setCategories(data.items); // Set the fetched categories
      }
    };

    getCategories();
  }, []);

  return (
    <div className='w-full overflow-x-auto dark:bg-black p-2 box-border dark:text-white'>
      <ul className='flex whitespace-nowrap gap-3 overflow-x-auto scrollbar'>
        {categories.map((category) => (
          <li 
            key={category.id}
            className={`px-2 py-1 w-auto text-sm font-semibold rounded-lg dark:hover:bg-gray-700 hover:bg-gray-400 dark:bg-slate-800 
              ${category.snippet.assignable!==true ? 'hidden':''}
              bg-gray-100 dark:text-white hover:cursor-pointer scrollbar-none ${category.id == active?'dark:bg-gray-400 bg-gray-400':''}`}
            onClick={() => dispatch(setScrollActive(category.id))}
          >
            {category.snippet.title} {/* Display the category title */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollBar;