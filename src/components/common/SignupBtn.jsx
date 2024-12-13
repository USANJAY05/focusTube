import React, { useState } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import { useGoogleLogin } from '@react-oauth/google';
import defaultProfile from '../../assets/icons/contact.png'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfile } from '../../redux/slice/profile-slice';

const SignupBtn = ({ text }) => {
  const dispatch = useDispatch()
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const code = codeResponse.code;
      // console.log('Authorization Code:', code);

      try {
        // Exchange the authorization code for an access token
        const response = await axios.post('https://oauth2.googleapis.com/token', null, {
          params: {
            code: code,
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
            redirect_uri: import.meta.env.VITE_REDIRECT_URL, // This is your redirect URI
            grant_type: 'authorization_code',
          },
        });

        const { access_token } = response.data;
        // console.log('Access Token:', access_token);

        // Use the access token to fetch user information from Google's API
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        // Log user info
        // console.log('User Info:', userInfoResponse.data);
        // You will get name, email, and picture here
        const { name, email, picture } = userInfoResponse.data;
        // console.log('Name:', name);
        // console.log('Email:', email);
        dispatch(setProfile({
          name: name,
          email: email,
          img: picture
        }));
        

      } catch (error) {
        console.error('Error exchanging code for token:', error);
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
    flow: 'auth-code', // Using authorization code flow
  });

  return (
      <div
        onClick={() => login()} // Trigger login on click
        className='px-3 py-1 text-sm rounded-3xl border hover:cursor-pointer hover:bg-blue-100 hover:border-white dark:text-white dark:border-slate-500 dark:hover:bg-slate-800 dark:hover:border-black text-blue-400 flex items-center gap-1'>
        <IoPersonCircleOutline className='w-6 h-6' />
        <button>{text}</button>
      </div>
  );
};

export default SignupBtn;
