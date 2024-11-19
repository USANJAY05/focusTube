import moment from 'moment';
import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router';

const Thumnail = ({channel, logo, thumnail, title, views, date, id}) => {
    const navigate = useNavigate()
    const viewCount = (views) => {
        if (views >= 1000000) {
            return (views / 1000000).toFixed(1) + 'M';
        } else if (views >= 1000) {
            return (views / 1000).toFixed(1) + 'K'; 
        } else {
            return views; 
        }
    };
  return (
    <div className='dark:text-white flex-grow  mt-1  '
        onClick={() => navigate(`/video/${id}`)}
    >
        <img src={thumnail}
            alt="thumnail"
            className='rounded-lg w-[100%]'
        />            
        <div className='flex flex-wrap justify-between mt-2'>
            <div className='rounded-3xl'>
                <img 
                    src={logo} 
                    alt="channel-logo" 
                    className='rounded-3xl w-10 h-10' 
                />
            </div>
            <div className='inline-block w-[calc(100%-70px)]'>
                <h2 className='font-bold'>{title.length<60?title:title.slice(0,55)+'...'}</h2>
                <p className='text-sm text-gray-400'>{channel}</p>
                <p className='text-sm text-gray-400'>{viewCount(views)} {moment(date).fromNow()}</p>
            </div>
            <div>
                <BsThreeDotsVertical />
            </div>
        </div>
  </div>  )
}

export default Thumnail