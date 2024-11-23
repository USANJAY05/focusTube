import React, { useEffect, useState } from 'react';
import Thumnail from './Thumnail';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Right = () => {
  const [items, setItems] = useState([]); // Initialize with an empty array
  console.log(items)

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
          key: import.meta.env.VITE_API_KEY
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
    <div className='flex flex-wrap w-full h-full gap-[1%]  dark:bg-black overflow-auto'>
      {items.map((item) => (
        <div key={item.id} className='xl:w-[24%] lg:w-[32%] md:w-[49%] sm:w-full bg-red-400 flex-grow'>
          <Thumnail
            channelId={item.snippet.channelId}
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
      <div className='flex flex-wrap gap-[1%] '>
      {/* <div className='xl:w-[24%] lg:w-[32%] md:w-[49%] sm:w-[100%]'>
          <Thumnail
                channelId={''}
                id={'id'}
                title={''}
                channel={''}
                logo={''}
                thumnail={'https://pbs.twimg.com/media/D457oyrUEAAb-nI.jpg'}
                date={''}
                views={''} // Access statistics from the correct field
              />
      </div> */}
        
      </div>
    </div>
  );
};

export default Right;