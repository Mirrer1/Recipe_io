import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message, Modal } from 'antd';

import { clickedDeleteButtonAction, invisiblePostDeleteModalAction, removePostRequestAction } from '../../reducers/post';
import { BtnWrapper, ModalIcon, ModalMainText, ModalSubText } from '../../styles/homePost';

const PostDeleteModal = () => {  
  const dispatch = useDispatch();
  const { deletePost, deleteCliked, postDeleteModalVisible } = useSelector((state) => state.post);
  
  const postDeleteModalOkBtn = useCallback(() => {   
    dispatch(clickedDeleteButtonAction());        
  }, []);
  
  const postDeleteModalCancelBtn = useCallback(() => {        
    dispatch(invisiblePostDeleteModalAction());    
  }, []);

  useEffect(() => {
    (deletePost && deleteCliked) && dispatch(removePostRequestAction(deletePost));        
  }, [deletePost, deleteCliked]);

  return (
    <>
      <Modal
        visible={postDeleteModalVisible}        
        onOk={postDeleteModalOkBtn}
        onCancel={postDeleteModalCancelBtn}
        > 
          <BtnWrapper>
            <ModalIcon />    
            <ModalMainText>게시글을 정말 삭제하시겠습니까?</ModalMainText>
          </BtnWrapper>        
          <ModalSubText>삭제된 게시글은 복구할 수 없습니다.</ModalSubText>                
        </Modal>
    </>
  );
};

export default PostDeleteModal;