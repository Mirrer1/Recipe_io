import React, { useCallback, useEffect } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalTag from './ModalTag';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { invisiblePostModalAction, returnFromCommentRequestAction, visiblePostModalAction } from '../../reducers/post';
import { ModalContentGlobalStyle, ModalWrapper, ModalTagWrapper } from '../../styles/modal';

const PostModal = () => {  
  const dispatch = useDispatch();
  const { singlePost, postModalVisible, moveToComment } = useSelector((state) => state.post); 

  useEffect(() => {    
    singlePost && dispatch(visiblePostModalAction());        
  }, [singlePost?.id]);  

  const postModalOkBtn = useCallback(() => {        
    dispatch(invisiblePostModalAction());    
    moveToComment && dispatch(returnFromCommentRequestAction());
  }, []);

  const postModalCancelBtn = useCallback(() => {        
    dispatch(invisiblePostModalAction());    
    moveToComment && dispatch(returnFromCommentRequestAction());
  }, []);

  return (
    <article>
      <ModalContentGlobalStyle />
      <Modal            
        centered          
        visible={postModalVisible}          
        okText='확인'
        cancelText='닫기'
        onOk={postModalOkBtn}
        onCancel={postModalCancelBtn}
        width={1000}
      >
        <ModalWrapper>              
          <ModalHeader post={singlePost} />
          <ModalContent post={singlePost} />
        </ModalWrapper>

        <ModalTagWrapper>
          {singlePost.tags && <ModalTag tags={singlePost.tags} />}        
        </ModalTagWrapper>      
        <CommentForm postId={singlePost.id} />              
        <CommentList Comments={singlePost.Comments} postId={singlePost.id} />                   
      </Modal>
    </article>
  )
};

export default PostModal;