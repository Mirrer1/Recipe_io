import React from 'react';

import BoardList from './BoardList';
import {
  BoardHeader,
  BoardIcon,
  MyPageText,
  MyPageMainText,
  MyPageSubText,
} from '../../styles/myPage';

const MyBoard = () => {
  return (
    <section>
      <BoardHeader>
        <BoardIcon />
        <MyPageText>
          <MyPageMainText className='bold'>My Board</MyPageMainText>
          <MyPageSubText>게시물 관리</MyPageSubText>
        </MyPageText>
      </BoardHeader>

      <BoardList />
    </section>
  );
};

export default MyBoard;
