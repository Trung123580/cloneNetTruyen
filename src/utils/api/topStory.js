import axios from 'axios';
const callApiTopStory = async (topStory) => {
  //api goi top thang top ngay top tuan
  try {
    const response = await axios.get(`https://comics-api.vercel.app/top/${topStory}`);
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};

export default callApiTopStory;
