import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import Head from 'next/head';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout/';
import MyInfo from '../components/MyPage/MyInfo';
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_LIKED_POSTS_REQUEST,
  LOAD_BOARD_POSTS_REQUEST,
} from '../reducers/user';
import {
  MypageWrapper,
  MypageText,
  PageMainText,
  PageSubText,
  LogoutResult,
} from '../styles/pageStyles';

const profile = () => {
  const { me, nicknameEditDone, nicknameEditError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (!me) {
      message.error('로그인이 필요한 서비스입니다.', 1.5);
    }
  }, [me]);

  useEffect(() => {
    nicknameEditDone &&
      message.success('닉네임이 정상적으로 변경되었습니다.', 1.5);
    nicknameEditError && message.warning(nicknameEditError, 1.5);
  }, [nicknameEditDone, nicknameEditError]);

  return (
    <>
      <Head>
        <title>마이페이지 | Recipe.io</title>
      </Head>
      <AppLayout>
        <MypageWrapper>
          <MypageText>
            <PageMainText className='bolder'>MY PAGE</PageMainText>
            <PageSubText>
              Check out posts and likes through your page
            </PageSubText>
          </MypageText>

          {me ? (
            <MyInfo />
          ) : (
            <LogoutResult
              title='유저의 정보가 존재하지 않습니다.'
              extra={<div>로그인 후 이용해주세요.</div>}
            />
          )}
        </MypageWrapper>
      </AppLayout>
    </>
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
      type: LOAD_LIKED_POSTS_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_BOARD_POSTS_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default profile;
