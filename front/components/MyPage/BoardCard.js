import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Popover, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { backUrl } from '../../config/config';
import { 
  likePostRequestAction, unLikePostRequestAction, loadPostRequestAction, moveToCommentRequestAction, 
  visiblePostDeleteModalAction, moveToEditPostRequestAction,
} from '../../reducers/post';
import {
  BoardCardHeader, BoardCardBody, MoreIcon, ColWrapper, CardTextWrapper, CardTitle, CardText, CardContent, 
  HeaderBtn, TwoToneHeartBtnIcon, HeartBtnIcon, CommentBtnIcon, CardImageWrapper, ImageWrapper, 
} from '../../styles/myPage';

const BoardCard = ({ post }) => {
  const dispatch = useDispatch();      
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);
  
  const onLikePost = useCallback((id) => () => {
    dispatch(likePostRequestAction(id));            
  }, []);

  const unLikePost = useCallback((id) => () => {
    dispatch(unLikePostRequestAction(id));        
  }, []);

  const showPostModal = useCallback(() => {        
    dispatch(loadPostRequestAction(post.id));
  }, []);

  const boardPostCommentBtn = useCallback(() => {    
    dispatch(loadPostRequestAction(post.id));
    dispatch(moveToCommentRequestAction());
  }, []);
  
  const showPostDeleteModal = useCallback(() => {        
    dispatch(visiblePostDeleteModalAction(post.id));
  }, []);

  const onClickEditPost = useCallback(() => {
    dispatch(moveToEditPostRequestAction(post));
    Router.push('/posting');
  }, []);

  return (
    <article>            
      <Card      
        headStyle={BoardCardHeader}
        bodyStyle={BoardCardBody}
        hoverable              
        extra={[          
          <Popover            
            trigger="click"  
            content={
              <>
                <Button onClick={onClickEditPost}>수정</Button>
                <Button danger onClick={showPostDeleteModal}>삭제</Button>
              </>
            }             
          >
            <MoreIcon key="ellipsis"/>
          </Popover>
        ]}      
      > 
        <Row>
          <ColWrapper xs={24} md={16}>
            <CardTextWrapper>
              <CardText                
                title={<CardTitle>{post.title}</CardTitle>}
                description={post.desc}
                onClick={showPostModal}
              />
              <CardContent onClick={showPostModal}>{post.recipes}</CardContent>
            </CardTextWrapper>

            <div>
              {
                liked 
                ? <HeaderBtn type='text' icon={<TwoToneHeartBtnIcon twoToneColor="#eb2f96" onClick={unLikePost(post.id)} />}>{post.Likers.length}</HeaderBtn>
                : <HeaderBtn type='text' icon={<HeartBtnIcon />} onClick={onLikePost(post.id)}>{post.Likers.length}</HeaderBtn>
              }                               
              <HeaderBtn type='text' icon={<CommentBtnIcon />} onClick={boardPostCommentBtn} >{post.Comments.length}</HeaderBtn>            
            </div>
          </ColWrapper>
          
          <Col xs={24} md={8}>
            <CardImageWrapper>
              <ImageWrapper
                alt="board image"                
                src={`${backUrl}/${post.Images[0]?.src}`}
                onClick={showPostModal}
              />
            </CardImageWrapper>
          </Col>
        </Row>
      </Card>
    </article>
  );
};

BoardCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    desc: PropTypes.string,
    ingredient: PropTypes.string,
    recipes: PropTypes.string,
    tips: PropTypes.string,
    tags: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    UserId: PropTypes.number,
    User: PropTypes.object,    
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  })
};

export default BoardCard;