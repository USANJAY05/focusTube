import React, { useState } from 'react';
import { SiYoutubegaming } from "react-icons/si";
import { MdNewspaper } from "react-icons/md";
import { FaPodcast } from "react-icons/fa";
import { SlBulb } from "react-icons/sl";
import { IoMdFitness } from "react-icons/io";
import { CiTrophy } from "react-icons/ci";
import { RiShoppingBag4Line } from "react-icons/ri";
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
import { Link } from 'react-router-dom';

const SideBar = () => {

  const sidebarData = {
    Top: [
      { icon: <IoMdHome />, name: 'Home', route: '/' },
      { icon: <SiYoutubeshorts />, name: 'Shorts', route: '/shorts' },
      { icon: <MdOutlineSubscriptions />, name: 'Subscriptions', route: '/subscriptions' },
    ],
    Middle1: [
      { icon: <LuHistory />, name: 'History', route: '/history'  },
      { icon: <CgPlayList />, name: 'Playlist', route: '/playlist'  },
      { icon: <GoVideo />, name: 'Your Videos', route: '/videos'  },
      { icon: <MdOutlineWatchLater />, name: 'Watch later', route: '/watchLater'  },
      { icon: <AiOutlineLike />, name: 'Liked videos', route: '/likedvideos'  },
    ],
    Bottom: [
      { icon: <ImFire />, name: 'Trending', route: '/trending'  },
      { icon: <IoMusicalNotesOutline />, name: 'Music' , route: '/music' },
      { icon: <MdOutlineMovie />, name: 'Movies', route: '/movies'  },
      { icon: <HiOutlineSignal />, name: 'Live', route: '/live'  },
      { icon: <SiYoutubegaming />, name: 'Gaming', route: '/trending'  },
      { icon: <CiTrophy />, name: 'Sports' , route: '/music' },
      { icon: <IoMdFitness />, name: 'Fitness', route: '/movies'  },
      { icon: <MdNewspaper />, name: 'News', route: '/live'  },
      { icon: <SlBulb />, name: 'Course' , route: '/music' },
      { icon: <FaPodcast />, name: 'Podcast', route: '/movies'  },
      { icon: <RiShoppingBag4Line />, name: 'Shoping', route: '/live'  },
    ]
  };

  const active = useSelector((state) => state.sideBarActive.value)
  const toggle = useSelector((state) => state.toggle.value)
  console.log(toggle,'toggle')
  const dispatch = useDispatch()
  console.log(active)

  return (
    <div className={`w-72 p-4 h-full dark:bg-black overflow-auto scrollbar-thin hover:scrollbar-thumb-slate-500 fixed xl:relative ${toggle ===false?'hidden':''}`}>
      {/* Render each section of the sidebar */}
      {Object.entries(sidebarData).map(([section, items], idx) => (
        <div key={idx}>
          {items.map((item, index) => (
            <div
              key={index}
              className={`w-full p-2 flex hover:cursor-pointer dark:hover:bg-slate-800 hover:bg-slate-200 rounded-lg dark:text-white ${active == item.name?'bg-slate-200 dark:bg-slate-800':''}`}
              onClick={() => dispatch(setSideActive(item.name))}
            >
              <Link className='w-full flex items-center gap-4' to={item.route}>
                {item.icon} <span>{item.name}</span>
              </Link>
            </div>
          ))}
          <hr className='border-gray-600 my-2' />
        </div>
      ))}
    </div>
  );
}

export default SideBar;