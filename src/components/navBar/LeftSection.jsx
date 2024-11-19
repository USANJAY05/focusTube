import React from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import icon from '../../assets/icons/yt-icon.png'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '../../redux/slice/toggleBar-slice';

const LeftBtn = () => {
  const dispatch = useDispatch();

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
              <div className='flex gap-1 items-center'>
                  <img src={icon} width={30} alt="yt-icon" />
                  <h1 className='font-bold'>YouTube</h1>
              </div>
            </Link>
        </div>
    </div>
  )
}

export default LeftBtn