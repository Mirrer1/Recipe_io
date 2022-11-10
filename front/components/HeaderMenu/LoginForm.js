import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Row } from 'antd';
import Link from 'next/link';

import { LOG_IN_REQUEST } from '../../reducers/user';
import { FormWrapper, InputWrapper, LoginBtn } from '../../styles/headerMenu';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { logInLoading } = useSelector((state) => state.user);  

  const onSubmitForm = useCallback((value) => {    
    dispatch({
      type: LOG_IN_REQUEST,
      data: value,
    })        
  }, []);  

  return (    
    <FormWrapper form={form} onFinish={onSubmitForm} name="login" size='large'>
      <Form.Item               
        name="email"
        rules={[
          {
            type: 'email',
            message: 'E-mail형식이 올바르지 않습니다.'
          },
          {
            required: true,
            message: 'E-mail을 입력하세요.',
          }
        ]}
      >
            
        <Input placeholder='Enter your Email'/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력하세요.',
          }
        ]}
      >                
        <InputWrapper placeholder='Enter your Password' />
      </Form.Item>
      
      <Row align='end'>
        <LoginBtn type='primary' htmlType='submit' loading={logInLoading}>로그인</LoginBtn>
        <Link href='/signup' prefetch={false}><a><Button type='primary'>회원가입</Button></a></Link>
      </Row>
    </FormWrapper>    
  )
};

export default LoginForm;