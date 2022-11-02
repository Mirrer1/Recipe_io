import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Form, Row } from 'antd';
import PropTypes from 'prop-types';

import { EDIT_COMMENT_REQUEST, INVISIBLE_EDIT_COMMENT } from '../../reducers/post';
import { CommentEditForm, CommentEditBtn, CommentEditCancelBtn } from '../../styles/modal';

const EditCommentForm = ({ postId, commentId }) => {
  const dispatch = useDispatch();  
  const [form] = Form.useForm();
  
  const onEditComment = useCallback((e) => {
    dispatch({
      type: EDIT_COMMENT_REQUEST,
      data: {
        content: e.editCommentText,
        postId: postId,
        commentId: commentId,
      }
    })
  }, []);

  const onClickEditCancelBtn = useCallback(() => {
    dispatch({
      type: INVISIBLE_EDIT_COMMENT,
    })    
  }, []);

  return (
    <>
      <CommentEditForm                    
        form={form}
        name="editComment"
        onFinish={onEditComment}      
      >
        <Form.Item
          name="editCommentText"
          rules={[
            {
              type: 'text',
            },
            {
              required: true,
              message: '댓글을 입력하세요.',
            },
          ]}
          hasFeedback
        >
          <Input.TextArea placeholder='수정할 댓글을 입력하세요.' showCount maxLength={100} rows={2} />
        </Form.Item>

        <Row align='end'>
          <CommentEditBtn type='text' htmlType='submit' >수정</CommentEditBtn>
          <CommentEditCancelBtn type='text' danger onClick={onClickEditCancelBtn}>취소</CommentEditCancelBtn>
        </Row>
      </CommentEditForm>
    </>
  )
};

EditCommentForm.propTypes = {  
  postId: PropTypes.number,
  commentId: PropTypes.number, 
};

export default EditCommentForm;