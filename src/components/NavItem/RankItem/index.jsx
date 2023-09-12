import classNames from 'classnames/bind';
import style from '../NavItem.module.scss';
import { ranks } from '~/constant';
const cx = classNames.bind(style);
function RankItem({ item, isToggle, onCallApiRank }) {
  return (
    <>
      {!!item?.ulList && (
        <div className={cx('wrapper-rank')}>
          <ul className={cx('rank')} style={{ background: isToggle ? '#fff' : '#000', color: !isToggle && '#fff' }}>
            {ranks.map((rank) => {
              return (
                <li key={rank.id} className={cx('rank-item')} onClick={() => onCallApiRank(rank.id)}>
                  <span style={{ color: !!rank.color && '#e74c3c' }}>
                    {rank.icon} {rank.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}

export default RankItem;
