import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Menu, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';

import AlertMenu from './AlertMenu';
import { LOG_OUT_REQUEST, LOAD_MY_ALERT_REQUEST } from '../../reducers/user';
import {
  MenuGlobalStyle,
  MenuRowWrapper,
  MenuColWrapper,
  LoggedinMenu,
  HomeIcon,
  UserIcon,
  NewsIcon,
  MenuAlertExists,
  AlertMoreMenu,
  AlertMoreBtn,
  AlertMoreIcon,
  SpinIcon,
  LogoutIcon,
  UserInfo,
  AvatarWrapper,
  UserAvatar,
  UserAvatarLink,
  UserNickname,
  UserNicknameLink,
  UserEmail,
  UserEmailLink,
} from '../../styles/headerMenu';

const LoginMenu = () => {
  const dispatch = useDispatch();
  const [alertLimit, setAlertLimit] = useState(5);
  const { logOutLoading, me, userAlert, checkedAlertDone } = useSelector(
    (state) => state.user
  );

  const onLogoutBtn = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);

  const moreAlertBtn = useCallback((e) => {
    e?.stopPropagation();
    setAlertLimit((prev) => prev + 5);
  }, []);

  const onHoverAlertMenu = useCallback(
    (e) => {
      if (e.join('') === 'loginNews' && alertLimit > 5) {
        dispatch({
          type: LOAD_MY_ALERT_REQUEST,
        });
        setAlertLimit(5);
      }
    },
    [alertLimit]
  );

  useEffect(() => {
    if (me) {
      dispatch({
        type: LOAD_MY_ALERT_REQUEST,
      });
    }
  }, []);

  useEffect(() => {
    if (checkedAlertDone) {
      dispatch({
        type: LOAD_MY_ALERT_REQUEST,
      });
    }
  }, [checkedAlertDone]);

  useEffect(() => {
    if (alertLimit > 5) {
      dispatch({
        type: LOAD_MY_ALERT_REQUEST,
        alertLimit,
      });
    }
  }, [alertLimit]);

  return (
    <nav>
      <MenuGlobalStyle />
      <MenuRowWrapper align='middle' justify='space-between' wrap={false}>
        <MenuColWrapper>
          <LoggedinMenu
            mode='horizontal'
            className='bold'
            onOpenChange={onHoverAlertMenu}
          >
            <Menu.Item key='loginHome' icon={<HomeIcon />}>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </Menu.Item>
            <Menu.Item key='loginMypage' icon={<UserIcon />}>
              <Link href='/profile'>
                <a>My Page</a>
              </Link>
            </Menu.Item>
            <Menu.SubMenu
              key='loginNews'
              title='새소식'
              icon={
                userAlert?.length === 0 ? (
                  <NewsIcon />
                ) : (
                  <Badge dot>
                    <NewsIcon />
                  </Badge>
                )
              }
            >
              {userAlert?.length !== 0 ? (
                userAlert?.map((v) => {
                  return (
                    <MenuAlertExists key={v.id}>
                      <AlertMenu userAlert={v} />
                    </MenuAlertExists>
                  );
                })
              ) : (
                <Menu.Item key='nonAlert'>새로운 소식이 없습니다.</Menu.Item>
              )}
              {userAlert?.length > 0 && (
                <AlertMoreMenu key='moreAlertBtn'>
                  <AlertMoreBtn
                    onClick={moreAlertBtn}
                    icon={<AlertMoreIcon />}
                  ></AlertMoreBtn>
                </AlertMoreMenu>
              )}
            </Menu.SubMenu>

            {logOutLoading ? (
              <Menu.Item key='logoutLoading'>
                <SpinIcon indicator={<LoadingOutlined />} />
              </Menu.Item>
            ) : (
              <Menu.Item
                key='logout'
                icon={<LogoutIcon />}
                onClick={onLogoutBtn}
              >
                Logout
              </Menu.Item>
            )}
          </LoggedinMenu>
        </MenuColWrapper>

        <Col>
          <UserInfo>
            <AvatarWrapper>
              <UserAvatar>
                <Link href={`/user/${me.id}`}>
                  <UserAvatarLink>{me.nickname[0]}</UserAvatarLink>
                </Link>
              </UserAvatar>
            </AvatarWrapper>

            <div>
              <UserNickname>
                <Link href='/profile'>
                  <UserNicknameLink className='bold'>
                    {me.nickname}
                  </UserNicknameLink>
                </Link>
              </UserNickname>
              <UserEmail>
                <Link href='/profile'>
                  <UserEmailLink>{me.email}</UserEmailLink>
                </Link>
              </UserEmail>
            </div>
          </UserInfo>
        </Col>
      </MenuRowWrapper>
    </nav>
  );
};

export default LoginMenu;
