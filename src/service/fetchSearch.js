import axios from "axios";

const fetchSearch = async (query, setError) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/search`, {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: query || 'tamil tech',  // Default query if 'active' is empty
          regionCode: 'IN',
          order:'date',
          type: 'video',
          key: import.meta.env.VITE_API_KEY,
        },
      });
      setError(null)
      return response.data;
    } catch (error) {
      setError(error)
      console.error('Error fetching data:', error);
      return null;
    }
  };

  export default fetchSearch;