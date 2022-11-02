import React, { useCallback, useState } from 'react';
import { Menu } from 'antd';
import Link from 'next/link';

import LoginForm from './LoginForm';
import { LoggedoutMenu, HomeIcon, UserIcon, NewsIcon, LoginIcon } from '../../styles/headerMenu';

const LogoutMenu = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);  
  const onToggleLogin = useCallback(() => {
    setShowLoginForm((prev) => !prev);
  }, []);

  return (
    <nav>
      <LoggedoutMenu mode='horizontal' className='bold'>        
        <Menu.Item key='loginHome' icon={<HomeIcon />} ><Link href="/"><a>Home</a></Link></Menu.Item>                   
        <Menu.Item key='loginMypage' icon={<UserIcon />} disabled ><Link href="/mypage"><a>My Page</a></Link></Menu.Item>                  
        <Menu.Item key='loginNews' icon={<NewsIcon />} disabled >새소식</Menu.Item>
        <Menu.Item key='login' icon={<LoginIcon /> } onClick={onToggleLogin} >Login</Menu.Item>                              
      </LoggedoutMenu>              

      {showLoginForm && <LoginForm />}
    </nav>
  )
};

export default LogoutMenu;

