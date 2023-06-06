import React from 'react';

import ScrapList from './ScrapList';
import {
  ScrapWrapper,
  ScrapIcon,
  MyPageText,
  MyPageMainText,
  MyPageSubText,
} from '../../styles/myPage';

const MyScrap = () => {
  return (
    <section>
      <ScrapWrapper>
        <ScrapIcon />
        <MyPageText>
          <MyPageMainText className='bold'>Like Post</MyPageMainText>
          <MyPageSubText>좋아요한 글</MyPageSubText>
        </MyPageText>
      </ScrapWrapper>

      <ScrapList />
    </section>
  );
};

export default MyScrap;
