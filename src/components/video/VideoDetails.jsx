import React from 'react'
import moment from 'moment';
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import count from '../../utils/count.js'
import { PiShareFat } from "react-icons/pi";
import { GoBookmark } from "react-icons/go";
import { Link } from 'react-router-dom';

const VideoDetails = ({videoData,channelData}) => {
  return (
    <div className="flex flex-col gap-2">
    <h1 className="text-xl font-bold">{videoData.snippet.title}</h1>
    <p>{count(videoData.statistics.viewCount)} Views &bull; {moment(videoData.snippet.publishedAt).fromNow()}</p>
    <div className="flex flex-col gap-2 lg:flex-row sm:flex-row md:flex-row xl:flex-row justify-between">
      <div className="flex gap-3 justify-between w-full xl:w-auto">
        <div className="flex gap-2">
          <Link to={`/channel/${channelData.id}`} >
            <img
              src={channelData.snippet.thumbnails.default.url} // Use channel thumbnail from channel data
              alt="channel-logo"
              className="w-10 h-10 rounded-3xl"
            />
          </Link>
          <div className="flex flex-col gap-0">
            <Link to={`/channel/${channelData.id}`} >
              <h3>{channelData.snippet.title}</h3>
            </Link>
            <small className="text-gray-400 -mt-2">{count(channelData.statistics.subscriberCount)} subscribers</small>
          </div>
        </div>
        <button className="px-3 py-1 rounded-3xl bg-red-600 text-white dark:bg-gray-700" aria-label="Subscribe">
          Subscribe
        </button>
      </div>
      <div className="flex gap-3">
        <button className="px-3  py-1 rounded-3xl flex gap-2 items-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-800" aria-label="Like">
        <AiOutlineLike className='h-6 w-6' />
         {count(videoData.statistics.likeCount)}
         <div className='border-r border-red-500'></div>
        <AiOutlineDislike className='h-6 w-6' />
        </button>
        <button className="px-3 py-1 rounded-3xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 flex gap-2 items-center" aria-label="Share">
        <PiShareFat className='w-5 h-5' />Share
        </button>
        <button className="px-3 py-1 rounded-3xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 flex gap-2 items-center" aria-label="Save">
        <GoBookmark className='w-5 h-5' /> Save
        </button>
      </div>
    </div>
  </div>

  )
}

export default VideoDetails