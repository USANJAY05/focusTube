import React, { useEffect, useRef } from 'react';

const Shots = () => {
  const videoRefs = useRef([]);

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
    'dQw4w9WgXcQ', // Video 2
    '3JZ_D3ELwOQ', // Video 3
    'CevxZvSJLk8', // Video 4
  ];

  return (
    <div className="h-screen w-full bg-black overflow-y-scroll">
      {videoIds.map((videoId, index) => (
        <div
          key={index}
          className="h-screen w-full flex justify-center items-center"
        >
          <iframe
            className="h-full sm:w-[37%] md:w-[400px] w-full"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&loop=1&rel=0&fs=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ref={(el) => (videoRefs.current[index] = el)}
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default Shots;