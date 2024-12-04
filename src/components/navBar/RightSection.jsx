import React from 'react'
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from '../../assets/icons/contact.png'
import { IoPersonCircleOutline } from "react-icons/io5";


const RightSection = () => {
  return (
    <div className='flex items-center gap-3 text-2xl'>
        {/* <RiVideoAddLine className='w-6 h-6 p-2 dark:bg-black  box-content rounded-3xl dark:hover:bg-gray-600 hover:bg-gray-200' /> */}
        {/* <IoMdNotificationsOutline className='w-6 h-6 p-2 bg-white dark:bg-black  box-content rounded-3xl dark:hover:bg-gray-600 hover:bg-gray-200' /> */}
        {/* <img src={profile} className='w-8 h-8' alt="profile-icon" /> */}
        <div className='px-3 py-1 text-sm rounded-3xl border hover:bg-blue-100 hover:border-white dark:text-white dark:border-slate-500 dark:hover:bg-slate-800 dark:hover:border-black text-blue-400 flex items-center gap-1'>
          <IoPersonCircleOutline className='w-6 h-6' />
          <button>Signup</button>
        </div>
    </div>
  )
}

export default RightSection