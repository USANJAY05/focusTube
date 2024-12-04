import React, { useEffect, useState } from 'react';
import Thumnail from './Thumnail';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { setScrollActive } from '../../redux/slice/scrollBarActive-slice';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../../service/fetchData.js'
import fetchSearch from '../../service/fetchSearch.js'


const Right = ({ sideBar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null)
  const active = useSelector((state) => state.scrollBarActive.value);

  const content =['Fitness', 'Sports', 'Gaming', 'News', 'Course', 'Podcast', 'Shoping', 'Live', 'Movies', 'Music'];

  useEffect(() => {
    const getData = async () => {
      console.log(typeof active)
      let data = null;
      if (sideBar === 'Trending') {
        if(typeof active === 'string'){
          dispatch(setScrollActive(0))
        }
        data = await fetchData(active,setError);
      } else if (sideBar === 'Home') {
        if(typeof active === 'number'){
          dispatch(setScrollActive('@tamil-tech'))
        }
        data = await fetchSearch(active,setError);
      }
      else if(content.includes(sideBar)){
        data = await fetchSearch('@'+sideBar, setError)
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
      {(items.length > 0 && error ===null  )? (
        items.map((item) => {
          const videoId = item.id.videoId || item.id;
          const views = item.statistics?.viewCount || 'N/A';
          return (
            <div key={videoId} className='xl:w-[24%] lg:w-[32%] md:w-[49%] sm:w-full'>
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
        error === null ?(
          <div className='text-center w-full text-white'>
          {sideBar} comming soon
        </div>
        ):(
          <div className='text-center w-full text-white'>
          failed to load {sideBar}
        </div>
        )

      )}
    </div>
  );
};

export default Right;
