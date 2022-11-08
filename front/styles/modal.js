import { Divider, List, Button, Row, Tag, Card, Form } from 'antd';
import { HeartOutlined, CommentOutlined, HeartTwoTone, ContainerOutlined, SoundOutlined, LoadingOutlined } from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';

// Modal Global Style
export const ModalContentGlobalStyle = createGlobalStyle`
  && {
    .ant-card-head-title {
      font-weight: 700;
      font-size: 1.3rem;
    }
    .ant-list-item-meta-avatar {
      line-height: 4;
    }
  }
`;

// ModalHeader Style
export const TitleWrapper = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 1.5em;
  }
`;

export const HeaderTitle = styled.h2`
  && {
    font-size: 2rem;  
    margin-bottom: 0.5em;
    padding: 0 0.5em 0 0.5em;
  }
`;

export const TitleDate = styled.div`
  && {
    font-size: 1rem;
    color: #c2c2c2;
  }
`;

export const ModalWrapper = styled.div`
  && {
    padding: 1em;
  }
`;

export const HeaderWrapper = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1em 0 1em;
  }
`;

export const HeaderNicknameWrapper = styled.span`
  && {
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 0;
    margin-left: 0.5em;
  }
`;

export const HeaderNickname = styled.a`
  && {
    color: black;
  }
`;

export const HeaderInfo = styled.div`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
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

export const HeaderDivider = styled(Divider)`
  && {
    margin: 1em 0 0.5em 0;
    background-color: #eeeeee;
  }
`

// ModalImage Style
export const ModalImageWrapper = styled.div`
  && {
    display: none;
  }
`

// ModalContent Style
export const ContentBtnWrapper = styled(Row)`
  && {
    padding: 0 0.5em;
    margin-bottom: 0.7em;
  }
`

export const ContentBtn = styled(Button)`
  && {
    font-size: 0.85rem; 
    padding: 0 0.2em;  
    margin-right: 0.2em;  
    border-style: none;
  }
`

export const ContentImageWrapper = styled.div`
  && {
    text-align: center;
    margin-bottom: 1.5em;
  }
`

export const ContentCard = styled(Card)`
  && {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 1.5em;      
  }
`

// PostModal Style
export const ModalTagWrapper = styled.div`
  && {
    padding-left: 2em;
    margin-bottom: 3em;      
  }
`

// ModalTag Style
export const TagWrapper = styled(Tag)`
  && {
    font-size: 0.8rem;      
  }
`

// CommentList Style
export const ListWrapper = styled(List)`
  && {
    padding: 0 1em;      
  }
`;

export const CommentNickname = styled.a`
  && {
    font-size: 0.95rem;      
  }
`;

export const CommentContent = styled.div`
  && {
    font-size: 0.85rem;      
  }
`;

export const CommentDate = styled.div`
  && {
    font-size: 0.7rem;      
  }
`;

// EditCommentForm Style
export const CommentEditForm = styled(Form)`
  && {
    margin-top: 0.5em;
  }
`;

export const CommentEditBtn = styled(Button)`
  && {
    padding: 0;
    margin-right: 0.5em;
  }
`;

export const CommentEditCancelBtn = styled(Button)`
  && {
    padding: 0;    
  }
`;

// ContactEmailForm Style
export const ContactFormIcon = styled(ContainerOutlined)`
  && {
    font-size: 2rem;
    margin-right: 0.3em;
  }
`;

export const ContactFormMainText = styled.h1`
  && {
    font-size: 2rem;
    margin-bottom: 0;
  }
`;

export const ContactFormSubText = styled.p`
  && {
    font-size: 0.8rem;
    color: #c2c2c2;
    margin-bottom: 2.5em;
  }
`;

export const ContactFormBtn = styled(Button)`
  && {
    margin-right: 0.5em;
  }
`;

// ReportModal Style
export const ReportFormIcon = styled(SoundOutlined)`
  && {
    font-size: 2rem;
    margin-right: 0.3em;
  }
`;

// UploadModal Style
export const UploadModalIcon = styled(LoadingOutlined)`
  && {    
    color: #1890FF;
    font-size: 1.5rem;
    margin-right: 0.5em;
  }
`;