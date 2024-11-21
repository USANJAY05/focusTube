import React from 'react'

export const CommentSection = ({videoData,commentData}) => {
  return (
    <div>
    <h2 className="text-xl font-bold mb-3">{videoData.statistics.commentCount} Comments</h2>
    <div className="flex flex-wrap gap-3">
      {commentData && commentData.items.map((comment, index) => (
        <div className="flex gap-2 xl:w-1/3 flex-grow items-center bg-gray-800 p-2 box-content mx-4 rounded-xl" key={index}>
          <img
            src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
            alt="user-profile"
            className="w-10 h-10 rounded-3xl"
          />
          <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
          <button>Reply</button>
        </div>
      ))}
    </div>
  </div>
  )
}
