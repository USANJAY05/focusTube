import React, { useEffect, useState } from 'react';
import Thumnail from './Thumnail';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { setScrollActive } from '../../redux/slice/scrollBarActive-slice';
import { useDispatch, useSelector } from 'react-redux';


const Right = ({ sideBar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [items, setItems] = useState([]);
  const active = useSelector((state) => state.scrollBarActive.value);

  // Fetch popular videos for 'Trending'
  const fetchData = async (key) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'IN',
          videoCategoryId: key || 1,
          key: import.meta.env.VITE_API_KEY,
        },
      });
      console.log(response.data.items)
      return response.data;
    } catch (error) {
      console.error('Error fetching data: ', error);
      return null;
    }
  };

  // Fetch tech-related videos for 'Home'
  const fetchDataHome = async (query) => {
    console.log(query)
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/search`, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: query || 'tamil tech',  // Default query if 'active' is empty
          regionCode: 'IN',
          order:'date',
          type: 'video',
          key: import.meta.env.VITE_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      console.log(typeof active)
      let data = null;
      if (sideBar === 'Trending') {
        if(typeof active === 'string'){
          dispatch(setScrollActive(0))
        }
        data = await fetchData(active);
      } else if (sideBar === 'Home') {
        if(typeof active === 'number'){
          dispatch(setScrollActive('@tamil-tech'))
        }
        data = await fetchDataHome(active);
      }
      else if(sideBar ==='Music'){
        data = await fetchData(10)
      }
      else if(sideBar === 'Movies'){
        data = await fetchData(1);
      }
      else if(sideBar === 'Live'){
        data = await fetchDataHome('@Live-tamil')
      }
       else {
        navigate('/not-found'); // Redirect to a not-found page
      }

      if (data && data.items) {
        setItems(data.items);
      } else {
        setItems([]); // Clear items if no data is available
      }
    };
    getData();
  }, [active, sideBar, navigate]);

  return (
    <div className='flex flex-wrap w-full h-full gap-[1%] dark:bg-black overflow-auto'>
      {items.length > 0 ? (
        items.map((item) => {
          const videoId = item.id.videoId || item.id;
          const views = item.statistics?.viewCount || 'N/A';
          return (
            <div key={videoId} className='xl:w-[24%] lg:w-[32%] md:w-[49%] sm:w-full flex-grow'>
              <Thumnail
                channelId={item.snippet.channelId}
                id={videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                logo={''}
                thumnail={item.snippet.thumbnails.medium.url}
                date={item.snippet.publishedAt}
                views={views}
              />
            </div>
          );
        })
      ) : (
        <div className='text-center w-full text-white'>
          {sideBar} comming soon
        </div>
      )}
    </div>
  );
};

export default Right;
