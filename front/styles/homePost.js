import { Card, Button, List } from 'antd';
import {
  GithubOutlined,
  InstagramOutlined,
  MailOutlined,
  ContainerOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import styled, { createGlobalStyle } from 'styled-components';

// HomePost Global Style
export const HomePostGlobalStyle = createGlobalStyle`
  && {
    .ant-card-meta {
      height: 55px;
      overflow: hidden;
      margin-bottom: 0.2em;
    }

    .ant-card-meta-title {
      font-weight: 700;
    }
  }
`;

// HomeFooter Styles
export const FooterWrapper = styled.footer`
  && {
    border: 1px solid #f0f0f0;
    padding: 2em 8em 2em 4em;
  }
`;
export const FooterBtn = styled(Button)`
  && {
    margin-right: 1em;
  }
`;

export const GitHubBtn = styled(GithubOutlined)`
  && {
    font-size: 2rem;
    background-color: #ffffff;
    color: #4b4c4d;
  }
`;

export const InstaGramBtn = styled(InstagramOutlined)`
  && {
    font-size: 2rem;
    background-color: #ffffff;
    color: #4b4c4d;
  }
`;

export const MailBtn = styled(MailOutlined)`
  && {
    font-size: 2rem;
    background-color: #ffffff;
    color: #4b4c4d;
  }
`;

export const BlogBtn = styled(ContainerOutlined)`
  && {
    font-size: 2rem;
    background-color: #ffffff;
    color: #4b4c4d;
  }
`;

export const MainText = styled.h1`
  && {
    font-size: 1.5rem;
    letter-spacing: 0.25em;
    color: #4b4c4d;
    margin-bottom: 0;
  }
`;

export const SubText = styled.p`
  && {
    color: #c2c2c2;
    margin-bottom: 0;
  }
`;

// TopPostList Style
export const TopPostCardBody = {
  padding: '1.5em',
  height: '110px',
  overflow: 'hidden',
};

export const TopList = styled(List)`
  && {
    padding-top: 1em;
  }
`;

export const TopImageWrapper = styled.div`
  && {
    position: relative;
    height: 230px;
    overflow: hidden;
  }
`;

export const TopPostBtn = styled(Button)`
  && {
    border: none;
    padding: 0;
    margin-right: 0.4em;
    font-size: 0.75rem;
    pointer-events: none;
  }
`;

export const TopPostBtnText = styled.span`
  && {
    margin-left: 0.3em;
  }
`;

// RecentPostList Style
export const RecentList = styled(List)`
  && {
    padding: 1.5em 0;
  }
`;

// RecentPostCard Style
export const RecentCardBody = {
  height: '120px',
  overflow: 'hidden',
};

export const RecentCard = styled(Card)`
  && {
    width: 350px;
  }
`;

export const RecentImageWrapper = styled.div`
  && {
    position: relative;
    height: 260px;
    overflow: hidden;
  }
`;

export const PostImage = styled.img`
  && {
    position: absolute;
    height: 100%;
    width: 100%;
    top: -9999px;
    bottom: -9999px;
    left: -9999px;
    right: -9999px;
    margin: auto;
  }
`;

// PostDeleteModal Style
export const BtnWrapper = styled.div`
  && {
    display: flex;
    margin-bottom: 1em;
  }
`;

export const ModalIcon = styled(ExclamationCircleOutlined)`
  && {
    color: #faad14;
    font-size: 1.5rem;
    margin-right: 0.5em;
  }
`;

export const ModalMainText = styled.span`
  && {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.4;
  }
`;

export const ModalSubText = styled.p`
  && {
    margin-bottom: 0;
    padding-left: 1em;
    opacity: 0.7;
  }
`;
