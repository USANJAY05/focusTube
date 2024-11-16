import React from 'react'
import LeftBtn from './LeftSection'
import Search from './Search'
import RightSection from './RightSection'

const NavBar = () => {
  return (
    <header className='p-3 flex items-center justify-between dark:bg-black dark:text-white'>
        <LeftBtn />
        <Search />
        <RightSection />
    </header>
  )
}

export default NavBar