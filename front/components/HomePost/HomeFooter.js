import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Row, Col } from 'antd';

import { CONTACT_FORM_VISIBLE } from '../../reducers/user';
import { 
  FooterWrapper, BtnWrapper, FooterBtn, GitHubBtn, 
  InstaGramBtn, MailBtn, BlogBtn, MainText, SubText 
} from '../../styles/homePost';

const HomeFooter = () => {
  const dispatch = useDispatch();
  
  const onClickContactBtn = useCallback(() => {
    dispatch({
      type: CONTACT_FORM_VISIBLE,
    })
  }, []);

  return (
    <FooterWrapper>
      <Row justify='space-between' align='middle'>
        <Col>
          <MainText className='bolder'>Eat Delicious with Recipe.io</MainText>        
          <SubText>Made by Mirrer</SubText>        
        </Col>

        <BtnWrapper>
          <FooterBtn type='text' href='https://github.com/Mirrer1' target='_blank' rel='noreferrer noopener' icon={<GitHubBtn />}></FooterBtn>
          <FooterBtn type='text' href='https://www.instagram.com/mirrerlike_/' target='_blank' rel='noreferrer noopener' icon={<InstaGramBtn />}></FooterBtn>          
          <FooterBtn type='text' onClick={onClickContactBtn} icon={<MailBtn />}></FooterBtn>
          <Button type='text' href='https://velog.io/@alsejr1004' target='_blank' rel='noreferrer noopener' icon={<BlogBtn />}></Button>       
        </BtnWrapper>       
      </Row>
    </FooterWrapper>
  );
};

export default HomeFooter;