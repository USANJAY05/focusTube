import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setScrollActive } from '../../redux/slice/scrollBarActive-slice';

// Default categories for 'Home'
const DEFAULT_HOME_CATEGORIES = [
  { id: 'balachandra web dev', title: 'Web Dev' },
  { id: 'learn machine learning', title: 'Machine Learning' },
  { id: 'tech-news', title: 'Tech News' },
  { id: '@finance.boosan', title: 'Finance' },
  { id: 'tamil-news', title: 'Tamil News' },
  { id: 'tamil-fitness', title: 'Tamil Fitness' },
  { id: 'tamil-finance', title: 'Tamil Finance' },
  { id: '@TamilTechOfficial', title: 'Tech Tamil' },

  // Education & Learning
  { id: 'programming-tutorials', title: 'Programming Tutorials' },
  { id: 'data-structures-algorithms', title: 'Data Structures & Algorithms' },
  { id: 'data-science', title: 'Data Science' },
  { id: 'deep-learning', title: 'Deep Learning' },
  { id: 'artificial-intelligence', title: 'Artificial Intelligence' },
  { id: 'devops', title: 'DevOps' },
  { id: '@learn cloud computing', title: 'Cloud Computing' },
  { id: 'virtualization', title: 'Virtualization' },

  // Development & Tools
  { id: 'mobile-app-dev', title: 'Mobile App Development' },
  { id: 'game-development', title: 'Game Development' },
  { id: 'blockchain', title: 'Blockchain & Crypto' },
  { id: 'open-source', title: 'Open Source Projects' },
  { id: 'software-testing', title: 'Software Testing' },
  { id: 'dev-tools', title: 'Developer Tools' },

  // Finance & Business
  { id: 'personal-finance', title: 'Personal Finance' },
  { id: 'stock-market', title: 'Stock Market' },
  { id: 'crypto-investing', title: 'Crypto Investing' },
  { id: 'entrepreneurship', title: 'Entrepreneurship' },
  { id: 'business-strategies', title: 'Business Strategies' },

  // Fitness & Lifestyle
  { id: 'yoga-and-meditation', title: 'Yoga & Meditation' },
  { id: 'nutrition', title: 'Nutrition & Diet' },
  { id: 'mental-health', title: 'Mental Health' },

  // Tech & Innovation
  { id: 'emerging-tech', title: 'Emerging Technologies' },
  { id: 'gadgets-reviews', title: 'Gadget Reviews' },
  { id: 'cybersecurity', title: 'Cybersecurity' },
  { id: 'robotics', title: 'Robotics' },
  { id: 'internet-of-things', title: 'IoT (Internet of Things)' },

  // Others
  { id: 'career-development', title: 'Career Development' },
  { id: 'freelancing', title: 'Freelancing & Remote Work' },
  { id: 'soft-skills', title: 'Soft Skills & Communication' },
  { id: 'project-management', title: 'Project Management' },
  { id: 'tamil-vlogs', title: 'Tamil Vlogs' }
];


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
