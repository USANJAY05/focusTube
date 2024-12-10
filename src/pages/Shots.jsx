import React, { useEffect, useRef, useState } from 'react';
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import fetchSearch from '../service/fetchSearch.js';

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
        console.log(data.items[0].id.videoId,'hiiiiii')
      } catch (err) {
        setError('Failed to fetch videos');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full w-full bg-black overflow-y-scroll relative">
      {/* {items.map((item) => ( */}
      {items.length>0 ?
        <div
          className="h-full w-full flex justify-center items-center"
        >
          <iframe
            className="h-full sm:w-[37%] md:w-[400px] w-full rounded-xl"
            src={`https://www.youtube.com/embed/${items[press].id.videoId}?enablejsapi=1&autoplay=1&controls=0&loop=1&rel=0&fs=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            // ref={(el) => (videoRefs.current[items[0].id.videoId] = el)}
            allowFullScreen
          ></iframe>
        </div>:'loading'}
      {/* ))}  */}
      <div className="flex flex-col gap-3 fixed right-[10%] top-[45%] text-white">
        <button 
            onClick={() => setPress(press - 1)}
            className="bg-gray-600 hover:bg-gray-500 rounded-xl p-2">
          <FaArrowUp />
        </button>
        <button 
            onClick={() => setPress(press +1)}
            className="bg-gray-600 hover:bg-gray-500 rounded-xl p-2">
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

export default Shots;
