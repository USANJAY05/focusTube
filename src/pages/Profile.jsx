import React from 'react'
import icon from '../assets/icons/contact.png'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../redux/slice/profile-slice'
import { useNavigate } from 'react-router'

const Profile = () => {
    const {name, img, email} = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(setLogout())
        navigate('/home')
    }

  return (
    <div className='dark:bg-black w-full h-full flex justify-center dark:text-white'>
        <div className='xl:w-1/2 p-2 '>
            <ul className='flex flex-col items-center gap-2'>
                <li className='text-center w-full flex flex-col items-center'>
                    <img className='w-40 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-2' src={img||icon} alt="" />
                    <h1>{name || 'Your name'}</h1>
                    <h2>{email || 'Your Email'}</h2>
                </li>
                <li className='p-2 border w-2/3 rounded'>
                    <details>
                        <summary>Domains</summary>
                        <ul></ul>
                        <li className="border rounded p-2">hello</li>
                        <li className="border rounded p-2">hi</li>
                        <li className="border rounded p-2">how are you</li>
                    </details>
                </li>
                <li className='p-2 border w-2/3 rounded flex'>
                    <label htmlFor="">Country: </label>
                    <select name="" id="" className='w-full bg-inherit'>
                        <option value="">India</option>
                        <option value="">America</option>
                        <option value="">SriLanka</option>
                        <option value="">Nepal</option>
                        <option value="">Pakisthan</option>
                        <option value="">Butan</option>
                        <option value="">China</option>
                    </select>
                </li>
                <li className='p-2 border w-2/3 rounded flex'>
                    <label htmlFor="">Language: </label>
                    <select name="" id="" className='w-full bg-inherit'>
                        <option value="">Tamil</option>
                        <option value="">English</option>
                        <option value="">Hindi</option>
                        <option value="">Telugu</option>
                        <option value="">Malayalam</option>
                        <option value="">Chinese</option>
                        <option value="">Turkesh</option>
                    </select>
                </li>
                <li className='p-2 border w-2/3 rounded'>
                    <details>
                        <summary>Area of Interest</summary>
                        <ul></ul>
                        <li className="border rounded p-2">hello</li>
                        <li className="border rounded p-2">hi</li>
                        <li className="border rounded p-2">how are you</li>
                    </details>                
                </li>
                <li onClick={() => handleLogout()} className='p-2 border w-2/3 rounded cursor-pointer'>
                    logout
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Profile