import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Row } from 'antd';
import PropTypes from 'prop-types';

import { ADD_COMMENT_REQUEST } from '../../reducers/post';

const CommentForm = ({ postId }) => {   
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { addCommentLoading, moveToComment } = useSelector((state) => state.post);  
  const { me } = useSelector((state) => state.user);      
  const commentRef = useRef();
  const inputRef = useRef();

  useEffect(() => {   
    if (moveToComment) {
      setTimeout(() => {        
        commentRef.current?.scrollIntoView({behavior: "smooth"});      
      }, [500]);
  
      setTimeout(() => {
        inputRef.current?.focus();     
      }, [1000]);        
    } 
  }, [moveToComment]);  
  
  const onSubmitComment = useCallback((value) => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: value.comment, 
        postId: postId,
      }
    })
    form.resetFields();    
  }, []);

  return (
    <>
      <Form 
        form={form}
        name="writeComment"
        onFinish={onSubmitComment}      
      >
        <Form.Item
          name="comment"
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
          <div ref={commentRef}>
            {
              me 
              ? <Input.TextArea placeholder='댓글을 입력하세요.' showCount maxLength={100} rows={2} ref={inputRef} />
              : <Input.TextArea placeholder='로그인이 필요한 서비스입니다.' showCount maxLength={100} rows={2} disabled />
            }
          </div>        
        </Form.Item>
        
        <Row align='end'>
          <Button type='primary' htmlType='submit' loading={addCommentLoading}>등록</Button>
        </Row>
      </Form>
    </>
  )
};

CommentForm.propTypes = {
  postId: PropTypes.number,
};

export default CommentForm;