import axios from 'axios';
const callApiDetails = async (details) => {
  try {
    const response = await axios.get(`https://comics-api.vercel.app/comics/${details}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
export default callApiDetails;
