import axios from "axios";

const fetchData = async (key, setError) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/videos`, {
        params: {
          part: 'snippet,contentDetails,statistics',
          chart: 'mostPopular',
          maxResults: 12,
          regionCode: 'IN',
          videoCategoryId: key || 1,
          key: import.meta.env.VITE_API_KEY,
        },
      });
      setError(null)
      return response.data;
    } catch (error) {
      setError(error)
      console.error('Error fetching data: ', error);
      return null;
    }
  };

export default fetchData;