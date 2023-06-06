import React from 'react';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';

import { UploadModalIcon } from '../../styles/modal';
import { BtnWrapper, ModalMainText, ModalSubText } from '../../styles/homePost';

const UploadModal = () => {
  const { uploadImagesLoading } = useSelector((state) => state.post);

  return (
    <>
      <Modal
        centered
        visible={uploadImagesLoading}
        footer={false}
        closable={false}
      >
        <BtnWrapper>
          <UploadModalIcon />
          <ModalMainText>이미지 작업 중...</ModalMainText>
        </BtnWrapper>
        <ModalSubText>잠시만 기다려 주세요.</ModalSubText>
      </Modal>
    </>
  );
};

export default UploadModal;
