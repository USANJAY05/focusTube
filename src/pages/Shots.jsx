import React, { useEffect, useRef, useState } from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import fetchSearch from '../service/fetchSearch.js';
import Loading from '../components/common/Loading.jsx';
import ShotsPlayer from '../components/player/ShotsPlayer.jsx';

const Shots = () => {
  const videoRefs = useRef({});
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [click, setClick] = useState(0); // Index of the current video

  const handlePrevious = () => {
    if (click > 0) {
      setClick((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (click < items.length - 1) {
      setClick((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSearch('@Shots', setError);
        setItems(data.items || []);
      } catch (err) {
        setError('Failed to fetch videos');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full w-full dark:bg-black overflow-y-scroll relative">
      {items.length > 0 ? (
        <div className="h-full w-full flex justify-center items-center">
          <ShotsPlayer id={items[click]?.id?.videoId} />
        </div>
      ) : (
        <Loading />
      )}
      <div className="flex flex-col gap-3 fixed right-[10%] top-[45%] text-white">
        <button
          onClick={handlePrevious}
          className="dark:bg-gray-600 bg-gray-300 dark:hover:bg-gray-500 rounded-xl p-2"
          disabled={click <= 0} // Disable when at the first item
        >
          <FaArrowUp />
        </button>
        <button
          onClick={handleNext}
          className="dark:bg-gray-600 bg-gray-300 dark:hover:bg-gray-500 rounded-xl p-2"
          disabled={click >= items.length - 1} // Disable when at the last item
        >
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

export default Shots;
