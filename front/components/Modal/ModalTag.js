import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { TagWrapper } from '../../styles/modal';

const ModalTag = ({ tags }) => (  
  <div>    
    {tags.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/)) {
        return (
          <span key={i}>
            <Link href={`/hashtag/${v.slice(1)}`}><a><TagWrapper color="#2db7f5">{v}</TagWrapper></a></Link>
          </span>
        )
      }
      return null;
    })}
  </div>  
);

ModalTag.propTypes = {  
  tags: PropTypes.string,
};

export default ModalTag;

