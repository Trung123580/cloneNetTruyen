import axios from 'axios';
export const callApiHome = async () => {
  try {
    const response = await axios.get(`https://comics-api.vercel.app/recommend-comics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
