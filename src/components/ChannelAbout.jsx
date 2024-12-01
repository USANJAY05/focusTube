import React from 'react'
import convertDate from '../utils/isoDateConverter.js'

const ChannelAbout = ({channelDetails}) => {
  return (
    <section>
    {channelDetails&&(
    <div className='flex flex-col gap-5 mt-5'>
      <div>
        <h2 className='font-bold text-2xl  mb-2'>Description</h2>
        <p>{channelDetails.snippet.description}</p>
      </div>
      <div>
        <h2 className='font-bold text-2xl mb-2'>Statistics</h2>
        <table className="border border-gray-300 border-collapse w-full mb-3">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Subscriber Count</th>
            <th className="border border-gray-300 p-2">Video Count</th>
            <th className="border border-gray-300 p-2">View Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">
              {channelDetails.statistics.subscriberCount}
            </td>
            <td className="border border-gray-300 p-2">
              {channelDetails.statistics.videoCount}
            </td>
            <td className="border border-gray-300 p-2">
              {channelDetails.statistics.viewCount}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2 className='font-bold text-2xl mb-2'>Created At</h2>
      <p>{convertDate(channelDetails.snippet.publishedAt)}</p>
    </div>


{/* 
        <li className='flex gap-2'><p>Subscribers count: </p>{channelDetails.statistics.subscriberCount}</li>
        <li className='flex gap-2'><p>Video Count: </p>{channelDetails.statistics.videoCount}</li>
        <li className='flex gap-2'><p>View Count: </p>{channelDetails.statistics.viewCount}</li> */}
      {/* </table> */}
    </div>
    )}
  </section>
  )
}

export default ChannelAbout