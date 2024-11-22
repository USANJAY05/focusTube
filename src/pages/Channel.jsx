import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Thumnail from '../components/main/Thumnail';
import { RiPlayList2Fill } from "react-icons/ri";
import convertDate from '../utils/isoDateConverter.js'

const Channel = () => {
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelPlaylists, setChannelPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
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
      if (!fetchedVideos) {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            channelId: channelId,
            maxResults: 5,
            key: import.meta.env.VITE_API_KEY,
          },
        });
        setChannelVideos(response.data.items);
        setFetchedVideos(true); // Mark videos as fetched
      }
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
    } else if (active === 'Playlist') {
      fetchChannelPlaylists();
    }
  }, [active]);

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
            <h2>{channelDetails.snippet.title}</h2>
            <p className='flex flex-wrap gap-3'>
              <span>{formatNumber(channelDetails.statistics.videoCount)} videos</span> 
              <span>{formatNumber(channelDetails.statistics.subscriberCount)} subscribers</span>
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
      {active === 'Playlist' &&
      <section className='flex flex-wrap w-full  gap-[1%] dark:bg-black '>
        {/* <h3 className='w-full mb-4 text-xl'>Playlists</h3> */}
        {channelPlaylists && channelPlaylists.length > 0 ? (
          channelPlaylists.map((playlist, idx) => (
            <div key={idx} className='xl:w-[24%] lg:w-[32%] md:w-[49%] sm:w-[100%] mt-5'>
              <div className='p-1 active:dark:bg-gray-800'>
                <div className='relative rounded-md'>
                  <div className='absolute w-1/2 h-full bg-[#000000CC] flex justify-center items-center hover:w-full'>
                    <RiPlayList2Fill className='dark:text-white w-1/2 text-xl' />
                  </div>
                  <img 
                    src={playlist.snippet.thumbnails.medium.url}
                    alt={playlist.snippet.title} 
                    className='w-full rounded-md'
                  />
                </div>
                <h4 className='mt-2 text-lg font-semibold'>{playlist.snippet.title}</h4>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{playlist.snippet.channelTitle}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No playlists found for this channel.</p>
        )}
      </section>}
        {active === 'About' &&
      <section>
        {channelDetails&&(
        <div className='flex flex-col gap-5 mt-5'>
          <div>
            <h2 className='font-bold text-2xl  mb-2'>Description</h2>
            <p>{channelDetails.snippet.description}</p>
          </div>
          <div>
            <h2 className='font-bold text-2xl mb-2'>Statistics</h2>
            <table className="border border-gray-300 border-collapse w-full mb-3">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Subscriber Count</th>
                <th className="border border-gray-300 p-2">Video Count</th>
                <th className="border border-gray-300 p-2">View Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  {channelDetails.statistics.subscriberCount}
                </td>
                <td className="border border-gray-300 p-2">
                  {channelDetails.statistics.videoCount}
                </td>
                <td className="border border-gray-300 p-2">
                  {channelDetails.statistics.viewCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h2 className='font-bold text-2xl mb-2'>Created At</h2>
          <p>{convertDate(channelDetails.snippet.publishedAt)}</p>
        </div>


{/* 
            <li className='flex gap-2'><p>Subscribers count: </p>{channelDetails.statistics.subscriberCount}</li>
            <li className='flex gap-2'><p>Video Count: </p>{channelDetails.statistics.videoCount}</li>
            <li className='flex gap-2'><p>View Count: </p>{channelDetails.statistics.viewCount}</li> */}
          {/* </table> */}
        </div>
        )}
      </section>}
    </div>
  );
};

export default Channel;
