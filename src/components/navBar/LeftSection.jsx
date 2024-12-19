import React, { useEffect } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import icon from '../../assets/icons/yt-icon.png'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToggle, toggle } from '../../redux/slice/toggleBar-slice';
import useMobileSize from '../../hooks/useMobileSize';

const LeftBtn = () => {
  const dispatch = useDispatch();
  const mobileSize = useMobileSize()

  useEffect(() => {
    if(mobileSize){
      dispatch(setToggle(false))
    }
    else{
      dispatch(setToggle(true))
    }
  },[mobileSize])

  return (
    <div>
        <div className='flex gap-2 items-center'>
            <IoReorderThreeOutline 
              className='dark:bg-black outline-none bg-white text-3xl p-1 dark:hover:bg-gray-700 hover:bg-gray-200 box-content rounded-3xl hover:cursor-pointer' 
              tabIndex={1}
              aria-label='toggle-button'
              onClick={() => dispatch(toggle())}
            />
            <Link to='/'>
              <abbr title="FocusTube" className='no-underline'>
                <div className='flex gap-1 items-center'>
                    <img src={icon} width={30} alt="yt-icon" />
                    <h1 className='font-bold'>FocusTube</h1>
                </div>
              </abbr>
            </Link>
        </div>
    </div>
  )
}

export default LeftBtn