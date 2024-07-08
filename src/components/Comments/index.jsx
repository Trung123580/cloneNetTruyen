import { useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';
import { UserLogin } from '~/components/Global/Login';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import style from './Comments.module.scss';
import { InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import { ModalShow } from '~/utils/common';
import UserComment from './UserComment';
import ContentComment from './ContentComment';
import { error } from '~/assets';
const cx = classNames.bind(style);
const Comments = ({ isToggle }) => {
  const { refTextAria, info } = useContext(UserLogin); // ref Global
  const [comments, setComments] = useState([]);
  const [inputs, setInputs] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [user, setUser] = useState(null);
  const [isShowInput, setIsShowInput] = useState(false);
  const [reRender, setReRender] = useState(false);
  const [isShowMenuComment, setIsShowMenuComment] = useState(false);
  // id active
  const [idActiveComment, setIdActiveComment] = useState(0);
  // edit comment
  const [isEdiComment, setIsEditComment] = useState(false);
  // reply comment
  const [replyCommentUser, setReplyCommentUser] = useState([]);
  const [isShowReply, setIsShowReply] = useState(false);
  // dom menu comment
  // modal onShow end unShow
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (userInfo) {
      setUser({ ...userInfo });
      setIsShowInput(false);
    }
  }, []);
  useEffect(() => {
    const get = async () => {
      await axios
        .get(`https://deploy-net-tuyen-hmgp.vercel.app/user${info?.uid}`)
        .then((response) => {
          const [userInfo] = response.data;
          setUserProfile(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    get();
  }, [info]);
  useEffect(() => {
    const getComment = async () => {
      await axios
        .get(`https://deploy-net-tuyen-hmgp.vercel.app/comments`)
        .then((res) => {
          setComments([...res.data]);
        })
        .catch((err) => console.log(err));
    };
    const getReplyComment = async () => {
      await axios
        .get('https://deploy-net-tuyen-hmgp.vercel.app/reply/comment')
        .then((res) => setReplyCommentUser([...res.data]))
        .catch((err) => console.log(err));
    };
    getComment();
    getReplyComment();
  }, [reRender]);
  // sort by
  const handleChangeSelect = (event) => {
    setSortBy(event.target.value);
  };
  // ShowMenuAction comment
  const handleShowMenuComment = (id, uidComment) => {
    uidComment ? setIdActiveComment(uidComment) : setIdActiveComment(id);
    setIsShowMenuComment(!isShowMenuComment);
  };
  // submit form
  console.log(user);
  const handleSubmitComment = (event, urlComment, idComment) => {
    event.preventDefault();
    if (!inputs) return;
    let data = {};
    data = {
      ...user,
      imgUrl: userProfile?.imgUrl || info?.imgUrl,
      comments: inputs,
      userLike: 'Like',
      uid: uuid(),
      collapse: false,
      idUser: userProfile?.id,
    };
    if (urlComment === 'repcomments')
      data = {
        ...user,
        imgUrl: userProfile?.imgUrl || info?.imgUrl,
        comments: inputs,
        userLike: 'Like',
        id: idComment,
        uid: uuid(),
        collapse: false,
        idUser: userProfile?.id,
      };
    axios
      .post(`https://deploy-net-tuyen-hmgp.vercel.app/create/${urlComment}`, { ...data })
      .then(() => {
        setReRender(!reRender);
        setInputs('');
      })
      .catch((err) => {
        console.log(err);
        throw new Error('Network response was not ok');
      });
    refTextAria.current.focus();
    refTextAria.current.value = '';
  };

  // like comment
  const handleLikeComment = async (idUser, userLike, urlComment) => {
    if (userLike === 'Like') await axios.put(`https://deploy-net-tuyen-hmgp.vercel.app/update/${urlComment}/like${idUser}`, { userLike: 'Unlike' });
    if (userLike === 'Unlike') await axios.put(`https://deploy-net-tuyen-hmgp.vercel.app/update/${urlComment}/like${idUser}`, { userLike: 'Like' });
    setReRender(!reRender);
  };
  // deleteComment
  const handleDeleteComment = async (idComment, uidComment, idUser) => {
    //hide MenuComment
    if (userProfile?.id === idUser) {
      //deleteComment api
      await axios
        .delete(`https://deploy-net-tuyen-hmgp.vercel.app/delete/${uidComment ? 'repcomments' : 'comments'}${uidComment ? uidComment : idComment}`)
        .then((res) => setReRender(!reRender));
    } else {
      alert('ko phai comments cua ban');
    }
    setIsShowMenuComment(false);
  };
  // collapse comment
  const handleCollapseComment = async (idComment, urlComment, booleanComment) => {
    if (urlComment === 'comments')
      await axios.put(`https://deploy-net-tuyen-hmgp.vercel.app/update/${urlComment}/collapse${idComment}`, { collapse: booleanComment });
    if (urlComment === 'repcomments')
      await axios.put(`https://deploy-net-tuyen-hmgp.vercel.app/update/${urlComment}/collapse${idComment}`, { collapse: booleanComment });
    setIsShowMenuComment(false);
    setReRender(!reRender);
  };
  const handleShowEditComment = (idComment, uidComment) => {
    uidComment ? setIdActiveComment(uidComment) : setIdActiveComment(idComment);
    setIsEditComment(!isEdiComment);
    setIsShowMenuComment(false);
  };
  const handleHideEditForm = () => {
    setIsShowReply(false);
  };
  const handleFromEditComment = async (event, idComment, urlComment) => {
    event.preventDefault();
    console.log(idComment);
    console.log(urlComment);
    // urlComment sua theo url ten cua comment
    await axios.put(`https://deploy-net-tuyen-hmgp.vercel.app/update/comments/${urlComment}${idComment}`, { comments: inputs }).then((res) => {
      setIsEditComment(false);
      setReRender(!reRender);
      setIsShowMenuComment(false);
    });
  };
  // Reply comment
  const handleReplyComment = (idComment) => {
    setIdActiveComment(idComment);
    const isExit = comments.some(({ id }) => id === idComment);
    if (isExit) {
      setIsShowReply(!isShowReply);
    } else {
      setIsShowReply(false);
    }
  };
  return (
    <>
      <div
        className={cx('layout', {
          theme: isToggle ? false : true,
        })}>
        <div className={cx('comments')}>
          <h2>Bình luận</h2>
          <div className={cx('header')}>
            <div className={cx('total-comments')}>
              <span>{comments.length} comments</span>
            </div>
            <FormControl sx={{ my: 1, minWidth: 120 }} size='small'>
              <InputLabel id='demo-select-small-label'>Sort by</InputLabel>
              <Select
                variant='outlined'
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={sortBy}
                label='Age'
                onChange={handleChangeSelect}
                sx={{ fontSize: '1.4rem' }}>
                <MenuItem value='' sx={{ fontSize: '1.4rem' }}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1} sx={{ fontSize: '1.4rem' }}>
                  Newest
                </MenuItem>
                <MenuItem value={2} sx={{ fontSize: '1.4rem' }}>
                  Oldest
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={cx('user')}>
            <div className={cx('avatar')}>
              <img src={userProfile?.imgUrl || user?.imgUrl || error} alt='error' />
            </div>
            <form className={cx('from-comments')} onSubmit={(e) => handleSubmitComment(e, 'comments')}>
              {isShowInput ? (
                <UserComment isToggle={isToggle} refTextAria={refTextAria} onChange={(e) => setInputs(e.target.value)} />
              ) : (
                <div
                  className={cx('note')}
                  onClick={() => {
                    user ? setIsShowInput(!isShowInput) : handleOpenModal();
                  }}>
                  Mời bạn thảo luận, vui lòng không spam, share link kiếm tiền, thiếu lành mạnh,...
                </div>
              )}
            </form>
          </div>
          <div className={cx('content')}>
            {comments.map((comment) => {
              return (
                <ContentComment
                  key={comment.id}
                  // info user action comment
                  user={user}
                  // data comment
                  comment={comment}
                  onShowMenuComment={handleShowMenuComment}
                  isShowMenuComment={isShowMenuComment}
                  idActiveComment={idActiveComment}
                  onDeleteComment={handleDeleteComment}
                  onCollapseComment={handleCollapseComment}
                  onShowEditComment={handleShowEditComment}
                  onHideEditForm={handleHideEditForm}
                  isEdiComment={isEdiComment}
                  onLikeComment={handleLikeComment}
                  // edit comment
                  onFromEditComment={handleFromEditComment}
                  isToggle={isToggle}
                  onChange={(e) => setInputs(e.target.value)}
                  // Reply comment
                  onReplyComment={handleReplyComment}
                  dataReplyComment={replyCommentUser || []}
                  isShowReply={isShowReply}
                  // handleSubmitComment add Comment
                  onSubmitComment={(e) => handleSubmitComment(e, 'repcomments', comment.id)}
                  userProfile={userProfile}
                />
              );
            })}
          </div>
        </div>
        <div className={cx('hideSidebar')}></div>
      </div>
      <ModalShow
        isToggle={isToggle}
        open={open}
        onCloseModal={handleCloseModal}
        title='Bạn chưa đang nhập để comment'
        description='Bạn hãy đăng nhập đểcomment/ nếu chưa có tài khoản hãy tạo bằng gmail hoặc đăng nhập trược tiếp bằng Facebook hay Goggle'
      />
    </>
  );
};
export default Comments;
