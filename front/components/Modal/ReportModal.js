import { Button, Form, Input, message, Modal, Row, Select } from 'antd';
import { init, send } from 'emailjs-com';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { REPORT_MODAL_INVISIBLE } from '../../reducers/post';
import { ReportFormIcon, ContactFormBtn, ContactFormMainText, ContactFormSubText } from '../../styles/modal';

const ReportModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();    
  const [ otherReason, setOtherReason ] = useState(false);
  const { me } = useSelector((state) => state.user);
  const { reportInfo, reportModalVisible } = useSelector((state) => state.post);

  useEffect(() => {
    init('iFygmyjOxEbUWpZRV');
  }, []);

  const onSubmitForm = useCallback((e) => {    
    if (e.otherReason) {
      e.reason = e.otherReason;       
      
      send('service_lp9cvs9', 'template_msr2zh3', e);
      dispatch({
        type: REPORT_MODAL_INVISIBLE,
      });
      message.success('신고가 정상적으로 접수되었습니다.', 1.5);
    } else {
      send('service_lp9cvs9', 'template_msr2zh3', e);
      dispatch({
        type: REPORT_MODAL_INVISIBLE,
      });
      message.success('신고가 정상적으로 접수되었습니다.', 1.5);
    }
  }, []);

  const reportModalCancelBtn = useCallback(() => {
    dispatch({
      type: REPORT_MODAL_INVISIBLE,
    })
  }, []); 
  
  const onClickOtherReason = useCallback((e) => {    
    (e === '그 외 사유') ? setOtherReason(true) : setOtherReason(false);
  }, []);

  return (
    <Modal
      centered          
      visible={reportModalVisible}                
      onCancel={reportModalCancelBtn}
      width={700}
      footer={null}      
    > 
      <Row align='middle'>
        <ReportFormIcon />
        <ContactFormMainText className='bolder'>Report Post</ContactFormMainText>
      </Row>
      <ContactFormSubText className='bold'>Thank you for your Comments.</ContactFormSubText>      

      <Form
        className='bold'
        form={form}
        name="report"
        onFinish={onSubmitForm}    
        layout="vertical"
        requiredMark={false}
        initialValues={
          {
            reportedUser: reportInfo.nickname,
            reportedContent: reportInfo.title,
            reportedType: reportInfo.type,
            reporterUser: me.nickname,
          }
        }
      >
        <Form.Item
          name="reportedUser"
          label="Reportd User"
          rules={[
            {
              type: 'text',              
            },
            {
              required: true,
            },
          ]}
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          name="reportedContent"
          label="Reportd Content"
          rules={[
            {
              type: 'text',              
            },
            {
              required: true,
            },
          ]}
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          name="reportedType"
          label="Reportd Type"
          rules={[
            {
              type: 'text',              
            },
            {
              required: true,
            },
          ]}
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          name="reporterUser"
          label="Reporter User"
          rules={[
            {
              type: 'text',              
            },
            {
              required: true,
            },
          ]}
        >
          <Input disabled/>
        </Form.Item>

        <Form.Item
          name="email"
          label="E-MAIL"
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
          <Input placeholder='이메일을 입력하세요.' allowClear/>
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason"
          rules={[
            {
              type: 'text',              
            },
            {
              required: true,
              message: '신고사유를 입력하세요.',
            },
          ]}
        >
          <Select onSelect={onClickOtherReason} placeholder='신고사유를 선택해주세요.'>
            <Select.Option value="영리 / 홍보 목적">영리 / 홍보 목적</Select.Option>
            <Select.Option value="욕설 / 반말 / 부적절한 언어 사용">욕설 / 반말 / 부적절한 언어 사용</Select.Option>
            <Select.Option value="도배성">도배성</Select.Option>
            <Select.Option value="개인정보 노출">개인정보 노출</Select.Option>
            <Select.Option value="음란성 / 선정성 위배">음란성 / 선정성 위배</Select.Option>
            <Select.Option value="그 외 사유">그 외 사유</Select.Option>
          </Select>          
        </Form.Item>
        
        { 
          otherReason && 
            <Form.Item
            name="otherReason"          
            rules={[
              {
                type: 'text',              
              },
              {
                required: true,
                message: '신고사유를 입력하세요.',
              },
            ]}
          >
            <Input placeholder='기존 선택사항 이외에 다른 신고사유를 입력해주세요.' allowClear/>
          </Form.Item>        
        }

        <Form.Item
          name="detailReason"
          label="Detailed Report"
          rules={[
            {
              type: 'text',              
            },
          ]}
        >
          <Input.TextArea placeholder='자세한 신고사유를 입력해주세요.' allowClear rows={6} showCount maxLength={400}/>
        </Form.Item>

        <Form.Item>
          <Row justify="end">
            <ContactFormBtn onClick={reportModalCancelBtn}>취소</ContactFormBtn>
            <Button type="primary" htmlType="submit">전송</Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
};

export default ReportModal;