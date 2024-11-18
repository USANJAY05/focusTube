import React from 'react';
import ScrollBar from '../components/scrollBar/ScrollBar';
import Thumnail from '../components/main/Thumnail';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import axios from 'axios';

const Video = () => {

  const [items, setItems] = useState([]); // Initialize with an empty array

  const active = useSelector((state) => state.scrollBarActive.value)

  const fetchData = async (key) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          maxResults: 50,
          regionCode: 'IN',
          videoCategoryId: key,
          key: 'AIzaSyDJamfG7JXMxj53vzVMAHs1PIN7RWBRRiA'
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



  const { id } = useParams();  // Correct destructuring
  return (
    <div className='flex flex-wrap p-5 gap-5 dark:bg-black overflow-auto'>
      {/* Main video section */}
      <div className='xl:w-[75%] lg:w-[75%] md:w-full flex flex-col dark:text-white gap-2'>
        {/* Video Embed */}
        <div>
        <iframe 
          className="w-full h-[calc(100vh-400px)] xl:h-[calc(100vh-300px)] rounded-lg"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen // Corrected from allowfullscreen to allowFullScreen
        ></iframe>
        </div>

        {/* Video Title and Channel Info */}
        <div className='flex flex-col gap-2'>
          <h1 className='text-xl font-bold'>
            Build Youtube Clone using React, Redux, TailwindCSS and Firebase - in Tamil
          </h1>
          <div className='flex flex-col gap-2 lg:flex-row sm:flex-row md:flex-row xl:flex-row justify-between'>
            <div className='flex gap-3 justify-between w-full xl:w-auto'>
              <div className='flex gap-2'>
                <img
                  src="https://yt3.googleusercontent.com/42f4O-tN4ZCNZfDuuq4Dto8x-MgbbJj5JqEXYlxaGt6gjO-JtTl4ilpSoSRzXWwouqP_xLk=s160-c-k-c0x00ffffff-no-rj"
                  alt="channel-logo"
                  className='w-10 h-10 rounded-3xl'
                />
                <div className='flex flex-col gap-0'>
                  <h3>Tamil Tech</h3>
                  <small className='text-gray-400 -mt-2'>4.5M subscribers</small>
                </div>
              </div>
              <button className='px-3 py-1 rounded-3xl dark:bg-gray-700' aria-label="Subscribe">
                Subscribe
              </button>
            </div>
            <div className='flex gap-3'>
              <button className='px-3 py-1 rounded-3xl dark:bg-gray-700' aria-label="Like">
                Like
              </button>
              <button className='px-3 py-1 rounded-3xl dark:bg-gray-700' aria-label="Dislike">
                Dislike
              </button>
              <button className='px-3 py-1 rounded-3xl dark:bg-gray-700' aria-label="Share">
                Share
              </button>
              <button className='px-3 py-1 rounded-3xl dark:bg-gray-700' aria-label="Save">
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div>
          <p className='bg-gray-700 overflow-auto rounded-xl h-40'>
            1,043,793 views  Nov 16, 2024
            Dhanush reportedly sent a legal notice to the team behind the documentary, alleging that they used the clips and songs without obtaining proper permissions or a No Objection Certificate (NOC) from him. Since he holds the rights to the film, his permission was legally required.
          </p>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className='text-xl font-bold mb-3'>3430 Comments</h2>
          <div className='flex flex-col gap-3'>
            <div className='flex justify-between gap-2'>
              <img
                src="https://yt3.googleusercontent.com/CDlzAR4NNxsq4YDkEjA-rhrt7faVAm69EvY0UyAqCN0A9NAxK1K9R7msDL6z5P-H5MVs6Nroew=s160-c-k-c0x00ffffff-no-rj"
                alt="user-profile"
                className='w-10 h-10 rounded-3xl'
              />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptate laboriosam natus. Adipisci earum molestias facere unde eligendi asperiores impedit voluptates? Commodi voluptates magnam necessitatibus in optio facilis soluta dolorum?</p>
              <button>Click</button>
            </div>
            <div className='flex justify-between gap-2'>
              <img
                src="https://yt3.googleusercontent.com/CDlzAR4NNxsq4YDkEjA-rhrt7faVAm69EvY0UyAqCN0A9NAxK1K9R7msDL6z5P-H5MVs6Nroew=s160-c-k-c0x00ffffff-no-rj"
                alt="user-profile"
                className='w-10 h-10 rounded-3xl'
              />
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas voluptate laboriosam natus. Adipisci earum molestias facere unde eligendi asperiores impedit voluptates? Commodi voluptates magnam necessitatibus in optio facilis soluta dolorum?</p>
              <button>Click</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Section */}
      <div className='xl:w-[23%] lg:w-[22%] flex flex-col overflow-auto'>
        {/* ScrollBar */}
        <div className='flex overflow-x-auto'>
          <ScrollBar />
        </div>

        {/* Thumbnails */}
        <div className='w-full flex md:flex-row md:flex-wrap flex-col gap-4'>
        {items.map((item) => (
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
        ))}
        </div>
      </div>
    </div>
  );
}

export default Video;