import { Button, Input, Result } from 'antd';
import { NotificationOutlined, BarChartOutlined, SmileOutlined } from '@ant-design/icons';
import styled from 'styled-components';

// Common Styles for Pages
export const PageMainText = styled.h1`
  && {
    font-size: 2.5rem;    
    letter-spacing: 0.1em;
    color:#4b4c4d;
    margin: 0;
  }
`;

export const PageSubText = styled.p`
  && {
    font-size: 1rem;    
    margin: 0;
    color: #c2c2c2;
  }
`;

// Index Page Style
export const HomeWrapper = styled.header`
  && {
    padding: 0.5em 2em 1em 2em;
  }
`;

export const HomeLogoHeader = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2em 1em;
    margin-bottom: 2em;
  }
`;

export const HomeLogoText = styled.div`
  && {
    display: flex;
    flex-direction: column;
    justify-content: start;  
  }
`;

export const HomeInputWrapper = styled(Input.Search)`
  && {
    margin-bottom: 3em;
  }
`;

export const TopPostsWrapper = styled.div`
  && {
    margin-bottom: 5em;
  }
`;

export const HomePosts = styled.div`
  && {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 1em;
  }
`;

export const TopPostsIcon = styled(NotificationOutlined)`
  && {
    font-size: 1.8rem;
    margin-right: 0.2em;
  }
`;

export const HomePostsText = styled.span`
  && {
    font-size: 1.2rem;    
  }
`;

export const RecentPostsIcon = styled(BarChartOutlined)`
  && {
    font-size: 1.8rem;
    margin-right: 0.2em;
  }
`;

// Profile Page Style
export const MypageWrapper = styled.header`
  && {
    padding: 0.5em 2em 1em 2em;
  }
`;

export const MypageText = styled.div`
  && {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 0.2em 1em;
    margin-bottom: 2em;  
  }
`;

// Posting Page Style
export const PostingText = styled.header`
  && {
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 1em 3em 0 3em;
  }
`;

export const LogoutResult = styled(Result)` 
  && {
    margin-top: 6em;
  }
`;

// SignUp Page Style
export const SignupWrapper = styled.div`  
  && {
    padding: 2em;  
  }
`;

export const SignupText = styled.header`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;  
    align-items: center;
    margin-bottom: 1.5em;
  }
`;

export const SignupResult = styled(Result)`  
  && {
    margin-top: 6em;
  }
`;

// SinglePost Page Style
export const SinglePostResult = styled(Result)`
  && {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const SinglePostIcon = styled(SmileOutlined)`
  && {
    font-size: 6rem;
  }
`;

export const SinglePostText = styled.div`
  && {
    font-size: 2rem;
  }
`;

export const SinglePostBtn = styled(Button)`
  && {
    font-size: 1rem;
  }
`;