import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';

import { NICKNAME_EDIT_REQUEST } from '../../reducers/user';
import {
  FormWrapper,
  FormHeader,
  MyPageText,
  MyPageMainText,
  MyPageSubText,
  FormIcon,
  FormInput,
} from '../../styles/myPage';

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { nicknameEditLoading } = useSelector((state) => state.user);

  const onSubmitForm = useCallback((value) => {
    dispatch({
      type: NICKNAME_EDIT_REQUEST,
      data: value,
    });
    form.resetFields();
  }, []);

  return (
    <section>
      <FormWrapper>
        <FormHeader>
          <FormIcon />
          <MyPageText>
            <MyPageMainText className='bold'>Edit Nickname</MyPageMainText>
            <MyPageSubText>닉네임 수정</MyPageSubText>
          </MyPageText>
        </FormHeader>

        <FormInput form={form} name='changeNickname' onFinish={onSubmitForm}>
          <Row gutter={16}>
            <Col span={22}>
              <Form.Item
                name='nickname'
                rules={[
                  {
                    type: 'text',
                  },
                ]}
              >
                <Input
                  placeholder='닉네임을 입력하세요.'
                  allowClear
                  size='large'
                  maxLength={20}
                  showCount
                />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item>
                <Button
                  size='large'
                  type='primary'
                  htmlType='submit'
                  loading={nicknameEditLoading}
                >
                  Modify
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </FormInput>
      </FormWrapper>
    </section>
  );
};

export default NicknameEditForm;
