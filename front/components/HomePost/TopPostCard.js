import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Avatar, Row } from 'antd';
import { HeartTwoTone, HeartOutlined, CommentOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { loadPostRequestAction } from '../../reducers/post';
import { 
  TopPostCardBody, HomePostGlobalStyle, TopImageWrapper, PostImage, TopPostBtn, TopPostBtnText 
} from '../../styles/homePost';

const TopPostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me && state.user.me.id);    
  const liked = post.Likers.find((v) => v.id === id);    

  const showPostModal = useCallback(() => {    
    dispatch(loadPostRequestAction(post.id));
  }, []);

  return (
    <article>
      <HomePostGlobalStyle />
      <Card 
        bodyStyle={TopPostCardBody}
        hoverable
        cover={
          <TopImageWrapper>
            <PostImage 
              alt='top post image' 
              src={`${post.Images[0]?.src}`} 
              onClick={showPostModal} 
            />
          </TopImageWrapper>
        }        
      >
        <Card.Meta              
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}   
          title={post.title}
          description={post.desc}          
          onClick={showPostModal}
        />        
          <Row justify='end'>
            {
              liked 
              ? <TopPostBtn type='text' icon={<HeartTwoTone twoToneColor="#eb2f96" />} ><TopPostBtnText>{post.Likers.length}</TopPostBtnText></TopPostBtn>
              : <TopPostBtn type='text' icon={<HeartOutlined />} ><TopPostBtnText>{post.Likers.length}</TopPostBtnText></TopPostBtn>
            }
            <TopPostBtn type='text' icon={<CommentOutlined  />} ><TopPostBtnText>{post.Comments.length}</TopPostBtnText></TopPostBtn>                      
          </Row>          
      </Card>
    </article>
  )
};

TopPostCard.propTypes = {
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

export default TopPostCard;