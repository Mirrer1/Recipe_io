import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import Router from 'next/router';
import Link from 'next/link';

import wrapper from '../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../components/AppLayout/';
import RecentPostList from '../components/HomePost/RecentPostList';
import HomeFooter from '../components/HomePost/HomeFooter';
import TopPostList from '../components/HomePost/TopPostList';
import {
  LOAD_RECENT_POSTS_REQUEST,
  LOAD_TOP_POSTS_REQUEST,
} from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import {
  HomeWrapper,
  HomeLogoHeader,
  HomeLogoText,
  PageMainText,
  PageSubText,
  HomeInputWrapper,
  TopPostsWrapper,
  HomePosts,
  TopPostsIcon,
  HomePostsText,
  RecentPostsIcon,
} from '../styles/pageStyles';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state?.user);
  const {
    topPosts,
    recentPosts,
    hasMorePosts,
    loadRecentPostsLoading,
    likePostDone,
    unLikePostDone,
  } = useSelector((state) => state.post);

  const onSearch = useCallback((tag) => {
    Router.push(`/hashtag/${tag}`);
  }, []);

  useEffect(() => {
    if (likePostDone || unLikePostDone) {
      dispatch({
        type: LOAD_TOP_POSTS_REQUEST,
      });
    }
  }, [likePostDone, unLikePostDone]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadRecentPostsLoading) {
          const lastId = recentPosts[recentPosts.length - 1]?.id;
          dispatch({
            type: LOAD_RECENT_POSTS_REQUEST,
            lastId,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadRecentPostsLoading, recentPosts]);

  return (
    <AppLayout>
      <HomeWrapper>
        <HomeLogoHeader>
          <HomeLogoText>
            <PageMainText className='bolder'>Recipe.io</PageMainText>
            <PageSubText>Have a delicious meal today</PageSubText>
          </HomeLogoText>
          {me && (
            <Link href='/posting'>
              <a>
                <Button
                  type='primary'
                  size='large'
                  icon={<PlusCircleOutlined />}
                >
                  Create Recipe
                </Button>
              </a>
            </Link>
          )}
        </HomeLogoHeader>

        <HomeInputWrapper
          placeholder='Search for Recipes'
          size='large'
          allowClear='true'
          enterButton
          onSearch={onSearch}
        />

        <TopPostsWrapper>
          <HomePosts>
            <TopPostsIcon />
            <HomePostsText className='bold'>Top Posts</HomePostsText>
          </HomePosts>
          <TopPostList topPosts={topPosts} />
        </TopPostsWrapper>

        <div>
          <HomePosts>
            <RecentPostsIcon />
            <HomePostsText className='bold'>Recent Posts</HomePostsText>
          </HomePosts>
          <RecentPostList recentPosts={recentPosts} />
        </div>
      </HomeWrapper>

      <HomeFooter />
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
      type: LOAD_TOP_POSTS_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_RECENT_POSTS_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Home;
