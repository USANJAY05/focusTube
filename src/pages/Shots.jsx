import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";

const Shots = () => {
  const videoRefs = useRef([]);
  const {shotsId} = useParams()

  useEffect(() => {
    // Intersection Observer for video playback
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              '*'
            );
          } else {
            video.contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              '*'
            );
          }
        });
      },
      { threshold: 0.75 } // Trigger when 75% of the video is visible
    );

    // Observe all video elements
    videoRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // Clean up observer
      videoRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const videoIds = [
    's7kZanmpwFA', // Video 1
    's7kZanmpwFA', // Video 1
    's7kZanmpwFA', // Video 1

  ];

  return (
    <div className="h-full w-full bg-black overflow-y-scroll">
        <div
          className="h-full w-full flex justify-center items-center"
        >
          <iframe
            className="h-full sm:w-[37%] md:w-[400px] w-full rounded-xl"
            src={`https://www.youtube.com/embed/${shotsId}?enablejsapi=1&autoplay=0&controls=0&loop=1&rel=0&fs=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            // ref={(el) => (videoRefs.current[index] = el)}
            allowFullScreen
          ></iframe>
        </div>
        <div className='flex flex-col gap-3 absolute right-[10%] top-[45%] text-white'>
            <button className='bg-gray-600 hover:bg-gray-500 rounded-xl p-2'><FaArrowUp /></button>
            <button className='bg-gray-600 hover:bg-gray-500 rounded-xl p-2'><FaArrowDown /></button>
        </div>
    </div>
  );
};

export default Shots;