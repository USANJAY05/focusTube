import axios from "axios";

const fetchCategories = async (setError) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/videoCategories`, {
        params: {
          part: 'snippet',
          regionCode: 'IN',
          key: import.meta.env.VITE_API_KEY,
        },
      });
      setError(null)
      return response.data;
    } catch (error) {
        setError(error)
      console.error('Error fetching categories: ', error);
      return null;
    }
  };

export default fetchCategories;
