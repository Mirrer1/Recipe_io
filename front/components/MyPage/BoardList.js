import React from 'react';
import { useSelector } from 'react-redux';
import { List } from 'antd';

import BoardCard from './BoardCard';

const BoardList = () => {
  const { boardPosts } = useSelector((state) => state.user);

  return (
    <section>
      <List  
          itemLayout="vertical"
          bordered    
          size="large"
          pagination={{
            onChange: (page) => console.log(page), pageSize: 3,
          }}
          dataSource={boardPosts}    
          renderItem={(item) => (  
            <List.Item key={item.id}>
              <BoardCard post={item}  />
            </List.Item>         
        )}
      />          
    </section>
  )
};

export default BoardList;