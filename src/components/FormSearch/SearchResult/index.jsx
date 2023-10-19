import classNames from 'classnames/bind';
import style from '../Search.module.scss';
const cx = classNames.bind(style);
function SearchResult({ data, onNavigateDetails }) {
  return (
    <div className={cx('card')} onClick={onNavigateDetails}>
      <div className={cx('avatar')}>
        <img src={data?.thumbnail} alt='error' />
      </div>
      <div className={cx('content')}>
        <h4 className={cx('title')}>{data?.title}</h4>
        <span className={cx('chapter')}>{data?.last_chapter.name}</span>
        {!!data?.other_name && <h4 className={cx('other-name')}>{data?.other_name}</h4>}
        <ul className={cx('list-genres')}>
          {data?.genres.map(({ id, name }) => {
            return <span key={id}>{name}, </span>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default SearchResult;
