import { useEffect, useState, memo } from 'react';
import { callApiGenres } from '~/utils/api';
import { useSelector } from 'react-redux';
import Loading from '~/Loading';
const Category = () => {
  const [product, setProduct] = useState(null);
  const { response } = useSelector((state) => state.api);
  console.log(response);
  useEffect(() => {
    const callApi = async () => {
      const data = await callApiGenres(response);
      setProduct(data);
    };
    callApi();
  }, [response]);
  return (
    <div>
      {product ? (
        product.comics.map((story) => {
          return <div key={story.id}>{story.title}</div>;
        })
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default memo(Category);
