import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'antd';
import { HeartTwoTone, MessageTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';

import MenuDivider from 'antd/lib/menu/MenuDivider';
import { CHECKED_ALERT_REQUEST } from '../../reducers/user';
import { loadPostRequestAction, moveToCommentRequestAction } from '../../reducers/post';
import { AlertText, AlertUserNickname, AlertDeleteBtn, AlertDeleteIcon } from '../../styles/headerMenu';

const AlertMenu = ({ userAlert }) => {  
  const dispatch = useDispatch();
  
  const onClickAlert = useCallback((alertInfo) => () => {        
    dispatch({
      type: CHECKED_ALERT_REQUEST,
      data: alertInfo.id,
    });

    if (alertInfo.type === "comment") {
      dispatch(loadPostRequestAction(alertInfo.Post.id));  
      dispatch(moveToCommentRequestAction());
    } else {
      dispatch(loadPostRequestAction(alertInfo.Post.id));
    }
  }, []);
  
  const onDeleteAlert = useCallback((alertInfo) => (e) => {    
    e?.stopPropagation();

    dispatch({
      type: CHECKED_ALERT_REQUEST,
      data: alertInfo.id,
    });
  }, []);  

  return ( 
    <>      
      <Row justify='space-between'>
        <Col>
          <AlertText onClick={onClickAlert(userAlert)}>
            {userAlert?.type === 'like' ? <HeartTwoTone twoToneColor="#eb2f96"/> : <MessageTwoTone />}
            <AlertUserNickname className='bolder'>{userAlert.Alerter?.nickname}</AlertUserNickname>님이&nbsp;   
            <span className='bolder'>{userAlert.Post?.title.length > 10 ? userAlert.Post?.title.slice(0, 10) + '...' : userAlert.Post?.title}</span>&nbsp;                            
            게시글에 {userAlert?.type === 'like' ? '좋아요를 눌렀습니다.' : '댓글을 등록했습니다.'}
            <MenuDivider />
          </AlertText>                                                  
        </Col>
        <Col>
          <AlertDeleteBtn onClick={onDeleteAlert(userAlert)} icon={<AlertDeleteIcon />}></AlertDeleteBtn>
        </Col>
      </Row>      
    </>
  )
};

AlertMenu.propTypes = {
  userAlert: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    Post: PropTypes.object,
    Alerter: PropTypes.object,
  })
};

export default AlertMenu;