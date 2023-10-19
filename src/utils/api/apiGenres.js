import axios from 'axios';
const callApiGenres = async (currentApi, genres, page) => {
  console.log(currentApi);
  try {
    const response = await axios.get(
      `https://comics-api.vercel.app/${currentApi ? `${currentApi}` : 'genres'}${currentApi ? '' : `/${genres}`}?page=${page}`
    );
    return await response.data;
  } catch (error) {
    throw error;
  }
};
export default callApiGenres;
