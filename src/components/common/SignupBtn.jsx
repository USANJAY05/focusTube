import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";

const SignupBtn = ({text}) => {
  return (
    <div className='px-3 py-1 text-sm rounded-3xl border hover:cursor-pointer hover:bg-blue-100 hover:border-white dark:text-white dark:border-slate-500 dark:hover:bg-slate-800 dark:hover:border-black text-blue-400 flex items-center gap-1'>
        <IoPersonCircleOutline className='w-6 h-6' />
        <button>{text}</button>
    </div>
  )
}

export default SignupBtn