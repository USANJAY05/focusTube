import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ScrollBar from '../components/scrollBar/ScrollBar';
import Thumnail from '../components/main/Thumnail';
import Player from '../components/video/Player.jsx';
import VideoDetails from '../components/video/VideoDetails.jsx';
import { CommentSection } from '../components/video/CommentSection.jsx';
import fetchSearch from '../service/fetchSearch.js';
import fetchCommentData from '../service/fetchCommentData.js';
import Loading from '../components/common/Loading.jsx';

const Video = () => {
  const { id } = useParams(); // Destructure video ID from URL parameters
  const [videoData, setVideoData] = useState(null); // Video data
  const [items, setItems] = useState([]); // Related videos/items
  const [channelData, setChannelData] = useState(null); // Channel data
  const [commentData, setCommentData] = useState(null); // Comments data
  const [error, setError] = useState(null); // Error state

  const API = import.meta.env.VITE_API_KEY;
  const active = useSelector((state) => state.scrollBarActive.value);

  // Utility function to fetch data
  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
      return null;
    }
  };

  // Fetch video data
  const fetchVideoData = async () => {
    const url = `${import.meta.env.VITE_API_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API}`;
    return await fetchData(url);
  };

  // Fetch channel data
  const fetchChannelData = async (channelId) => {
    const url = `${import.meta.env.VITE_API_URL}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API}`;
    return await fetchData(url);
  };

  // Fetch related items when active state changes
  useEffect(() => {
    const getData = async () => {
      const data = await fetchSearch('errormakesclever', setError);
      if (data) {
        setItems(data.items); // Set fetched related items
      }
    };

    getData();
  }, [active]);

  // Fetch video and channel data when video ID changes
  useEffect(() => {
    const getVideoData = async () => {
      const videoData = await fetchVideoData();
      if (videoData) {
        const videoItem = videoData.items?.[0];
        setVideoData(videoItem);

        if (videoItem) {
          const channelData = await fetchChannelData(videoItem.snippet.channelId);
          if (channelData) {
            setChannelData(channelData.items?.[0]);
          }
        }

        const commentData = await fetchCommentData(id);
        if (commentData) {
          setCommentData(commentData);
        }
      }
    };

    getVideoData();
  }, [id]);

  // Handle loading and error states
  if (error) {
    return <div className="text-red-500">An error occurred: {error.message}</div>;
  }

  if (!videoData || !channelData) {
    return <div className='w-full h-full dark:bg-black'><Loading /></div>;
  }

  // Render the component
  return (
    <div className="flex flex-wrap sm:p-5 xs-p-5 gap-5 dark:bg-black overflow-auto w-full">
      {/* Main video section */}
      <div className="xl:w-[75%] lg:w-[75%] md:w-full w-full flex flex-col dark:text-white gap-2">
        {/* Video Embed */}
        <Player id={id} />
        {/* Video Title and Channel Info */}
        <VideoDetails videoData={videoData} channelData={channelData} />
        {/* Video Description */}
        <div>
          <p className="bg-gray-100 dark:bg-gray-800 p-1 overflow-auto rounded-xl h-40">
            {videoData?.snippet?.description || 'No description available'}
          </p>
        </div>
        {/* Comments Section */}
        <CommentSection videoData={videoData} commentData={commentData} />
      </div>

      {/* Sidebar Section */}
      <div className="xl:w-[23%] lg:w-[22%] flex flex-col overflow-auto">
        {/* ScrollBar */}
        <div className="flex overflow-x-auto">
          <ScrollBar />
        </div>

        {/* Thumbnails */}
        <div className="w-full flex md:flex-row md:flex-wrap flex-col gap-4">
          {items.map((item, idx) => (
            <div key={idx}>
              <Thumnail
                id={item.id}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
                logo=""
                thumnail={item.snippet.thumbnails.medium.url}
                date={item.snippet.publishedAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Video;
