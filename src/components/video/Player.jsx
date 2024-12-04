import React from 'react';

const Player = ({ id }) => {
  return (
    <div>
      <iframe
        className="w-full sm:h-[calc(100vh-400px)] h-[37vh] xl:h-[calc(100vh-300px)] rounded-lg"
        src={`https://www.youtube.com/embed/${id}?autoplay=1&controls=1&loop=0&rel=0&fs=1`} // Make sure fs=1 allows fullscreen
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" // Make sure fullscreen is allowed
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Player;
