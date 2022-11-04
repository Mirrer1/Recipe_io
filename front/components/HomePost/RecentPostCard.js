import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Popover, Button } from 'antd';
import { HeartOutlined, CommentOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { backUrl } from '../../config/config';
import { 
  loadPostRequestAction, likePostRequestAction, unLikePostRequestAction, moveToCommentRequestAction, 
  visiblePostDeleteModalAction, moveToEditPostRequestAction, REPORT_MODAL_VISIBLE
} from '../../reducers/post';
import { RecentCardBody, RecentCard, RecentImageWrapper, PostImage, HomePostGlobalStyle } from '../../styles/homePost'
import PostShareBtn from './PostShareBtn';

const RecentPostCard = ({ post }) => {  
  const dispatch = useDispatch();    
  const id = useSelector((state) => state.user.me && state.user.me.id);    
  const liked = post.Likers.find((v) => v.id === id);  

  const onLikePost = useCallback(() => {    
    dispatch(likePostRequestAction(post.id));        
  }, []);
  
  const unLikePost = useCallback(() => {
    dispatch(unLikePostRequestAction(post.id));        
  }, []);    

  const showPostModal = useCallback(() => {        
    dispatch(loadPostRequestAction(post.id));
  }, []);

  const recentPostCommentBtn = useCallback(() => {    
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

  const onClickPostReportBtn = useCallback(() => {
    dispatch({
      type: REPORT_MODAL_VISIBLE,
      data: {
        type: '게시글',
        title: post.title,
        nickname: post.User.nickname,
      }
    })
  }, []);
  
  return (    
    <article>
      <HomePostGlobalStyle />
      <RecentCard        
        bodyStyle={RecentCardBody}
        hoverable
        cover={
          <RecentImageWrapper>
            <PostImage 
              alt="post image" 
              src={`${backUrl}/${post.Images[0]?.src}`} 
              onClick={showPostModal} 
            />      
          </RecentImageWrapper>
        }
        actions={
          id && 
          [
            liked 
            ? <HeartTwoTone twoToneColor="#eb2f96" key="like" onClick={unLikePost} />
            : <HeartOutlined key="like" onClick={onLikePost} />,
            <CommentOutlined key="comment" onClick={recentPostCommentBtn} />,
            
            <Popover 
              key='more' 
              trigger='hover'
              content={(            
              <Button.Group>
                {
                  id && post.User.id === id
                  ? (
                    <>
                      <Button onClick={onClickEditPost}>수정</Button>
                      <Button danger onClick={showPostDeleteModal}>삭제</Button>                      
                    </>
                  )
                  : (
                    <>
                      <PostShareBtn postId={post.id}/>
                      <Button danger onClick={onClickPostReportBtn} >신고</Button>
                    </>
                  )
                }                                    
              </Button.Group>            
            )}>
              <EllipsisOutlined key="ellipsis" />
            </Popover>
          ]
        }
      >
        <Card.Meta          
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}   
          title={post.title}
          description={post.desc}
          onClick={showPostModal}
        />          
      </RecentCard>
    </article>
  )
};

RecentPostCard.propTypes = {
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

export default RecentPostCard;