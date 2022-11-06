import React, { useCallback } from 'react';
import { Button, message } from 'antd';
import PropTypes from 'prop-types';

const PostShareBtn = ({ postId }) => {
  const onClickShareBtn = useCallback((text) => () => {    
    if (navigator.clipboard) {      
      navigator.clipboard
        .writeText(text)
        .then(() => {       
          message.success('게시글 URL이 클립보드에 복사되었습니다.', 1.5);             
        })
        .catch(() => {
          message.error('다시 시도해주세요.', 1.5);             
        });
    } else {      
      if (!document.queryCommandSupported("copy")) {
        return message.info('해당 기능을 지원하지 않는 브라우저입니다.', 1.5);        
      }
      
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.top = 0;
      textarea.style.left = 0;
      textarea.style.position = "fixed";

      document.body.appendChild(textarea);      
      textarea.focus();      
      textarea.select();      
      document.execCommand("copy");      
      document.body.removeChild(textarea);
      message.success('게시글 URL이 클립보드에 복사되었습니다.', 1.5);   
    }
  });

  return (
    <Button onClick={onClickShareBtn(`http://recipeio.ga/post/${postId}`)}>공유</Button>    
  )
};

PostShareBtn.propTypes = {  
  postId: PropTypes.number,  
};

export default PostShareBtn;