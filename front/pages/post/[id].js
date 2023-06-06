import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Router from 'next/router';

import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../../components/AppLayout';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import {
  SinglePostResult,
  SinglePostIcon,
  SinglePostText,
  SinglePostBtn,
} from '../../styles/pageStyles';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  const onClickMoveBtn = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost?.title} 게시글</title>
        <meta name='description' content={singlePost?.desc} />
        <meta
          property='og:title'
          content={`${singlePost?.User.nickname}님의 게시글`}
        />
        <meta property='og:description' content={singlePost?.desc} />
        <meta property='og:image' content={singlePost?.Images[0].src} />
        <meta property='og:url' content={`http://recipeio.site/post/${id}`} />
      </Head>

      <SinglePostResult
        icon={<SinglePostIcon />}
        title={
          <SinglePostText className='bold'>
            Recipe.Io를 통해 더 많은 레시피를 확인해보세요.
          </SinglePostText>
        }
        extra={
          <SinglePostBtn
            className='bold'
            type='primary'
            onClick={onClickMoveBtn}
          >
            Go to Page
          </SinglePostBtn>
        }
      />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Post;
