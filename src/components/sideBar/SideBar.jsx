import React, { useState } from 'react';

import { IoMdHome } from "react-icons/io";
import { MdOutlineSubscriptions } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { LuHistory } from "react-icons/lu";
import { CgPlayList } from "react-icons/cg";
import { GoVideo } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { ImFire } from "react-icons/im";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { MdOutlineMovie } from "react-icons/md";
import { HiOutlineSignal } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { setSideActive } from '../../redux/slice/sideBarActive-slice';

const SideBar = () => {

  const sidebarData = {
    Top: [
      { icon: <IoMdHome />, name: 'Home' },
      { icon: <SiYoutubeshorts />, name: 'Shorts' },
      { icon: <MdOutlineSubscriptions />, name: 'Subscriptions' },
    ],
    Middle: [
      { icon: <LuHistory />, name: 'History' },
      { icon: <CgPlayList />, name: 'Playlist' },
      { icon: <GoVideo />, name: 'Your Videos' },
      { icon: <MdOutlineWatchLater />, name: 'Watch later' },
      { icon: <AiOutlineLike />, name: 'Liked videos' },
    ],
    Bottom: [
      { icon: <ImFire />, name: 'Trending' },
      { icon: <IoMusicalNotesOutline />, name: 'Music' },
      { icon: <MdOutlineMovie />, name: 'Movies' },
      { icon: <HiOutlineSignal />, name: 'Live' },
    ]
  };

  const active = useSelector((state) => state.sideBarActive.value)
  const dispatch = useDispatch()

  return (
    <div className='w-60 p-4 h-full dark:bg-black overflow-auto'>
      {/* Render each section of the sidebar */}
      {Object.entries(sidebarData).map(([section, items], idx) => (
        <div key={idx}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`w-full p-2 flex items-center gap-4 hover:cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-200 rounded-lg dark:text-white ${active == item.name?'bg-slate-200 dark:bg-slate-800':''}`}
              onClick={() => dispatch(setSideActive(item.name))}
            >
              {item.icon} <span>{item.name}</span>
            </div>
          ))}
          <hr className='border-gray-600 my-2' />
        </div>
      ))}
    </div>
  );
}

export default SideBar;