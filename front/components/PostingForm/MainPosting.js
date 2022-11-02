import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Router from 'next/router';

import { ADD_POST_REQUEST, RETURN_FROM_EDIT_POST, EDIT_POST_REQUEST } from '../../reducers/post';
import PostingUpload from './PostingUpload';
import { 
  PostingFormWrapper, FormWrapper, FormHeader, HeaderText, HeaderBtn, 
  HeaderDiviver, ContentFormWrapper, TagsInputWrapper 
} from '../../styles/postingForm';

const MainPosting = () => {  
  const dispatch = useDispatch();      
  const [form] = Form.useForm();
  const { editImagePaths, imagePaths, addPostLoading, editPost, editPostLoading } = useSelector((state) => state.post);

  const postingCancelBtn = useCallback(() => {
    Modal.confirm({
      title: '게시글 작성을 중단하고 돌아가시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '작성된 게시글의 내용은 저장되지 않습니다.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        Router.push('/');
      },
      onCancel() {},
    });
  });

  const editPostingCancelBtn = useCallback(() => {
    Modal.confirm({
      title: '게시글 수정을 중단하고 돌아가시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '수정된 게시글의 내용은 저장되지 않습니다.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch({
          type: RETURN_FROM_EDIT_POST,
        })
        Router.push('/');
      },
      onCancel() {},
    });
  }, []);
  
  const onSubmitForm = useCallback((value) => {             
    if (editPost) {
      const fullEditImagePaths = [...editImagePaths, ...imagePaths];

      dispatch({
        type: EDIT_POST_REQUEST,
        data: {
          fullEditImagePaths,
          content: value,
          postId: editPost.id,
        }
      });    
    } else {
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          imagePaths,
          content: value,
        }
      });    
    }
  }, [imagePaths, editImagePaths]);

  return (
    <section>
      <PostingFormWrapper
        initialValues={ 
          editPost && {
            title: editPost?.title,
            desc: editPost?.desc, 
            ingredient: editPost?.ingredient,
            recipes: editPost?.recipes,
            tips: editPost?.tips,
            tags: editPost?.tags,            
        }}
        form={form}
        name="posting"
        onFinish={onSubmitForm}      
        scrollToFirstError
        encType='multipart/form-data'
      >
        <FormWrapper>
          <FormHeader>
            <HeaderText className='bold'>Post Writing</HeaderText>
            <div>
              {
                editPost 
                ? <HeaderBtn type='primary' size='large' htmlType="submit" loading={editPostLoading}>수정</HeaderBtn>
                : <HeaderBtn type='primary' size='large' htmlType="submit" loading={addPostLoading}>등록</HeaderBtn>
              }              
              {
                editPost 
                ? <Button size='large' onClick={editPostingCancelBtn}>취소</Button>
                : <Button size='large' onClick={postingCancelBtn}>취소</Button>
              }              
            </div>
          </FormHeader>
          <HeaderDiviver />
        </FormWrapper>

        <FormWrapper
          name="title"
          rules={[
            {
              type: 'text',
            },
            {
              required: true,
              message: '포스팅 제목을 입력하세요.',
            },
          ]}
          hasFeedback
        >
          <Input 
            placeholder='제목을 입력해 주세요.' 
            allowClear
            size='large' 
            showCount
            maxLength={50}
          />
        </FormWrapper>

        <FormWrapper
          name="desc"
          rules={[
            {
              type: 'text',
            },            
          ]}          
        >
          <Input.TextArea
            placeholder='포스팅의 간략한 설명을 입력해 주세요.'
            allowClear
            size='large' 
            showCount
            maxLength={100}
            rows={2}            
          />
        </FormWrapper>

        <PostingUpload editPost={editPost} />
        
        <ContentFormWrapper
          name="ingredient"
          rules={[
            {
              type: 'text',
            },
            {
              required: true,
              message: '재료를 입력하세요.',
            },
          ]}
          hasFeedback
        >
          <Input.TextArea             
            placeholder='재료를 입력하세요.' 
            allowClear
            size='large' 
            showCount
            maxLength={250}
            rows={5}
          />
        </ContentFormWrapper>

        <ContentFormWrapper
          name="recipes"
          rules={[
            {
              type: 'text',
            },
            {
              required: true,
              message: '요리방법을 입력하세요.',
            },
          ]}
          hasFeedback
        >
          <Input.TextArea 
            placeholder='요리방법을 입력하세요.' 
            allowClear
            size='large' 
            showCount
            maxLength={800}
            rows={20}
          />
        </ContentFormWrapper>

        <ContentFormWrapper
          name="tips"
          rules={[
            {
              type: 'text',
            },          
          ]}        
        >
          <Input.TextArea 
            placeholder='Tip을 입력하세요.' 
            allowClear
            size='large' 
            showCount
            maxLength={200}
            rows={4}
          />
        </ContentFormWrapper>

        <Form.Item
          name="tags"
            rules={[
              {
                type: 'text',
              },            
            ]}          
          >
          <TagsInputWrapper 
            placeholder='태그를 입력해 주세요. (#태그1 #태그2...)' 
            allowClear
            size='large'             
          />          
        </Form.Item>        
      </PostingFormWrapper>    
    </section>    
  )
};

export default MainPosting;