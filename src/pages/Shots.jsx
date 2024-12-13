import React, { useEffect, useRef, useState } from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import fetchSearch from '../service/fetchSearch.js';
import Loading from '../components/common/Loading.jsx';
import ShotsPlayer from '../components/player/ShotsPlayer.jsx';

const Shots = () => {
  const videoRefs = useRef({});
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [press, setPress] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSearch('@Shots', setError);
        setItems(data.items || []);
        // console.log(data.items[0].id.videoId,'hiiiiii')
      } catch (err) {
        setError('Failed to fetch videos');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full w-full dark:bg-black overflow-y-scroll relative">
      {items.length>0 ?
        <div
          className="h-full w-full flex justify-center items-center"
        >
          <ShotsPlayer id={items[press].id.videoId} />
        </div>:<Loading />}
      <div className="flex flex-col gap-3 fixed right-[10%] top-[45%] text-white">
        <button 
            onClick={() => setPress(press - 1)}
            className="dark:bg-gray-600 bg-gray-300 dark:hover:bg-gray-500 rounded-xl p-2">
          <FaArrowUp />
        </button>
        <button 
            onClick={() => setPress(press +1)}
            className="dark:bg-gray-600 bg-gray-300 dark:hover:bg-gray-500 rounded-xl p-2">
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

export default Shots;
