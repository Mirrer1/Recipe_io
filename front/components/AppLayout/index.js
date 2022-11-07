import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import PropTypes from 'prop-types';

import LoginMenu from '../HeaderMenu/LoginMenu';
import LogoutMenu from '../HeaderMenu/LogoutMenu';
import PostModal from '../Modal/PostModal';
import PostDeleteModal from '../Modal/PostDeleteModal';
import CommentDeleteModal from '../Modal/CommentDeleteModal';
import ContactEmailForm from '../Modal/ContactEmailForm';
import ReportModal from '../Modal/ReportModal';
import { MenuDivider, UpBtn, UpBtnIcon } from '../../styles/appLayout';
import { RESET_LOGIN_STATE, RESET_LOGOUT_STATE } from '../../reducers/user';
import { RESET_REMOVE_POST_STATE, RESET_LIKE_STATE, RESET_UNLIKE_STATE, RESET_ADD_COMMENT_STATE, RESET_REMOVE_COMMENT_STATE } from '../../reducers/post';

const AppLayout = ({ children }) => {  
  const { me, logInDone, logInError, logOutDone, contactFormVisible } = useSelector((state) => state.user);
  const { 
    singlePost, postDeleteModalVisible, commentDeleteModalVisible, removePostDone, likePostDone, likePostError, 
    unLikePostDone, unLikePostError, addCommentDone, addCommentError, removeCommentDone, reportModalVisible,  
  } = useSelector((state) => state.post);
  const [showBtn, setShowBtn] = useState(false);
  const topPageRef = useRef();    

  const dispatch = useDispatch();
  useEffect(() => {
    logInDone && message.success('반갑습니다. 맛있는 식사 하세요.', 1.5);
    logInError && message.warning(logInError, 1.5);        
    if (logInDone || logInError) {
      dispatch({
        type: RESET_LOGIN_STATE,
      });
    }
  }, [logInDone, logInError]);

  useEffect(() => {
    logOutDone && message.success('정상적으로 로그아웃되었습니다.', 1.5);
    if (logOutDone) {
      dispatch({
        type: RESET_LOGOUT_STATE,
      });
    }
  }, [logOutDone]);

  useEffect(() => {
    removePostDone && message.error('게시글이 정상적으로 삭제되었습니다.', 1.5);
    if (removePostDone) {
      dispatch({
        type: RESET_REMOVE_POST_STATE,
      });
    }
  }, [removePostDone]);

  useEffect(() => {
    likePostDone && message.success('게시글이 스크랩에 추가되었습니다.', 1.5);
    likePostError && message.warning(likePostError, 1.5);        
    if (likePostDone || likePostError) {
      dispatch({
        type: RESET_LIKE_STATE,
      });
    }
  }, [likePostDone, likePostError]);

  useEffect(() => {
    unLikePostDone && message.error('게시글이 스크랩에서 삭제되었습니다.', 1.5);
    unLikePostError && message.warning(unLikePostError, 1.5);
    if (unLikePostDone || unLikePostError) {
      dispatch({
        type: RESET_UNLIKE_STATE,
      });
    }
  }, [unLikePostDone, unLikePostError]);

  useEffect(() => {
    addCommentDone && message.success('해당 게시글에 댓글이 작성되었습니다.', 1.5);
    addCommentError && message.warning(addCommentError, 1.5);        
    if (addCommentDone || addCommentError) {
      dispatch({
        type: RESET_ADD_COMMENT_STATE,
      });
    }
  }, [addCommentDone, addCommentError]);

  useEffect(() => {
    removeCommentDone && message.error('정상적으로 댓글이 삭제되었습니다.', 1.5);    
    if (removeCommentDone) {
      dispatch({
        type: RESET_REMOVE_COMMENT_STATE,
      });
    }
  }, [removeCommentDone]);

  const moveToMenuBtn = useCallback(() => {
    topPageRef.current?.scrollIntoView({behavior: "smooth"});
  }, []); 

  useEffect(() => {
    function onScroll() {
      window.scrollY > 400 && setShowBtn(true);
      window.scrollY < 400 && setShowBtn(false);
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []); 
  
  return (
    <>
      <div ref={topPageRef}>
        {me ? <LoginMenu /> : <LogoutMenu  />}      
      </div>      
      <MenuDivider />      
      {children}
      {showBtn && <UpBtn onClick={moveToMenuBtn}><UpBtnIcon /></UpBtn>}

      {singlePost && <PostModal />}
      {postDeleteModalVisible && <PostDeleteModal />}
      {commentDeleteModalVisible && <CommentDeleteModal />}
      {contactFormVisible && <ContactEmailForm />}
      {reportModalVisible && <ReportModal />}      
    </>
  )
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout;