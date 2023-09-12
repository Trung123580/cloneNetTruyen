import axios from 'axios';
const callApiGenres = async (genres) => {
  try {
    const response = await axios.get(`https://comics-api.vercel.app/genres/${genres}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export default callApiGenres;
