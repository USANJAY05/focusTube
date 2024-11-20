import moment from 'moment';
import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Thumnail = ({ channel, logo, thumnail, title, views, date, id }) => {
  const viewCount = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    } else {
      return views;
    }
  };

  // Ensure 'title' is defined and a string
  const safeTitle = title || 'Untitled'; // Fallback in case 'title' is undefined or null

  return (
    <div className='dark:text-white flex-grow mt-1 hover:cursor-pointer'>
      <Link to={`/video/${id}`}>
        <img
          src={thumnail}
          alt="thumnail"
          className='rounded-lg w-[100%]'
        />
      </Link>
      <div className='flex justify-between mt-2 pl-5'>
        <Link to={`/video/${id}`}>
          <div className='inline-block w-[calc(100%)]'>
            {/* Safe title check */}
            <h2 className='font-bold'>
              {safeTitle.length < 60 ? safeTitle : `${safeTitle.slice(0, 55)}...`}
            </h2>
            <p className='text-sm text-gray-400 dark:hover:text-white hover:text-black'>
              <abbr className='no-underline' title={channel}>{channel}</abbr>
            </p>
            <p className='text-sm text-gray-400'>
              {viewCount(views)} * {moment(date).fromNow()}
            </p>
          </div>
        </Link>
        <div className=''>
          <BsThreeDotsVertical className='dark:hover:bg-gray-600 p-2 box-content rounded-2xl' />
        </div>
      </div>
    </div>
  );
};

export default Thumnail;