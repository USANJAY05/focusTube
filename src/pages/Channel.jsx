import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Thumnail from '../components/main/Thumnail';
import PlayList from '../components/playlist/PlayList.jsx';
import ChannelAbout from '../components/ChannelAbout.jsx';
import count from '../utils/count.js';
import fetchChannelDetails from '../service/fetchChannelDetails.js';
import fetchChannelPlaylists from '../service/fetchChannelPlayList.js';
import fetchChannelVideos from '../service/fetchChannelVideos.js';

const Channel = () => {
  const [channelDetails, setChannelDetails] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [channelPlaylists, setChannelPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState('date');
  const [error, setError] = useState(null);

  const { channelId } = useParams();
  const [active, setActive] = useState('Home');
  const items = ['Home', 'Videos', 'Playlist', 'About'];

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const [data, err] = await fetchChannelDetails(channelId);
      if (err) {
        setError(data);
      } else {
        setChannelDetails(data);
      }
      setLoading(false);
    };
    fetchDetails();
  }, [channelId]);

  useEffect(() => {
    const fetchData = async () => {
      if (active === 'Videos') {
        const [data, err] = await fetchChannelVideos(channelId, orderBy);
        if (err) setError(data);
        else setChannelVideos(data);
      } else if (active === 'Playlist') {
        const [data, err] = await fetchChannelPlaylists(channelId);
        if (err) setError(data);
        else setChannelPlaylists(data);
      }
    };
    fetchData();
  }, [active, orderBy, channelId]);

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  if (loading) return <div className="text-center p-10">Loading channel details...</div>;
  if (error) return <div className="text-center text-red-500 p-10">{error}</div>;

  return (
    <div className="w-full h-full dark:bg-black dark:text-white p-5 overflow-auto">
      {/* Channel Header Section */}
      {channelDetails && (
        <section className="flex flex-wrap gap-5 items-start p-4">
          <img
            src={channelDetails.snippet.thumbnails.default.url}
            alt="channel-logo"
            className="w-32 h-32 rounded-full"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold">{channelDetails.snippet.title}</h2>
            <p className="text-gray-500 dark:text-gray-400">@{channelDetails.snippet.customUrl}</p>
            <p className="flex flex-wrap gap-3 text-gray-700 dark:text-gray-300">
              <span>{formatNumber(count(channelDetails.statistics.videoCount))} videos</span>
              <span>{formatNumber(count(channelDetails.statistics.subscriberCount))} subscribers</span>
            </p>
            <button className="p-2 px-4 rounded-full bg-blue-500 text-white hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </section>
      )}

      {/* Tab Navigation */}
      <section className="flex gap-5 p-2 sticky -top-6 bg-white dark:bg-black z-10 border-b border-gray-300 dark:border-gray-700">
        {items.map((item) => (
          <p
            key={item}
            className={`cursor-pointer pb-2 px-4 text-gray-600 dark:text-gray-400 ${
              item === active
                ? 'border-b-2 border-blue-500 text-blue-500 dark:text-blue-400'
                : 'hover:text-gray-800 dark:hover:text-white'
            }`}
            onClick={() => setActive(item)}
          >
            {item}
          </p>
        ))}
      </section>

      {/* Videos Section */}
      {active === 'Videos' && (
        <>
          <section className="flex justify-end my-4">
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              className="border border-gray-300 dark:border-gray-700 rounded px-3 py-1 bg-white dark:bg-black dark:text-white"
            >
              <option value="date">Latest</option>
              <option value="viewCount">Popular</option>
            </select>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
            {channelVideos.map((video, idx) => (
              <Thumnail
                key={idx}
                thumnail={video.snippet.thumbnails.medium.url}
                title={video.snippet.title}
                id={video.id.videoId}
                channel={video.snippet.channelTitle}
                date={video.snippet.publishedAt}
              />
            ))}
          </section>
        </>
      )}

      {/* Playlist Section */}
      {active === 'Playlist' && (
        <section className="mt-5">
          <PlayList channelPlaylists={channelPlaylists} />
        </section>
      )}

      {/* About Section */}
      {active === 'About' && (
        <section className="mt-5">
          <ChannelAbout channelDetails={channelDetails} />
        </section>
      )}
    </div>
  );
};

export default Channel;
