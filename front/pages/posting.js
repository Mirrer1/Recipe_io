import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import Head from 'next/head';
import Router from 'next/router';

import AppLayout from '../components/AppLayout/';
import MainPosting from '../components/PostingForm/MainPosting';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import { PostingText, PageMainText, PageSubText, LogoutResult } from '../styles/pageStyles';

const Posting = () => {        
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { uploadImagesDone, uploadImagesError, addPostDone, editPostDone } = useSelector((state) => state.post);  

  useEffect(() => {    
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });    
  }, []);

  useEffect(() => {
    uploadImagesDone && message.success('이미지 작업이 완료되었습니다.', 1.5);
    uploadImagesError && message.warning('이미지 작업 중 에러가 발생했습니다.', 1.5);    
  }, [uploadImagesDone, uploadImagesError]);

  useEffect(() => {
    if (addPostDone) {
      message.success('게시글이 정상적으로 포스팅되었습니다.', 1.5);
      Router.replace('/');
    }
  }, [addPostDone]);

  useEffect(() => {
    if (editPostDone) {
      message.success('게시글이 정상적으로 수정되었습니다.', 1.5);
      Router.replace('/');
    }
  }, [editPostDone]);
  
  useEffect(() => {
    if (!me) { 
      message.error('로그인이 필요한 서비스입니다.', 1.5);      
    }
  }, [me]);

  return (
    <>
      <Head>
        <title>게시글 작성 | Recipe.io</title>
      </Head>
      <AppLayout>
        <PostingText>
          <PageMainText className='bolder'>POSTING</PageMainText>
          <PageSubText>Sharing your recipes leads to the joyous happiness of others</PageSubText>
        </PostingText>        
        {me ? <MainPosting /> : <LogoutResult title="로그인이 필요한 서비스입니다." extra={<div>로그인 후 이용해주세요.</div>}/>}
      </AppLayout>
    </>
  )
};

export default Posting;