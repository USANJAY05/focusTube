import axios from 'axios';

const fetchChannelDetails = async (channelId) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: channelId,
        key: import.meta.env.VITE_API_KEY,
      },
    });
    if (response.data.items && response.data.items.length > 0) {
      return [response.data.items[0], false]; // Success case
    } else {
      return ['No channel details found.', true]; // Error case
    }
  } catch (error) {
    return [error.message, true]; // Error case
  }
};

export default fetchChannelDetails;
