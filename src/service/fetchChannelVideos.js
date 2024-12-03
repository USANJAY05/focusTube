import axios from 'axios';

const fetchChannelVideos = async (channelId, orderBy = 'date') => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        channelId: channelId,
        maxResults: 5,
        order: orderBy,
        key: import.meta.env.VITE_API_KEY,
      },
    });
    if (response.data.items) {
      return [response.data.items, false]; // Success case
    } else {
      return ['No videos found.', true]; // Error case
    }
  } catch (error) {
    return [error.message, true]; // Error case
  }
};

export default fetchChannelVideos;
