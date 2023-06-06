import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Checkbox, Form, Input, Modal, Row, Col, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Router from 'next/router';

import { SEND_AUTH_MAIL_REQUEST, SIGN_UP_REQUEST } from '../../reducers/user';
import { InputWrapper } from '../../styles/headerMenu';
import {
  SignUpForm,
  SignUpReturnBtn,
  AuthResendBtn,
  AuthOkBtn,
  AuthEmailBtn,
} from '../../styles/signUpForm';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [authEmail, setAuthEmail] = useState({ email: '' });
  const [authInputVisible, setAuthInputVisible] = useState(false);
  const [authCodeInput, setAuthCodeInput] = useState('');
  const [checkedAuth, setCheckedAuth] = useState(false);
  const {
    sendAuthMailLoading,
    sendAuthMailDone,
    sendAuthMailError,
    authCode,
    signUpLoading,
  } = useSelector((state) => state.user);

  const onSubmitForm = useCallback(
    (value) => {
      if (checkedAuth) {
        dispatch({
          type: SIGN_UP_REQUEST,
          data: value,
        });
      } else {
        message.warning('이메일 인증을 완료해주세요.', 1.5);
      }
    },
    [checkedAuth]
  );

  const signUpCancelBtn = () => {
    Modal.confirm({
      title: '회원가입을 중단하고 돌아가시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '작성된 정보는 저장되지 않습니다.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        Router.push('/');
      },
      onCancel() {},
    });
  };

  const onChangeAuthEmail = useCallback((e) => {
    setAuthEmail((prevState) => {
      return { ...prevState, email: e.target.value };
    });
  }, []);

  const onClickAuthBtn = useCallback(() => {
    let regExp = /\S+@\S+\.\S+/;
    if (authEmail.email.match(regExp)) {
      dispatch({
        type: SEND_AUTH_MAIL_REQUEST,
        data: authEmail,
      });
    } else {
      message.warning('이메일 주소 또는 형식을 확인해주세요.', 1.5);
    }
  }, [authEmail]);

  useEffect(() => {
    if (sendAuthMailDone) {
      setAuthInputVisible(true);
      message.success('인증번호가 발송되었습니다.', 1.5);
    } else if (sendAuthMailError) {
      message.error(sendAuthMailError, 1.5);
    }
  }, [sendAuthMailDone, sendAuthMailError]);

  const onChangeAuthCode = useCallback((e) => {
    setAuthCodeInput(e.target.value);
  }, []);

  const checkedAuthCode = useCallback(() => {
    if (checkedAuth) {
      return;
    }

    if (authCode === authCodeInput) {
      message.success('인증이 정상적으로 완료되었습니다.', 1.5);
      setCheckedAuth(true);
    } else {
      message.error('인증코드가 일치하지 않습니다.', 1.5);
    }
  }, [authCodeInput, checkedAuth]);

  return (
    <section>
      <SignUpForm
        className='bold'
        form={form}
        name='signup'
        onFinish={onSubmitForm}
        scrollToFirstError
        requiredMark={false}
        layout='vertical'
      >
        <Form.Item
          name='email'
          label='E-MAIL'
          rules={[
            {
              type: 'email',
              message: 'E-mail형식이 올바르지 않습니다.',
            },
            {
              required: true,
              message: 'E-mail을 입력하세요.',
            },
          ]}
        >
          <Input onChange={onChangeAuthEmail} placeholder='이메일' allowClear />
        </Form.Item>

        <Form.Item>
          <Row gutter={16} align='end'>
            {authInputVisible && (
              <Col span={8}>
                {checkedAuth ? (
                  <Input value={authCodeInput} disabled />
                ) : (
                  <Input
                    placeholder='인증번호 6자리'
                    allowClear
                    onChange={onChangeAuthCode}
                  />
                )}
              </Col>
            )}

            <Col>
              {authInputVisible ? (
                <div>
                  {checkedAuth || (
                    <AuthResendBtn
                      type='primary'
                      loading={sendAuthMailLoading}
                      onClick={onClickAuthBtn}
                    >
                      재발송
                    </AuthResendBtn>
                  )}
                  <AuthOkBtn type='primary' onClick={checkedAuthCode}>
                    확인
                  </AuthOkBtn>
                </div>
              ) : (
                <AuthEmailBtn
                  type='primary'
                  loading={sendAuthMailLoading}
                  onClick={onClickAuthBtn}
                >
                  인증메일 발송
                </AuthEmailBtn>
              )}
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name='password'
          label='Password'
          rules={[
            {
              required: true,
              message: '비밀번호를 입력하세요.',
            },
          ]}
          hasFeedback
        >
          <InputWrapper
            placeholder='비밀번호 (8 ~ 20자리)'
            minLength={8}
            maxLength={20}
            showCount
            allowClear
          />
        </Form.Item>

        <Form.Item
          name='confirm-password'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '비밀번호를 입력하세요.',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('비밀번호가 일치하지 않습니다.')
                );
              },
            }),
          ]}
        >
          <InputWrapper placeholder='비밀번호 재입력' allowClear />
        </Form.Item>

        <Form.Item
          name='nickname'
          label='Nickname'
          rules={[
            {
              type: 'text',
            },
            {
              required: true,
              message: '닉네임을 입력하세요.',
            },
          ]}
        >
          <Input
            placeholder='닉네임을 입력해주세요.'
            maxLength={20}
            showCount
            allowClear
          />
        </Form.Item>

        <Row align='center'>
          <Form.Item
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('약관에 동의해 주세요.')),
              },
            ]}
          >
            <Checkbox>이용약관에 모두 동의합니다.</Checkbox>
          </Form.Item>
        </Row>

        <Row align='center'>
          <Form.Item>
            <SignUpReturnBtn onClick={signUpCancelBtn}>
              돌아가기
            </SignUpReturnBtn>
            <Button type='primary' htmlType='submit' loading={signUpLoading}>
              회원가입
            </Button>
          </Form.Item>
        </Row>
      </SignUpForm>
    </section>
  );
};

export default SignupForm;
