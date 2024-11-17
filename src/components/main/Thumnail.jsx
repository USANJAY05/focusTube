import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

const Thumnail = ({channel, logo, thumnail, title, views, date}) => {
  return (
    <div className='dark:text-white w-[80%] sm:w-[90%] md:w-[45%] lg:w-[44%] xl:w-[30%] flex flex-col mt-8 m-[10%] sm:m-[5%] md:m-[2.5%] lg:m-[3%] xl:m-[1.65%] '>
        <img src={thumnail}
            alt="thumnail"
            className='rounded-lg h-[100vh-52] w-[100vh-10]'
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
                <p className='text-sm text-gray-400'>{views} {date}</p>
            </div>
            <div>
                <BsThreeDotsVertical />
            </div>
        </div>
  </div>  )
}

export default Thumnail