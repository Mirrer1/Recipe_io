import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { loadPostRequestAction, unLikePostRequestAction } from '../../reducers/post';
import { ScrapCardBody, ScrapCardWrapper, ScrapImage, MyPageImage } from '../../styles/myPage';

const ScrapCard = ({ post }) => {  
  const dispatch = useDispatch();

  const showPostModal = useCallback(() => {        
    dispatch(loadPostRequestAction(post.id));
  }, []);  
  
  const unLikePost = useCallback((id) => () => {
    dispatch(unLikePostRequestAction(id));        
  }, []);
  
  return (
    <article>      
      <ScrapCardWrapper
        bodyStyle={ScrapCardBody}    
        cover={
          <ScrapImage>
            <MyPageImage 
              alt='scrap post image'                            
              src={`${post.Images[0].src}`}
              onClick={showPostModal}
            />
          </ScrapImage>
        }
        actions={[<DeleteOutlined key='delete' onClick={unLikePost(post.id)} />]}
        hoverable
      >
        <Card.Meta
          title={post.title}
          description={post.desc}
          onClick={showPostModal}
        />            
      </ScrapCardWrapper>
    </article>
  );
};

ScrapCard.propTypes = {
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

export default ScrapCard;