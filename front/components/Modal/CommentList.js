import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List } from 'antd';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dayjs from 'dayjs';

import CommentBtn from './CommentBtn';
import EditCommentForm from './EditCommentForm';
import { INVISIBLE_EDIT_COMMENT } from '../../reducers/post';
import { ListWrapper, CommentNickname, CommentContent, CommentDate } from '../../styles/modal';
import { UserAvatarLink } from '../../styles/headerMenu';

dayjs.locale('ko');

const CommentList = ({ Comments, postId }) => {    
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { editComment, editCommentDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (editCommentDone) {
      dispatch({
        type: INVISIBLE_EDIT_COMMENT
      })
    };
  }, [editCommentDone]);
  
  return (
    <>      
      <ListWrapper       
        header={
          <div className='bold'>
            {`${Comments.length}개의 댓글`}
          </div>
        }
        itemLayout='horizontal'
        dataSource={Comments}
        renderItem={(item) => (
          <List.Item
            actions={
              me && [<CommentBtn comment={item}/>]
            }
          >
            <List.Item.Meta             
              avatar={<Avatar><Link href={`user/${item.User.id}`}><UserAvatarLink>{item.User.nickname[0]}</UserAvatarLink></Link></Avatar>}
              title={<Link href={`user/${item.User.id}`}><CommentNickname className='bold'>{item.User.nickname}</CommentNickname></Link>}
              description={
                (editComment === item.id) 
                ? <EditCommentForm postId={postId} commentId={item.id}/>
                : <div>
                    <CommentContent>{item.content}</CommentContent>
                    <CommentDate>{dayjs(item.createdAt).format('YYYY.MM.DD')}</CommentDate>
                  </div>
              }
            />  
          </List.Item>          
        )}
      />    
    </>
  )
};

CommentList.propTypes = {
  Comments: PropTypes.arrayOf(PropTypes.object),
  postId: PropTypes.number,
};

export default CommentList;