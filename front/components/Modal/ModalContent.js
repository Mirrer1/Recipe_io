import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Router from 'next/router';

import ModalImage from './ModalImage';
import {
  visiblePostDeleteModalAction,
  moveToEditPostRequestAction,
} from '../../reducers/post';
import {
  ContentBtnWrapper,
  ContentBtn,
  ContentImageWrapper,
  ContentCard,
} from '../../styles/modal';

const ModalContent = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me && state.user.me.id);

  const showPostDeleteModal = useCallback(() => {
    dispatch(visiblePostDeleteModalAction(post.id));
  }, []);

  const onClickEditPost = useCallback(() => {
    dispatch(moveToEditPostRequestAction(post));
    Router.push('/posting');
  }, []);

  return (
    <>
      {id && post.User.id === id && (
        <ContentBtnWrapper align='end'>
          <ContentBtn type='text' onClick={onClickEditPost}>
            수정
          </ContentBtn>
          <ContentBtn type='text' danger onClick={showPostDeleteModal}>
            삭제
          </ContentBtn>
        </ContentBtnWrapper>
      )}

      <ContentImageWrapper>
        <ModalImage PostImages={post.Images} />
      </ContentImageWrapper>

      <ContentCard title='Ingredient' bordered={false}>
        {post.ingredient}
      </ContentCard>
      <ContentCard title='Recipes' bordered={false}>
        {post.recipes}
      </ContentCard>
      <ContentCard title='Tips' bordered={false}>
        {post.tips}
      </ContentCard>
    </>
  );
};

ModalContent.propTypes = {
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
  }),
};

export default ModalContent;
