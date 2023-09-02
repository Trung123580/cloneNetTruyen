import { useEffect } from 'react';
// import axios from 'axios';
function Details() {
  useEffect(() => {
    // const callApi = async () => {
    //   const urlParam = new URLSearchParams(window.location.search);
    //   const details = urlParam.get('details');
    //   const chapterId = urlParam.get('chapter');
    //   console.log(details, chapterId);
    //   //   try {
    //   //     const response = await axios.get(`https://comics-api.vercel.app/comics/${details}/chapters/${chapterId}`);
    //   //     console.log('res', response);
    //   //   } catch (error) {
    //   //     console.error('Error fetching data:', error);
    //   //   }
    // };
    // callApi();
  }, []);
  return <div>Details</div>;
}

export default Details;
