import React, { useEffect, useState } from 'react';
import Thumnail from './Thumnail';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Right = () => {
  const [items, setItems] = useState([]); // Initialize with an empty array

  const active = useSelector((state) => state.scrollBarActive.value)

  const fetchData = async (key) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'IN',
          videoCategoryId: key,
          key: 'AIzaSyDbwET5BMato6uX2Y1-8nZqR9YydeRErm8'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(active);
      if (data) {
        setItems(data.items); // Set the fetched items
      }
    };

    getData();
  }, [active]);

  return (
    <div className='flex flex-wrap w-full h-full gap-5 xl:p-2 lg:p-2 sm:p-2 dark:bg-black overflow-auto'>
      {items.map((item) => (
        <div className='w-[calc(80%)] flex-grow sm:w-[calc(90%)] md:w-[calc(44%)] lg:w-[calc(30%)] xl:w-[min(20%,350px)] flex flex-col' >
          <Thumnail
            key={item.id}
            id={item.id}
            title={item.snippet.title}
            channel={item.snippet.channelTitle}
            logo={''}
            thumnail={item.snippet.thumbnails.medium.url}
            date={item.snippet.publishedAt}
            views={item.statistics.viewCount} // Access statistics from the correct field
          />
        </div>
      ))}
    </div>
  );
};

export default Right;