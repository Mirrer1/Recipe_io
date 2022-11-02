import React from 'react';

import NicknameEditForm from './NicknameEditForm';
import MyScrap from './MyScrap';
import MyBoard from './MyBoard';
import { MyPageGlobalStyle } from '../../styles/myPage';

const MyInfo = () => { 
  return (   
    <section>
      <MyPageGlobalStyle />
      <NicknameEditForm />
      <MyScrap />
      <MyBoard />        
    </section> 
  )
};

export default MyInfo;