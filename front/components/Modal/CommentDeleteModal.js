import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';

import {
  clickedDeleteButtonAction,
  INVISIBLE_COMMENT_DELETE_MODAL,
  REMOVE_COMMENT_REQUEST,
} from '../../reducers/post';
import {
  BtnWrapper,
  ModalIcon,
  ModalMainText,
  ModalSubText,
} from '../../styles/homePost';

const CommentDeleteModal = () => {
  const dispatch = useDispatch();
  const {
    deleteComment,
    deleteCliked,
    commentDeleteModalVisible,
    removeCommentLoading,
  } = useSelector((state) => state.post);

  const commentDeleteModalOkBtn = useCallback(() => {
    dispatch(clickedDeleteButtonAction());
  }, []);

  const commentDeleteModalCancelBtn = useCallback(() => {
    dispatch({
      type: INVISIBLE_COMMENT_DELETE_MODAL,
    });
  }, []);

  useEffect(() => {
    if (deleteComment && deleteCliked) {
      dispatch({
        type: REMOVE_COMMENT_REQUEST,
        data: deleteComment,
      });
    }
  }, [deleteComment, deleteCliked]);

  return (
    <>
      <Modal
        centered
        visible={commentDeleteModalVisible}
        onOk={commentDeleteModalOkBtn}
        onCancel={commentDeleteModalCancelBtn}
        confirmLoading={removeCommentLoading}
      >
        <BtnWrapper>
          <ModalIcon />
          <ModalMainText>댓글을 정말 삭제하시겠습니까?</ModalMainText>
        </BtnWrapper>
        <ModalSubText>삭제된 댓글은 복구할 수 없습니다.</ModalSubText>
      </Modal>
    </>
  );
};

export default CommentDeleteModal;
