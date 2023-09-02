import axios from 'axios';
export const callApiDetails = async (details, chapterId) => {
  try {
    const response = await axios.get(`https://comics-api.vercel.app/comics/${details}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
