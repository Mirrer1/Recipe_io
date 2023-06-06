import styled, { createGlobalStyle } from 'styled-components';
import { Menu, Form, Button, Spin, Row, Col, Avatar, Input } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  BellOutlined,
  LoginOutlined,
  DeleteOutlined,
  DownOutlined,
} from '@ant-design/icons';

// HeaderMenu Global Style
export const MenuGlobalStyle = createGlobalStyle`  
  .ant-menu-item {
    background-color: white !important;  
  }

  .ant-menu-item-selected {
    background-color: white !important;  
  }
`;

// Common Styles for Mypage
export const HomeIcon = styled(HomeOutlined)`
  && {
    font-size: 1.2rem;
  }
`;
export const UserIcon = styled(UserOutlined)`
  && {
    font-size: 1.2rem;
  }
`;

export const NewsIcon = styled(BellOutlined)`
  && {
    font-size: 1.2rem;
  }
`;

// LoggedinMenu Style
export const MenuRowWrapper = styled(Row)`
  && {
    padding: 1em 0.5em;
  }
`;

export const MenuColWrapper = styled(Col)`
  && {
    width: 100%;
  }
`;

export const LoggedinMenu = styled(Menu)`
  && {
    border-bottom: none;
    font-size: 1.2rem;
  }
`;

export const MenuAlertExists = styled(Menu.Item)`
  && {
    text-align: center;
    padding: 0;
    margin: 0.7em 0 0 0;
  }
`;

export const AlertMoreMenu = styled(Menu.Item)`
  && {
    text-align: center;
  }
`;

export const AlertMoreBtn = styled(Button)`
  && {
    width: 3em;
    border: none;
    box-shadow: none;
  }
`;

export const AlertMoreIcon = styled(DownOutlined)`
  && {
    font-size: 0.9rem;
    opacity: 0.7;
  }
`;

export const SpinIcon = styled(Spin)`
  && {
    padding-left: 2.5em;
  }
`;

export const LogoutIcon = styled(LogoutOutlined)`
  && {
    font-size: 1.2rem;
  }
`;

export const UserInfo = styled.div`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3em;
  }
`;

export const AvatarWrapper = styled.div`
  && {
    margin-right: 1em;
  }
`;

export const UserAvatar = styled(Avatar)`
  && {
    font-size: 1rem;
  }
`;

export const UserAvatarLink = styled.a`
  && {
    color: white;
  }
`;

export const UserNickname = styled.div`
  && {
    font-size: 1.2rem;
    line-height: 1.2;
  }
`;

export const UserNicknameLink = styled.a`
  && {
    font-size: 1.25rem;
    color: black;
  }
`;

export const UserEmail = styled.div`
  && {
    font-size: 0.7rem;
  }
`;

export const UserEmailLink = styled.a`
  && {
    color: #c2c2c2;
  }
`;

export const AlertText = styled(Button)`
  && {
    border: none;
    box-shadow: none;
    padding-right: 0.8em;
  }
`;

export const AlertUserNickname = styled.span`
  && {
    margin-bottom: 0.5em;
  }
`;

export const AlertDeleteBtn = styled(Button)`
  && {
    border: none;
    box-shadow: none;
    margin-right: 0.8em;
  }
`;

export const AlertDeleteIcon = styled(DeleteOutlined)`
  && {
    opacity: 0.4;
  }
`;

// UnLoggedinMenu Style
export const LoggedoutMenu = styled(Menu)`
  && {
    font-size: 1.2rem;
    padding: 0.75em 0.4em 0.75em 0.4em;
    border: none;
  }
`;

export const LoginIcon = styled(LoginOutlined)`
  && {
    font-size: 1.2rem;
  }
`;

// LoginForm Style
export const FormWrapper = styled(Form)`
  && {
    padding: 1.2em;
  }
`;

export const InputWrapper = styled(Input.Password)`
  && {
    font-family: '굴림';
  }
`;

export const LoginBtn = styled(Button)`
  && {
    margin-right: 0.5em;
  }
`;
