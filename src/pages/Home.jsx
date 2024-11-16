import React from 'react'
import SideBar from '../components/sideBar/SideBar'
import ScrollBar from '../components/scrollBar/ScrollBar'
import Right from '../components/main/Right'

const Home = () => {
  return (
    <div className='flex w-full h-full overflow-auto'>
      <div>
        <SideBar />
      </div>
      <div className='flex flex-col h-full overflow-x-auto '>
        <ScrollBar />
        <Right />
      </div>
    </div>
  )
}

export default Home