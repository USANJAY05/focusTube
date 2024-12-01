import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ScrollBar from '../components/scrollBar/ScrollBar';
import Thumnail from '../components/main/Thumnail';
import Player from '../components/video/Player.jsx';
import VideoDetails from '../components/video/VideoDetails.jsx';
import { CommentSection } from '../components/video/CommentSection.jsx';

const Video = () => {
  const { id } = useParams(); // Correct destructuring
  const [videoData, setVideoData] = useState(null); // Initialize as null to handle loading state
  const [items, setItems] = useState([]); // Initialize with an empty array
  const [channelData, setChannelData] = useState(null); // Initialize as null to handle loading state
  const [commentData, setCommentData] = useState(null); // Initialize comment data

  const API = import.meta.env.VITE_API_KEY;
  const active = useSelector((state) => state.scrollBarActive.value);

  // Fetch video data
  const fetchVideoData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video data: ', error);
      return null;
    }
  };

  // Fetch channel data
  const fetchChannelData = async (channelId) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching channel data: ', error);
      return null;
    }
  };

  // Fetch comment data
  const fetchCommentData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${API}`);
      return response.data;
    } catch (error) {
      console.log(`Error fetching comment data: ${error}`);
      return null;
    }
  };

  // Fetch related videos data
  const fetchData = async (key) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/videos`, {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          maxResults: 20,
          regionCode: 'IN',
          videoCategoryId: key,
          key: API,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching related videos: ', error);
      return null;
    }
  };

  // Fetch data when active or videoId changes
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(active);
      if (data) {
        setItems(data.items); // Set the fetched items
      }
    };

    getData();
  }, [active]);

  // Fetch video data and channel data when video id changes
  useEffect(() => {
    const getVideoData = async () => {
      const data = await fetchVideoData();
      if (data) {
        setVideoData(data.items[0]); // Assuming the data contains an array of items
        const channelData = await fetchChannelData(data.items[0].snippet.channelId);
        if (channelData) {
          setChannelData(channelData.items[0]); // Assuming data contains a single channel item
        }
        const commentData = await fetchCommentData();
        if (commentData) {
          setCommentData(commentData);
        }
      }
    };

    getVideoData();
  }, [id]); // This will refetch video data if the video id changes

  if (!videoData || !channelData) {
    return <div className='dark:bg-black dark:text-white'>Loading...</div>; // Handle loading state until video and channel data is fetched
  }

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
          <p className="bg-gray-800 p-1 overflow-auto rounded-xl h-40">
            {videoData.snippet.description || 'No description available'}
          </p>
        </div>
        {/* Comments Section */}
        <CommentSection videoData={videoData} commentData={commentData}/>
      </div>

      {/* Sidebar Section */}
      <div className="xl:w-[23%] lg:w-[22%] flex flex-col overflow-auto">
        {/* ScrollBar */}
        <div className="flex overflow-x-auto">
          <ScrollBar />
        </div>

        {/* Thumbnails */}
        <div className="w-full  flex md:flex-row md:flex-wrap flex-col gap-4">
          {items.map((item) => (
          <div key={item.id}>
            <Thumnail
              id={item.id}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
              logo={''}
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