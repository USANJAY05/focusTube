import React from 'react'
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import profile from '../../assets/icons/contact.png'

const RightSection = () => {
  return (
    <div className='flex items-center gap-4 text-2xl'>
        <RiVideoAddLine className='p-1 box-content rounded-2xl hover:bg-gray-600' />
        <IoMdNotificationsOutline className='p-1 box-content rounded-2xl hover:bg-gray-600' />
        <img src={profile} className='w-8 h-8' alt="profile-icon" />
    </div>
  )
}

export default RightSection