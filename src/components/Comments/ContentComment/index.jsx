import { memo, forwardRef } from 'react';
import classNames from 'classnames/bind';
import style from './ContentComment.module.scss';
import { v4 as uuid } from 'uuid';
import { error } from '~/assets';
import UserComment from '../UserComment';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentInfoUser from '../CommentInfoUser';
const cx = classNames.bind(style);
const ContentComment = ({
  user, // user action comment
  comment,
  onLikeComment,
  onShowMenuComment,
  isShowMenuComment,
  idActiveComment,
  onDeleteComment,
  onCollapseComment,
  onShowEditComment, // edit comment
  isEdiComment, // boolean
  onFromEditComment, // FromEditComment
  onHideEditForm,
  isToggle,
  onChange,
  onReplyComment, // Reply comment
  dataReplyComment, //dataReplyComment
  isShowReply, // boolean
  onSubmitComment, // submit replyComments
  userProfile,
}) => {
  return (
    <div className={cx('item-comment')}>
      <div className={cx('avatar-user')}>
        <img src={comment.imgUrl || error} alt='' />
      </div>
      <div className={cx('user-info')}>
        {/* edit comments */}
        {isEdiComment && comment.id === idActiveComment ? (
          <form style={{ width: '100%' }} onSubmit={(e) => onFromEditComment(e, comment.id, 'comments')}>
            <UserComment
              isHideFrom={isEdiComment}
              isToggle={isToggle}
              onChange={onChange}
              onClick={onShowEditComment}
              valueEditComment={comment.comments}
            />
          </form>
        ) : (
          <>
            <CommentInfoUser
              comment={comment}
              isToggle={isToggle}
              onShowMenuComment={() => onShowMenuComment(comment.uid)}
              idActiveComment={idActiveComment}
              isShowMenuComment={isShowMenuComment}
              onCollapseComment={() => onCollapseComment(comment.id, 'comments', true)}
              onShowEditComment={() => onShowEditComment(comment.id)}
              onDeleteComment={() => onDeleteComment(comment.id, null, comment.idUser)}
            />
            {comment.collapse ? (
              <div className={cx('collapse')}>
                This comment is collapsed. <span onClick={() => onCollapseComment(comment.id, 'comments', false)}>Undo</span>
              </div>
            ) : (
              <>
                <p className={cx('desc-comment')}>{comment.comments}</p>
                <div className={cx('action-user')}>
                  <span onClick={() => onLikeComment(comment.id, comment.userLike, 'comments')}>{comment.userLike} </span>
                  <span onClick={() => onReplyComment(comment.id)}>Reply</span>
                  {comment.userLike === 'Unlike' && <ThumbUpAltIcon />}
                </div>
              </>
            )}
          </>
        )}
        {/*  rep comments */}
        {isShowReply && comment.id === idActiveComment && (
          <div className={cx('item-comment')}>
            <div className={cx('avatar-user')}>
              <img src={userProfile?.imgUrl || user?.imgUrl || error} alt='error' />
            </div>
            <form style={{ width: '100%' }} onSubmit={onSubmitComment}>
              <UserComment isHideFrom={isShowReply} isToggle={isToggle} onChange={onChange} onClick={onHideEditForm} valueEditComment={''} />
            </form>
          </div>
        )}
        {/* map data replyComments */}
        <div className={cx('rep-comments')}>
          {!!dataReplyComment &&
            dataReplyComment
              ?.filter((reply) => reply.id === comment.id)
              .map((item) => (
                <div key={uuid()} className={cx('item-comment')}>
                  <div className={cx('avatar-user')}>
                    <img src={item.imgUrl || error} alt='error' />
                  </div>
                  <div className={cx('user-info')}>
                    {isEdiComment && item.uid === idActiveComment ? (
                      <form style={{ width: '100%' }} onSubmit={(e) => onFromEditComment(e, comment.id, 'comments')}>
                        <UserComment
                          isHideFrom={isEdiComment}
                          isToggle={isToggle}
                          onChange={onChange}
                          onClick={onShowEditComment}
                          valueEditComment={item.comments}
                        />
                      </form>
                    ) : (
                      <>
                        <CommentInfoUser
                          comment={item}
                          isToggle={isToggle}
                          onShowMenuComment={() => onShowMenuComment(item.uid)}
                          idActiveComment={idActiveComment}
                          isShowMenuComment={isShowMenuComment}
                          onCollapseComment={() => onCollapseComment(item.uid, 'repcomments', true)}
                          onShowEditComment={() => onShowEditComment(null, item.uid)}
                          onDeleteComment={() => onDeleteComment(null, item.uid, item.idUser)}
                        />
                        {item.collapse ? (
                          <div className={cx('collapse')}>
                            This comment is collapsed. <span onClick={() => onCollapseComment(item.uid, 'repcomments', false)}>Undo</span>
                          </div>
                        ) : (
                          <>
                            <p className={cx('desc-comment')}>{item.comments}</p>
                            <div className={cx('action-user')}>
                              <span onClick={() => onLikeComment(item.uid, item.userLike, 'repcomments')}>{item.userLike} </span>
                              <span onClick={() => onReplyComment(comment.id)}>Reply</span>
                              {item.userLike === 'Unlike' && <ThumbUpAltIcon />}
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
export default memo(ContentComment);
