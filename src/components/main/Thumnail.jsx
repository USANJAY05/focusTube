import moment from 'moment';
import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';
import count from '../../utils/count.js'

const Thumnail = ({ channelId, channel, thumnail, title, views, date, id }) => {

  // Ensure 'title' is defined and a string
  const safeTitle = title || 'Untitled'; // Fallback in case 'title' is undefined or null

  return (
    <div className='dark:text-white w-full bg-blue-600 mt-1 hover:cursor-pointer rounded-lg dark:active:bg-gray-900 active:bg-gray-200'>
      <Link to={`/video/${id}`}>
        <img
          src={thumnail}
          alt="thumnail"
          className='rounded-lg w-[100%]'
        />
      </Link>
      <div className='flex justify-between mt-2 pl-5'>
          <div className='inline-block w-full'>
            {/* Safe title check */}
            <Link to={`/video/${id}`}>
              <h2 className='font-bold'>
                {safeTitle.length < 60 ? safeTitle : `${safeTitle.slice(0, 55)}...`}
              </h2>
            </Link>
            <Link to={`/channel/${channelId}`}>
              <p className='text-sm text-gray-400 dark:hover:text-white hover:text-black'>
                <abbr className='no-underline' title={channel}>{channel}</abbr>
              </p>
            </Link>
            <p className='text-sm text-gray-400'>
              {count(views)} * {moment(date).fromNow()}
            </p>
          </div>
        <div className=''>
          <BsThreeDotsVertical className='dark:hover:bg-gray-600 p-2 box-content rounded-2xl' />
        </div>
      </div>
    </div>
  );
};

export default Thumnail;