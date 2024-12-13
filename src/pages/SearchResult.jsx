import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DesktopThumnail from '../components/main/DesktopThumnail';

const SearchResult = () => {
  const { query } = useParams();
  const [items, setItems] = useState([]);

  const searchVideos = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=5&key=${import.meta.env.VITE_API_KEY}`
      );
      const data = await response.json();
      // console.log(data.items);
      setItems(data.items || []);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };

  useEffect(() => {
    searchVideos(query);
  }, [query]);

  return (
    <div className="flex w-full h-full overflow-auto dark:bg-black">
      <div className="flex flex-col h-full w-full overflow-auto">
        <section className="w-full dark:text-white dark:dark:bg-black overflow-auto flex flex-col gap-8">
          {items.map((item, idx) => {
            const isChannel = item.id.kind === 'youtube#channel';
            const isVideo = item.id.kind === 'youtube#video';
            const snippet = item.snippet;

            return (
              <section
                key={idx}
                className="w-full flex gap-10 items-center p-5"
              >
                {isChannel && (
                  <>
                    <Link
                      to={`/channel/${item.id.channelId}`}
                      className="w-1/4 flex justify-center items-center"
                    >
                      <img
                        src={snippet.thumbnails.default.url}
                        alt={snippet.channelTitle}
                        className="w-32 h-32 rounded-full"
                      />
                    </Link>
                    <div className="flex flex-col gap-2">
                      <Link to={`/channel/${item.id.channelId}`}>
                        <h1 className="font-bold text-xl">{snippet.channelTitle}</h1>
                        <p className="text-gray-400">{snippet.description}</p>
                      </Link>
                      <div>
                        <button className="bg-slate-600 text-white hover:bg-slate-500 rounded-3xl px-4 py-2">
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {isVideo && (
                  <div className="w-full">
                    <DesktopThumnail
                      channelId={snippet.channelId}
                      channel={snippet.channelTitle}
                      thumnail={snippet.thumbnails.medium.url}
                      id={item.id.videoId}
                      title={snippet.title}
                      date={snippet.publishedAt}
                    />
                  </div>
                )}
              </section>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default SearchResult;
