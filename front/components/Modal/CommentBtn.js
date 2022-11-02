import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { VISIBLE_COMMENT_DELETE_MODAL, VISIBLE_EDIT_COMMENT, REPORT_MODAL_VISIBLE } from '../../reducers/post';

const CommentBtn = ({ comment }) => {    
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me && state.user.me.id);    
  const { editComment } = useSelector((state) => state.post);

  const showCommentDeleteModal = useCallback((comment) => () => {        
    dispatch({
      type: VISIBLE_COMMENT_DELETE_MODAL,
      data: comment,
    });
  }, []);

  const onClickEditCommentBtn = useCallback((id) => () => {
    dispatch({
      type: VISIBLE_EDIT_COMMENT,
      data: id,
    })
  }, []);

  const onClickCommentReportBtn = useCallback(() => {
    dispatch({
      type: REPORT_MODAL_VISIBLE,
      data: {
        type: 'Comment',
        title: comment.content,
        nickname: comment.User.nickname,
      }
    })
  }, []);

  return (
    <>
      {
        (editComment === comment.id) ||  
          <Popover 
            key='more' 
            trigger='hover'
            content={(            
              <Button.Group>
                {
                  id === comment.User.id
                  ? (
                    <>
                      <Button onClick={onClickEditCommentBtn(comment.id)}>수정</Button>
                      <Button danger onClick={showCommentDeleteModal(comment)}>삭제</Button>                      
                    </>
                  )
                  : (
                    <>                      
                      <Button danger onClick={onClickCommentReportBtn} >신고</Button>
                    </>
                  )
                }                                    
              </Button.Group>            
            )}>
            <EllipsisOutlined key="ellipsis" />
          </Popover>            
        }      
    </>
  );
};

CommentBtn.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    UserId: PropTypes.number,
    PostId: PropTypes.number,
    User: PropTypes.object,   
  })
};

export default CommentBtn;