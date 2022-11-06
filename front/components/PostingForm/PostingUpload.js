import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { EDIT_POST_UPLOAD_IMAGES, UPLOAD_IMAGES_REQUEST, CHANGE_EDIT_POST_IMAGES } from '../../reducers/post';
import { ImageUploaderText, ImageUploaderWrapper } from '../../styles/postingForm';

const PostingUpload = ({ editPost }) => { 
  const dispatch = useDispatch();  

  const onClickPreview = useCallback((e) => {
    e.preventDefault();
  }, []);
  
  const normFile = useCallback((e) => {
    if (Array.isArray(e)) {
      return e;
    }
  
    return e?.fileList;
  }, []);

  const onChangeImages = useCallback((e) => {
    const editImageFileList = e.fileList.filter((v) => v.status === 'done');
    const imageFileList = e.fileList.filter((v) => v.percent === 0);    

    const editImages = editImageFileList.map((v) => v.name);    
      dispatch({
        type: CHANGE_EDIT_POST_IMAGES,
        data: editImages,
      });
    
    const imageFormData = new FormData();
    imageFileList.forEach((f) => {
      imageFormData.append('image', f.originFileObj);
    });
    
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });     
  }, []);    

  const onBeforeUpload = useCallback((file, fileList) => {    
    return false
  }, []);   

  const editPostImages = editPost?.Images.map((v) => {
    return {
      uid: v.uid,
      name: v.src,
      status: 'done',      
      thumbUrl: `${v.src}`,
    }
  });

  useEffect(() => {
    if (editPost) {
      const images = editPost.Images.map((v) => v.src);

      dispatch({
        type: EDIT_POST_UPLOAD_IMAGES,
        data: images,
      }); 
    }
  }, []);

  return (
    <ImageUploaderWrapper
      name="images"
      rules={[
        {
          required: true,
          message: '조리사진을 첨부하세요.',
        },
      ]}                    
      valuePropName="fileList"
      getValueFromEvent={normFile}
      initialValue={editPost && [...editPostImages]}
    >          
      <Upload.Dragger             
        name="image"         
        listType="picture"
        onChange={onChangeImages}
        beforeUpload={onBeforeUpload}          
        onPreview={onClickPreview}                      
      >            
        <ImageUploaderText className='bold'>
          {editPost ? 'Drag edit files here or' : 'Drag files here OR'}
        </ImageUploaderText>            
        <Button type='primary' size='large' icon={<UploadOutlined />}>Upload</Button>
      </Upload.Dragger>
  </ImageUploaderWrapper>
  )
};

PostingUpload.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    desc: PropTypes.string,
    ingredient: PropTypes.string,
    recipes: PropTypes.string,
    tips: PropTypes.string,
    tags: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    UserId: PropTypes.number,
    User: PropTypes.object,    
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
    Likers: PropTypes.arrayOf(PropTypes.object),
  })
};

export default PostingUpload;