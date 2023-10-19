import axios from 'axios';
const callApiTrending = async (page) => {
  try {
    const response = await axios.get(`https://comics-api.vercel.app/trending-comics?page=${page}`);
    return await response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
export default callApiTrending;
