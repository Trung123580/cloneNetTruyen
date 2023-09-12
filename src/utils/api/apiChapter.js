import axios from 'axios';
const callApiChapter = async (details, chapterId) => {
  try {
    const response = await axios.get(`https://comics-api.vercel.app/comics/${details}/chapters/${chapterId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default callApiChapter;
