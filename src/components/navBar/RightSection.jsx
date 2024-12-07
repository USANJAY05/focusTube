import React, { useState } from 'react'
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import defaultProfile from '../../assets/icons/contact.png'
import SignupBtn from '../common/SignupBtn';
import { useSelector } from 'react-redux';
import DropDown from '../common/ProfileDropDown';


const RightSection = () => {
  const {img, name, email} = useSelector((state) => state.profile)
  const [toggle, setToggle] = useState(false)
  return (
    <div className='flex items-center gap-3 text-2xl'>
        {/* <RiVideoAddLine className='w-6 h-6 p-2 dark:bg-black  box-content rounded-3xl dark:hover:bg-gray-600 hover:bg-gray-200' /> */}
        {/* <IoMdNotificationsOutline className='w-6 h-6 p-2 bg-white dark:bg-black  box-content rounded-3xl dark:hover:bg-gray-600 hover:bg-gray-200' /> */}
        {img !== null ?
        <img 
          onClick={() => setToggle(!toggle)}
          src={img || defaultProfile} 
          className='w-8 h-8 rounded-[100%] hover:cursor-pointer' 
          alt="profile-icon" />:

        <SignupBtn text={'Signup'} />}
        {toggle &&
        <DropDown img={img} name={name} email={email} setToggle={setToggle} />}
    </div>
  )
}

export default RightSection