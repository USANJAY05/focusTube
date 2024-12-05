import React, { useState } from 'react'
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import defaultProfile from '../../assets/icons/contact.png'
import SignupBtn from '../common/SignupBtn';
import { useSelector } from 'react-redux';


const RightSection = () => {
  const [response, setResponse] =useState(false);
  const {img} = useSelector((state) => state.profile)
  console.log(img)
  return (
    <div className='flex items-center gap-3 text-2xl'>
        {/* <RiVideoAddLine className='w-6 h-6 p-2 dark:bg-black  box-content rounded-3xl dark:hover:bg-gray-600 hover:bg-gray-200' /> */}
        {/* <IoMdNotificationsOutline className='w-6 h-6 p-2 bg-white dark:bg-black  box-content rounded-3xl dark:hover:bg-gray-600 hover:bg-gray-200' /> */}
        {response ?
        <img src={img || defaultProfile} className='w-8 h-8 rounded-[100%]' alt="profile-icon" />:
        <SignupBtn setResponse={setResponse} text={'Signup'} />}
    </div>
  )
}

export default RightSection