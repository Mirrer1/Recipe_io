import React from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';

import RecentPostCard from './RecentPostCard';
import { RecentList } from '../../styles/homePost';

const RecentPostList = ({ recentPosts }) => {  
  return (
    <section>
      <RecentList
        bordered
        grid={{
          gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4,
        }}
        dataSource={recentPosts}
        renderItem={(item) => (
          <List.Item>
            <RecentPostCard post={item} key={item.id}/>
          </List.Item>
        )}
      />          
    </section>
  )
};

RecentPostList.propTypes = {
  recentPosts: PropTypes.arrayOf(PropTypes.object),  
};

export default RecentPostList;