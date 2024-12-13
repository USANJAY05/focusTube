import React from 'react'

const ShotsPlayer = ({id}) => {
  return (
    <iframe
    className="h-full sm:w-[37%] md:w-[400px] w-full rounded-xl"
    src={`https://www.youtube.com/embed/${id}?enablejsapi=1&autoplay=1&controls=0&loop=1&rel=0&fs=1`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
    allowFullScreen
  ></iframe>  )
}

export default ShotsPlayer