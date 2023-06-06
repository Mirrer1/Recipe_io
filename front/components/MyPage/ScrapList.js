import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, Button } from 'antd';

import ScrapCard from './ScrapCard';
import { LOAD_LIKED_POSTS_REQUEST } from '../../reducers/user';
import { ListWrapper, BtnWrapper } from '../../styles/myPage';

const ScrapList = () => {
  const dispatch = useDispatch();
  const { likedPosts, loadLikedPostLoading } = useSelector(
    (state) => state.user
  );
  const [likedLimit, setLikedLimit] = useState(6);

  const moreLikedPosts = useCallback(() => {
    setLikedLimit((prev) => prev + 6);
  }, []);

  useEffect(() => {
    if (likedLimit > 6) {
      dispatch({
        type: LOAD_LIKED_POSTS_REQUEST,
        likedLimit,
      });
    }
  }, [likedLimit]);

  return (
    <section>
      <ListWrapper
        grid={{
          gutter: 16,
          column: 5,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 5,
          xxl: 6,
        }}
        bordered
        loadMore={
          <BtnWrapper>
            <Button
              size='large'
              onClick={moreLikedPosts}
              loading={loadLikedPostLoading}
            >
              More View
            </Button>
          </BtnWrapper>
        }
        dataSource={likedPosts}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <ScrapCard post={item} />
          </List.Item>
        )}
      ></ListWrapper>
    </section>
  );
};

export default ScrapList;
