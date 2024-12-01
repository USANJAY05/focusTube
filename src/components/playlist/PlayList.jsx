import React from 'react'
import { RiPlayList2Fill } from "react-icons/ri";

const PlayList = ({channelPlaylists}) => {
  return (
    <section className='flex flex-wrap w-full  gap-[1%] dark:bg-black '>
     {channelPlaylists && channelPlaylists.length > 0 ? (
      channelPlaylists.map((playlist, idx) => (
        <div key={idx} className='xl:w-[24%] lg:w-[32%] md:w-[49%] sm:w-[100%] mt-5'>
          <div className='p-1 active:dark:bg-gray-800'>
            <div className='relative rounded-md'>
              <div className='absolute w-1/2 h-full bg-[#000000CC] flex justify-center items-center hover:w-full'>
                <RiPlayList2Fill className='dark:text-white w-1/2 text-xl' />
              </div>
              <img 
                src={playlist.snippet.thumbnails.medium.url}
                alt={playlist.snippet.title} 
                className='w-full rounded-md'
              />
            </div>
            <h4 className='mt-2 text-lg font-semibold'>{playlist.snippet.title}</h4>
            <p className='text-sm text-gray-500 dark:text-gray-400'>{playlist.snippet.channelTitle}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No playlists found for this channel.</p>
    )}
  </section>
  )
}

export default PlayList