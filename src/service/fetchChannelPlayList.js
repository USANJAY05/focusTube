import axios from 'axios';

const fetchChannelPlaylists = async (channelId) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
      params: {
        part: 'snippet',
        channelId: channelId,
        maxResults: 5,
        key: import.meta.env.VITE_API_KEY,
      },
    });
    if (response.data.items) {
      return [response.data.items, false]; // Success case
    } else {
      return ['No playlists found.', true]; // Error case
    }
  } catch (error) {
    return [error.message, true]; // Error case
  }
};

export default fetchChannelPlaylists;
