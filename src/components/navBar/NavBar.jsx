import React, { useState } from 'react'
import LeftBtn from './LeftSection'
import Search from './Search'
import RightSection from './RightSection'

const NavBar = () => {
  const [toggleSearch, setToggleSearch] = useState();
  return (
    <header className='px-5 py-3 flex items-center justify-between dark:bg-black dark:text-white'>
        <LeftBtn />
        <Search toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />
        <RightSection toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />
    </header>
  )
}

export default NavBar