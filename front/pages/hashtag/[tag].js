import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';

import wrapper from '../../store/configureStore';
import axios from 'axios';
import { END } from 'redux-saga';

import AppLayout from '../../components/AppLayout';
import RecentPostList from '../../components/HomePost/RecentPostList';
import HomeFooter from '../../components/HomePost/HomeFooter';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_HASHTAG_POSTS_REQUEST } from '../../reducers/post';
import { HomeWrapper, MypageText, MypageWrapper, PageMainText, PageSubText } from '../../styles/pageStyles';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { recentPosts, hasMorePosts, loadRecentPostsLoading } = useSelector((state) => state.post);
  
  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadRecentPostsLoading) {
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId: recentPosts[recentPosts.length - 1]?.id,
            data: tag,
          });    
        }
      }
    };    

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  }, [hasMorePosts, tag, recentPosts.length, loadRecentPostsLoading]);

  return (
    <AppLayout>
      <Head>
        <title>
          #{tag} 게시글 검색결과
        </title>
        <meta name='description' content={`#${tag} 검색어로 게시글을 검색한 결과`}/>
        <meta property='og:title' content={`#${tag} 게시글 검색결과`} />
        <meta property='og:description' content={`#${tag} 검색어로 게시글을 검색한 결과`} />        
        <meta property='og:image' content={recentPosts[0]?.Images[0]} /> 
        <meta property='og:url' content={`http://recipeio.ga/hashtag/${tag}`} />
      </Head>
      
      <MypageWrapper>
        <MypageText>
          <PageMainText className='bold'>Search Results</PageMainText>
          <PageSubText>
            {recentPosts.length 
            ? `#${tag}의 검색결과 총 ${recentPosts.length}건의 게시글이 검색되었습니다.`
            : `검색된 게시글이 존재하지 않습니다.`
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
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.params.tag,
  });
  
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default User;