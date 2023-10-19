import axios from 'axios';
const callApiBoyComics = async (page) => {
  try {
    const response = await axios.get(`https://comics-api.vercel.app/boy-comics?page=${page}`);
    return await response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
export default callApiBoyComics;
