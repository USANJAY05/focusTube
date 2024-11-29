import React, { useState } from 'react'
import SideBar from '../components/sideBar/SideBar'
import ScrollBar from '../components/scrollBar/ScrollBar'
import Right from '../components/main/Right'
import { useSelector } from 'react-redux'

const Home = () => {
  const toggle = useSelector((state) => state.toggle.value)
  const sideBar = useSelector((state) => state.sideBarActive.value)
  console.log(sideBar)
   return (
    <div className='flex w-full h-full overflow-auto dark:bg-black'>
      {/* <div>
        {toggle&&
        <SideBar />}
      </div> */}
      <div className='flex flex-col h-full overflow-auto '>
        <ScrollBar />
        <Right />
      </div>
    </div>
  )
}

export default Home