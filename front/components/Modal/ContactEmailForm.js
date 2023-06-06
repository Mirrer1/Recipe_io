import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, Button, Row, message } from 'antd';
import { init, send } from 'emailjs-com';

import { CONTACT_FORM_INVISIBLE } from '../../reducers/user';
import {
  ContactFormIcon,
  ContactFormMainText,
  ContactFormSubText,
  ContactFormBtn,
} from '../../styles/modal';

const ContactEmailForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { me, contactFormVisible } = useSelector((state) => state.user);

  useEffect(() => {
    init('iFygmyjOxEbUWpZRV');
  }, []);

  const onSubmitForm = useCallback((e) => {
    send('service_lp9cvs9', 'template_q6yvfmr', e);
    dispatch({
      type: CONTACT_FORM_INVISIBLE,
    });
    message.success('의견을 남겨주셔서 감사합니다.', 1.5);
  }, []);

  const contactModalCancelBtn = useCallback(() => {
    dispatch({
      type: CONTACT_FORM_INVISIBLE,
    });
  }, []);

  return (
    <Modal
      centered
      visible={contactFormVisible}
      onCancel={contactModalCancelBtn}
      width={700}
      footer={null}
    >
      <Row align='middle'>
        <ContactFormIcon className='bolder' />
        <ContactFormMainText className='bolder'>
          Contact Mirrer
        </ContactFormMainText>
      </Row>
      <ContactFormSubText className='bold'>
        Thank you for your Comments.
      </ContactFormSubText>

      <Form
        className='bold'
        form={form}
        name='contact'
        onFinish={onSubmitForm}
        layout='vertical'
        requiredMark={false}
        initialValues={
          me && {
            name: me?.nickname,
          }
        }
      >
        <Form.Item
          name='name'
          label='Author'
          rules={[
            {
              type: 'text',
            },
            {
              required: true,
              message: '작성자를 입력하세요.',
            },
          ]}
        >
          <Input placeholder='작성자' allowClear />
        </Form.Item>

        <Form.Item
          name='email'
          label='E-MAIL'
          rules={[
            {
              type: 'email',
            },
            {
              required: true,
              message: 'E-mail을 입력하세요.',
            },
          ]}
        >
          <Input placeholder='이메일을 입력해주세요.' allowClear />
        </Form.Item>

        <Form.Item
          name='title'
          label='Title'
          rules={[
            {
              type: 'text',
            },
            {
              required: true,
              message: '제목을 입력하세요.',
            },
          ]}
        >
          <Input placeholder='제목을 입력해주세요.' allowClear />
        </Form.Item>

        <Form.Item
          name='text'
          label='Text'
          rules={[
            {
              type: 'text',
            },
            {
              required: true,
              message: '내용을 입력하세요.',
            },
          ]}
        >
          <Input.TextArea
            placeholder='내용을 입력해주세요.'
            maxLength={400}
            showCount
            allowClear
            rows={6}
          />
        </Form.Item>

        <Form.Item>
          <Row justify='end'>
            <ContactFormBtn onClick={contactModalCancelBtn}>
              취소
            </ContactFormBtn>
            <Button type='primary' htmlType='submit'>
              전송
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContactEmailForm;
