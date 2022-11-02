import React, { useState, useCallback } from 'react';
import { Image } from 'antd';
import PropTypes from 'prop-types';

import { ModalImageWrapper } from '../../styles/modal';

const ModalImage = ({ PostImages }) => {
  const [visible, setVisible] = useState(false);
  const showImage = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <>
      <Image
        preview={{
          visible: false,
        }}
        width={700}
        height={460}
        src={`http://localhost:3065/${PostImages[0]?.src}`}
        onClick={showImage}
      />
      <ModalImageWrapper>
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => setVisible(vis),
          }}
        > 
          {PostImages.map((v) => {
            return (              
              <Image key={v.id} src={`http://localhost:3065/${v?.src}`} />              
            )
          })}
        </Image.PreviewGroup>
      </ModalImageWrapper>
    </>
  )
};

ModalImage.propTypes = {
  PostImages: PropTypes.arrayOf(PropTypes.object),
}

export default ModalImage;