import React from 'react'
import convertDate from '../../utils/isoDateConverter.js'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

export const CommentSection = ({videoData,commentData}) => {
  console.log(commentData)
  return (
    <div className='w-full overflow-auto'>
    <h2 className="text-xl font-bold mb-3">{videoData.statistics.commentCount} Comments</h2>
    <div className="flex flex-wrap gap-3">
      {commentData && commentData.items.map((comment, index) => (
        <div className="flex gap-2  flex-grow w-full overflow-auto  p-2 box-content mx-4 rounded-xl" key={index}>
          <img
            src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
            alt="user-profile"
            className="w-10 h-10 rounded-3xl"
          />
          <div>
            <div className='flex gap-2'>
              <h2 className='dark:text-white'>{comment.snippet.topLevelComment.snippet.authorDisplayName}</h2>
              <small className='bg-gray-100 dark:bg-gray-800 px-2 rounded-2xl'>{convertDate(comment.snippet.topLevelComment.snippet.publishedAt)}</small>
            </div>
            <p className='w-full'>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
            <div className='flex gap-1 items-center'>
              <div className='flex items-center'>
                <button className='flex gap-1 items-center '>{comment.snippet.topLevelComment.snippet.likeCount}</button>
                <AiOutlineLike className='text-xl p-2 rounded-3xl hover:dark:bg-gray-700 hover:bg-gray-100 box-content' />
              </div>
              <button><AiOutlineDislike className='text-xl p-2 rounded-3xl box-content hover:dark:bg-gray-700 hover:bg-gray-100' /></button>
              <button className='py-1 px-3 rounded-3xl hover:dark:bg-gray-700 hover:bg-gray-100'>Reply</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}
