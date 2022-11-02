import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';

import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../../components/AppLayout';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST } from '../../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { HomeWrapper, MypageText, MypageWrapper, PageMainText, PageSubText } from '../../styles/pageStyles';
import RecentPostList from '../../components/HomePost/RecentPostList';
import HomeFooter from '../../components/HomePost/HomeFooter';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { userInfo } = useSelector((state) => state.user);
  const { recentPosts, hasMorePosts, loadRecentPostsLoading } = useSelector((state) => state.post);
  
  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadRecentPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: recentPosts[recentPosts.length - 1]?.id,
            data: id,
          });    
        }
      }
    };    

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [hasMorePosts, id, recentPosts.length, loadRecentPostsLoading]);

  return (
    <AppLayout>
      <Head>
        <title>
          {userInfo?.nickname}님의 글
        </title>
        <meta name='description' content={recentPosts[0]?.desc}/>
        <meta property='og:title' content={`${recentPosts[0]?.User.nickname}님의 게시글`} />
        <meta property='og:description' content={recentPosts[0]?.desc} />        
        <meta property='og:image' content={recentPosts[0]?.Images[0]} />
        {/* <meta property='og:url' content={`https://nodebird.com/post/${id}`} /> -> 추후에 주소정하면 수정 */}
      </Head>

      <MypageWrapper>
        <MypageText>
          <PageMainText className='bold'>{`${userInfo?.nickname}님의 Posting Page`}</PageMainText>
          <PageSubText>
            {recentPosts.length 
            ? `총 ${recentPosts.length}건의 게시글이 등록되었습니다.`
            : `등록된 게시글이 존재하지 않습니다.`
            }          
          </PageSubText>
        </MypageText>
      </MypageWrapper>
      
      <HomeWrapper>
        <RecentPostList recentPosts={recentPosts} />
      </HomeWrapper>
      <HomeFooter />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });  
  context.store.dispatch({
    type: LOAD_USER_INFO_REQUEST,
    data: context.params.id,
  });  
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;