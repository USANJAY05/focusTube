import React, { useState } from 'react'
import SideBar from '../components/sideBar/SideBar'
import ScrollBar from '../components/scrollBar/ScrollBar'
import Right from '../components/main/Right'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const Home = () => {
  const toggle = useSelector((state) => state.toggle.value)
  const sideBar = useSelector((state) => state.sideBarActive.value)
  const {sidebar} = useParams()
  // console.log(sideBar)
   return (
    <div className='flex w-full h-full overflow-auto dark:bg-black'>
      {/* <div> 
        {toggle&&
        <SideBar />}
      </div> */}
      <div className='flex flex-col h-full w-full overflow-auto '>
        <ScrollBar sideBar={sideBar} />
        <Right sideBar={sideBar} />
      </div>
    </div>
  )
}

export default Home