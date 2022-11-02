import { Form, List, Card, Col, Button } from 'antd';
import { EditOutlined, LikeOutlined, FormOutlined, MoreOutlined, HeartOutlined, HeartTwoTone, CommentOutlined } from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';

// MyPage Global Style
export const MyPageGlobalStyle = createGlobalStyle`
  && {
    .ant-card-meta-title {
      font-weight: 700;
    }
  }
`;

// Common Styles for Mypage
export const MyPageText = styled.div`
  && {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;      
  }
`

export const MyPageMainText = styled.h2`
  && {
    font-size: 1rem;    
    margin: 0;    
  }
`;

export const MyPageSubText = styled.p`
  && {
    font-size: 0.7rem;    
    margin: 0;      
  }
`;

export const MyPageImage = styled.img`
  && {
    position: absolute;
    width: 100%;
    height: 100%;
    top: -9999px;
    bottom: -9999px;
    left: -9999px;
    right: -9999px;
    margin: auto;    
  }
`;

// NicknameEditForm Style
export const FormWrapper = styled.div`
  && {
    padding: 1em 0;      
  }
`

export const FormHeader = styled.div`
  && {
    display: flex;  
    justify-content: start;
    align-items: center;
    padding: 0.5em;      
  }
`

export const FormIcon = styled(EditOutlined)`
  && {
    font-size: 2rem;
    margin-right: 0.2em;          
  }
`

export const FormInput = styled(Form)`
  && {
    padding: 1.2em;        
  }
`;

// MyScrap Style
export const ScrapWrapper = styled.div`
  && {
    display: flex;  
    justify-content: start;
    align-items: center;
    padding: 0.5em;
    margin-bottom: 0.5em;            
  }
`

export const ScrapIcon = styled(LikeOutlined)`
  && {
    font-size: 2rem;
    margin-right: 0.2em;            
  }
`

// ScrapList Style
export const ListWrapper = styled(List)`
  && {
    padding: 2em 0 1em 0;          
  }
`;

export const BtnWrapper = styled.div`
  && {
    text-align: center;
    margin: 10px 0;
  }
`;

// ScrapCard Style
export const ScrapCardBody = {  
  height: '145px', 
  overflow: 'hidden',
};

export const ScrapCardWrapper = styled(Card)`
  && {
    width: 200px;        
  }
`;

export const ScrapImage = styled.section`
  && {
    position: relative;    
    height: 130px;
    overflow: hidden;
  }
`;

// MyBoard Style
export const BoardHeader = styled.div`
  && {
    display: flex;  
    justify-content: start;
    align-items: center;
    padding: 0.5em;
    margin: 2em 0 0.5em 0;        
  }
`

export const BoardIcon = styled(FormOutlined)`
  && {
    font-size: 2rem;
    margin-right: 0.2em;            
  }
`

// BoardCard style
export const BoardCardHeader = {  
  border: 'none', 
  paddingRight: '2em',  
};

export const BoardCardBody = {  
  paddingTop: '0',
};

export const MoreIcon = styled(MoreOutlined)`
  && {
    font-size: 1.25rem;        
  }
`

export const ColWrapper = styled(Col)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const CardTextWrapper = styled.div`
  && {
    padding: 0 2.5em 0 1em;
  }
`;

export const CardText = styled(Card.Meta)`
  && {
    margin-bottom: 2em;   
  }
`;

export const CardTitle = styled.div`
  && {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
  }
`;

export const CardContent = styled.p`
  && {
    height: 110px;
    overflow: hidden;
  }
`;

export const HeaderBtn = styled(Button)`
  && {
    font-size: 1rem; 
    padding: 0 0.5em;
    &:hover {
      background-color: white;
    }        
  }
`;

export const HeartBtnIcon = styled(HeartOutlined)`
  && {
    margin-right: 0.5em;        
  }
`;

export const TwoToneHeartBtnIcon = styled(HeartTwoTone)`
  && {
    margin-right: 0.5em;        
  }
`;

export const CommentBtnIcon = styled(CommentOutlined)`
  && {
    margin-right: 0.5em;        
  }
`;

export const CardImageWrapper = styled.div`
  && {
    position: relative;    
    height: 260px;
    overflow: hidden;
  }
`;

export const ImageWrapper = styled.img`
  && {
    position: absolute;
    width: 100%;
    height: 100%;
    top: -9999px;
    bottom: -9999px;
    left: -9999px;
    right: -9999px;
    margin: auto;    
  }
`;