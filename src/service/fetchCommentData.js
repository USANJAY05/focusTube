import axios from "axios";

const fetchCommentData = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${import.meta.env.VITE_API_KEY}`);
      return response.data;
    } catch (error) {
      console.log(`Error fetching comment data: ${error}`);
      return null;
    }
  };

export default fetchCommentData;