import axios from 'axios';
const callApiSliderComics = async () => {
  try {
    const response = await axios.get(`https://comics-api.vercel.app/recommend-comics`);
    return await response.data;
  } catch (error) {
    throw error;
  }
};
export default callApiSliderComics;
