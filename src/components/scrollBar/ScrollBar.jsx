import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setScrollActive } from '../../redux/slice/scrollBarActive-slice';
import DEFAULT_HOME_CATEGORIES from '../../data/scrollBarData';


const ScrollBar = ({ sideBar }) => {
  const [categories, setCategories] = useState([]); // State for video categories
  const dispatch = useDispatch();
  const active = useSelector((state) => state.scrollBarActive.value);

  // Function to fetch video categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/videoCategories`, {
        params: {
          part: 'snippet',
          regionCode: 'IN',
          key: import.meta.env.VITE_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching categories: ', error);
      return null;
    }
  };

  useEffect(() => {
    setCategories([])
    if (sideBar === 'Trending') {
      const getCategories = async () => {
        const data = await fetchCategories();
        if (data && data.items) {
          setCategories(data.items); // Set the fetched categories
        }
      };
      getCategories();
    } else if (sideBar === 'Home') {
      setCategories(DEFAULT_HOME_CATEGORIES); // Use default categories
    }
  }, [sideBar]);

  return (
    <div className='w-full overflow-x-auto dark:bg-black p-2 box-border dark:text-white'>
      <ul className='flex whitespace-nowrap gap-3 overflow-x-auto scrollbar'>
        {categories.map((category) => {
          const categoryId = category.id || category.title; // Ensure ID for custom categories
          const categoryTitle = category.snippet ? category.snippet.title : category.title;
          
          return (
            <li
              key={categoryId}
              className={`px-2 py-1 w-auto text-sm font-semibold rounded-lg dark:hover:bg-gray-200 dark:hover:text-black hover:bg-gray-700 hover:text-white 
                dark:bg-slate-800 ${category.snippet?.assignable === false ? 'hidden' : ''}
                bg-gray-100 dark:text-white hover:cursor-pointer scrollbar-none ${
                  categoryId === active ? 'dark:bg-gray-200 dark:text-black text-white bg-gray-700' : ''
                }`}
              onClick={() => dispatch(setScrollActive(categoryId))}
            >
              {categoryTitle}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ScrollBar;
