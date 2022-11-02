import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, message, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Head from 'next/head';
import Router from 'next/router';

import AppLayout from '../components/AppLayout/';
import SignupForm from '../components/SignupForm';
import { PageMainText, PageSubText, SignupWrapper, SignupText, SignupResult } from '../styles/pageStyles';

const SignUp = () => {
  const { signUpDone, signUpError } = useSelector((state => state.user));
  
  useEffect(() => {
    signUpError && message.error(signUpError);
  }, [signUpError]);
  
  const backToHomeBtn = useCallback(() => {
    Router.push('/');
  }, [])
  
  return (
    <>
      <Head>
        <title>회원가입 | Recipe.io</title>
      </Head>
      <AppLayout>
        <SignupWrapper>
          {
            signUpDone ||
            <SignupText>
              <PageMainText className='bolder'>JOIN US</PageMainText>    
              <PageSubText>Sign up to receive delicious recipes every day</PageSubText>
            </SignupText>
          }
          
          {
            signUpDone 
            ? <SignupResult
                icon={<SmileOutlined />}
                title="회원가입이 완료되었습니다. 맛있는 식사하세요!!"
                extra={<Button type="primary" onClick={backToHomeBtn}>메인으로 이동</Button>}                
              />
            : <SignupForm />                  
          }
        </SignupWrapper>    
      </AppLayout>
    </>
  )
};

export default SignUp;