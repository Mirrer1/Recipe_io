import React from 'react';
import { List } from 'antd';

import TopPostCard from './TopPostCard';
import PropTypes from 'prop-types';
import { TopList } from '../../styles/homePost';

const TopPostList = ({ topPosts }) => {
  return (
    <section>
      <TopList
        grid={{ gutter: 16, column: 4 }}
        bordered
        itemLayout="horizontal"
        pagination={{
          onChange: (page) => console.log(page), pageSize: 4,
        }}
        dataSource={topPosts}
        renderItem={item => (
          <List.Item>
            <TopPostCard post={item} key={item.id} />
          </List.Item>
        )}
      />    
    </section>
  )
}

TopPostList.propTypes = {
  topPosts: PropTypes.arrayOf(PropTypes.object),  
};

export default TopPostList;