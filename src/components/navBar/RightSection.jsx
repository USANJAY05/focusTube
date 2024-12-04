import React from 'react'
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from '../../assets/icons/contact.png'
import SignupBtn from '../common/SignupBtn';


const RightSection = () => {
  return (
    <div className='flex items-center gap-3 text-2xl'>
        {/* <RiVideoAddLine className='w-6 h-6 p-2 dark:bg-black  box-content rounded-3xl dark:hover:bg-gray-600 hover:bg-gray-200' /> */}
        {/* <IoMdNotificationsOutline className='w-6 h-6 p-2 bg-white dark:bg-black  box-content rounded-3xl dark:hover:bg-gray-600 hover:bg-gray-200' /> */}
        {/* <img src={profile} className='w-8 h-8' alt="profile-icon" /> */}
        <SignupBtn />
    </div>
  )
}

export default RightSection