import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Modal } from 'antd';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dayjs from 'dayjs';

import {
  likePostRequestAction,
  unLikePostRequestAction,
  moveToCommentRequestAction,
} from '../../reducers/post';
import { UserAvatarLink } from '../../styles/headerMenu';
import {
  TitleWrapper,
  TitleDate,
  HeaderTitle,
  HeaderWrapper,
  HeaderNicknameWrapper,
  HeaderNickname,
  HeaderInfo,
  HeaderBtn,
  TwoToneHeartBtnIcon,
  HeartBtnIcon,
  CommentBtnIcon,
  HeaderDivider,
} from '../../styles/modal';

dayjs.locale('ko');

const ModalHeader = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const liked = post.Likers.find((v) => v.id === id);

  const info = () => {
    Modal.info({
      title: '로그인이 필요한 서비스입니다.',
      onOk() {},
    });
  };

  const onLikePost = useCallback(() => {
    if (!id) {
      info();
      return;
    }
    dispatch(likePostRequestAction(post.id));
  }, []);

  const unLikePost = useCallback(() => {
    dispatch(unLikePostRequestAction(post.id));
  }, []);

  const modalHeaderCommentBtn = useCallback(() => {
    dispatch(moveToCommentRequestAction());
  }, []);

  return (
    <>
      <TitleWrapper>
        <HeaderTitle className='bold'>{post.title}</HeaderTitle>
        <TitleDate>{dayjs(post.createdAt).format('YYYY.MM.DD')}</TitleDate>
      </TitleWrapper>

      <HeaderWrapper>
        <HeaderInfo>
          <Avatar>
            <Link href={`user/${post.User.id}`}>
              <UserAvatarLink>{post.User.nickname[0]}</UserAvatarLink>
            </Link>
          </Avatar>
          <HeaderNicknameWrapper>
            <Link href={`user/${post.User.id}`}>
              <HeaderNickname className='bold'>
                {post.User.nickname}
              </HeaderNickname>
            </Link>
          </HeaderNicknameWrapper>
        </HeaderInfo>

        <div>
          {liked ? (
            <HeaderBtn
              type='text'
              icon={
                <TwoToneHeartBtnIcon
                  twoToneColor='#eb2f96'
                  onClick={unLikePost}
                />
              }
            >
              {post.Likers.length}
            </HeaderBtn>
          ) : (
            <HeaderBtn type='text' icon={<HeartBtnIcon />} onClick={onLikePost}>
              {post.Likers.length}
            </HeaderBtn>
          )}
          <HeaderBtn
            type='text'
            icon={<CommentBtnIcon />}
            onClick={modalHeaderCommentBtn}
          >
            {post.Comments.length}
          </HeaderBtn>
        </div>
      </HeaderWrapper>
      <HeaderDivider />
    </>
  );
};

ModalHeader.propTypes = {
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

export default ModalHeader;
