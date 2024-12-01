import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Thumnail from '../components/main/Thumnail';
import count from '../utils/count.js';
import PlayList from '../components/playlist/PlayList.jsx';
import ChannelAbout from '../components/ChannelAbout.jsx';

const Channel = () => {
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelPlaylists, setChannelPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('date')
  const [error, setError] = useState(null);

  const { channelId } = useParams();
  const [active, setActive] = useState('Home');
  const items = ['Home', 'Videos', 'Playlist', 'About'];

  // Store fetched states to avoid redundant API calls
  const [fetchedVideos, setFetchedVideos] = useState(false);
  const [fetchedPlaylists, setFetchedPlaylists] = useState(false);

  // Fetch channel details only if not fetched already
  const fetchChannelDetails = async () => {
    try {
      if (!channelDetails) {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
          params: {
            part: 'snippet,contentDetails,statistics',
            id: channelId,
            key: import.meta.env.VITE_API_KEY,
          },
        });
        setChannelDetails(response.data.items[0]);
        console.log(response.data.items[0])
      }
    } catch (error) {
      setError('Error fetching channel details');
    }
  };

  // Fetch channel videos if not already fetched
  const fetchChannelVideos = async () => {
    try {
      // if (!fetchedVideos) {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            channelId: channelId,
            maxResults: 5,
            order: orderBy, // Order videos by publish date (latest first)
            key: import.meta.env.VITE_API_KEY,
          },
        });
        setChannelVideos(response.data.items);
        setFetchedVideos(true); // Mark videos as fetched
      // }
    } catch (error) {
      setError('Error fetching channel videos');
    }
  };
  

  // Fetch channel playlists if not already fetched
  const fetchChannelPlaylists = async () => {
    try {
      if (!fetchedPlaylists) {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
          params: {
            part: 'snippet',
            channelId: channelId,
            order: orderBy,
            maxResults: 5,
            key: import.meta.env.VITE_API_KEY,
          },
        });
        setChannelPlaylists(response.data.items);
        setFetchedPlaylists(true); // Mark playlists as fetched
      }
    } catch (error) {
      setError('Error fetching channel playlists');
    }
  };

  // Fetch all basic data initially
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchChannelDetails();
      setLoading(false);
    };
    fetchData();
  }, [channelId]);

  // Fetch additional data based on active tab
  useEffect(() => {
    if (active === 'Videos') {
      fetchChannelVideos();
      console.log('working')
    } else if (active === 'Playlist') {
      fetchChannelPlaylists();
    }
  }, [active, orderBy]);

  if (loading) {
    return <div>Loading channel details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Function to format subscriber count with commas
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className='w-full h-full dark:bg-black dark:text-white p-5 overflow-auto'>
      {channelDetails && (
        <section className='flex flex-wrap gap-5 p-2 '>
          <img 
            src={channelDetails.snippet.thumbnails.default.url}
            alt="channel-logo" 
            className='w-32 h-32 rounded-[100%]'
          />
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl font-bold'>{channelDetails.snippet.title}</h2>
            <p>{channelDetails.snippet.customUrl}</p>
            <p className='flex flex-wrap gap-3'>
              <span>{formatNumber(count(channelDetails.statistics.videoCount))} videos</span> 
              <span>{formatNumber(count(channelDetails.statistics.subscriberCount))} subscribers</span>
            </p>
            <button className='p-2 px-4 rounded-3xl dark:bg-slate-700 dark:hover:bg-slate-600 bg-slate-200 hover:bg-slate-400'>
              Subscribe
            </button>
          </div>
        </section>
      )}
      <section className='flex gap-5 p-2 sticky -top-6 dark:bg-[#000000E6] border-b border-slate-600'>
        {items.map((item) => (
        <p key={item} 
          className={`w-20 hover:border-b p-2 dark:text-slate-400 hover:cursor-pointer
          ${item === active ? 'border-b dark:text-white' : ''}`}
          onClick={() => setActive(item)}
        >{item}</p>
        ))}
      </section>
      {active === 'Videos' &&
      <section className='flex justify-end my-4'>
        <select onChange={(e) => setOrderBy(e.target.value)} className='dark:text-white dark:bg-black outline-none border ' name="" id="">
          <option value="date">latest</option>
          <option value="viewCount">popular</option>
        </select>
      </section>}
      
      {/* Videos Section */}
      {active === 'Videos' &&
      <section className='flex flex-wrap w-full h-full gap-[1%] dark:bg-black mt-3'>
        {/* <h3 className='w-full mb-4 text-xl'>Videos</h3> */}
        {channelVideos.map((video, idx) => (
          <div key={idx} className='xl:w-[24%] lg:w-[32%] md:w-[49%] sm:w-[100%]'>
            <Thumnail 
              thumnail={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}      
              id={video.id.videoId}     
              channel={video.snippet.channelTitle} 
              date={video.snippet.publishedAt}
            />
          </div>
        ))}
      </section>}

      {/* Playlists Section */}
      {active === 'Playlist' && <PlayList channelPlaylists={channelPlaylists} />}

      {/* About Section */}
      {active === 'About' && <ChannelAbout channelDetails={channelDetails} />}
    </div>
  );
};

export default Channel;
