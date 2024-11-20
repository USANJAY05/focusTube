import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ScrollBar from '../components/scrollBar/ScrollBar';
import Thumnail from '../components/main/Thumnail';
import moment from 'moment';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import count from '../utils/count.js'

const Video = () => {
  const { id } = useParams(); // Correct destructuring
  const [videoData, setVideoData] = useState(null); // Initialize as null to handle loading state
  const [items, setItems] = useState([]); // Initialize with an empty array
  const [channelData, setChannelData] = useState(null); // Initialize as null to handle loading state
  const [commentData, setCommentData] = useState(null); // Initialize comment data

  const API = 'AIzaSyDbwET5BMato6uX2Y1-8nZqR9YydeRErm8';
  const active = useSelector((state) => state.scrollBarActive.value);

  // Fetch video data
  const fetchVideoData = async () => {
    try {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video data: ', error);
      return null;
    }
  };

  // Fetch channel data
  const fetchChannelData = async (channelId) => {
    try {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching channel data: ', error);
      return null;
    }
  };

  // Fetch comment data
  const fetchCommentData = async () => {
    try {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${API}`);
      return response.data;
    } catch (error) {
      console.log(`Error fetching comment data: ${error}`);
      return null;
    }
  };

  // Fetch related videos data
  const fetchData = async (key) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          maxResults: 50,
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
    return <div>Loading...</div>; // Handle loading state until video and channel data is fetched
  }

  return (
    <div className="flex flex-wrap sm:p-5 xs-p-5 gap-5 dark:bg-black overflow-auto">
      {/* Main video section */}
      <div className="xl:w-[75%] lg:w-[75%] md:w-full flex flex-col dark:text-white gap-2">
        {/* Video Embed */}
        <div>
          <iframe
            className="w-full sm:h-[calc(100vh-400px)] h-[37vh] xl:h-[calc(100vh-300px)] rounded-lg"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Title and Channel Info */}
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">{videoData.snippet.title}</h1>
          <p>{count(videoData.statistics.viewCount)} Views &bull; {moment(videoData.snippet.publishedAt).fromNow()}</p>
          <div className="flex flex-col gap-2 lg:flex-row sm:flex-row md:flex-row xl:flex-row justify-between">
            <div className="flex gap-3 justify-between w-full xl:w-auto">
              <div className="flex gap-2">
                <img
                  src={channelData.snippet.thumbnails.default.url} // Use channel thumbnail from channel data
                  alt="channel-logo"
                  className="w-10 h-10 rounded-3xl"
                />
                <div className="flex flex-col gap-0">
                  <h3>{channelData.snippet.title}</h3>
                  <small className="text-gray-400 -mt-2">{count(channelData.statistics.subscriberCount)} subscribers</small>
                </div>
              </div>
              <button className="px-3 py-1 rounded-3xl dark:bg-gray-700" aria-label="Subscribe">
                Subscribe
              </button>
            </div>
            <div className="flex gap-3">
              <button className="px-3  py-1 rounded-3xl flex gap-2 items-center dark:bg-gray-700" aria-label="Like">
              <AiOutlineLike className='h-6 w-6' />
               {count(videoData.statistics.likeCount)}
               <div className='border-r border-red-500'></div>
              <AiOutlineDislike className='h-6 w-6' />
              </button>
              {/* <button className="px-3 py-1 rounded-3xl dark:bg-gray-700" aria-label="Dislike">
                Dislike
              </button> */}
              <button className="px-3 py-1 rounded-3xl dark:bg-gray-700" aria-label="Share">
                Share
              </button>
              <button className="px-3 py-1 rounded-3xl dark:bg-gray-700" aria-label="Save">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div>
          <p className="bg-gray-700 overflow-auto rounded-xl h-40">
            {videoData.snippet.description || 'No description available'}
          </p>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-xl font-bold mb-3">{videoData.statistics.commentCount} Comments</h2>
          <div className="flex flex-wrap gap-3">
            {commentData && commentData.items.map((comment, index) => (
              <div className="flex gap-2 xl:w-1/3 flex-grow items-center bg-gray-700 p-2 rounded-xl" key={index}>
                <img
                  src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
                  alt="user-profile"
                  className="w-10 h-10 rounded-3xl"
                />
                <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                <button>Reply</button>
              </div>
            ))}
          </div>
        </div>
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