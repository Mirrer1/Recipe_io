import styled from 'styled-components';
import { Divider } from 'antd';
import { UpCircleFilled } from '@ant-design/icons';

// PageLayout Styles
export const MenuDivider = styled(Divider)`
  && {
    margin: 0;
  }
`;

export const UpBtn = styled.button`
  && {
    position: fixed;
    bottom: 20px;
    right: 20px;
    outline: none;
    border: none;
    cursor: pointer;
    background: #fff;
    background-color: transparent;
    z-index: 1;
    transition: transform 300ms ease;

    &:hover {
      transform: scale(1.05);
      color: #333333;
    }

    &:active {
      color: #000;
    }
  }
`;

export const UpBtnIcon = styled(UpCircleFilled)`
  && {
    font-size: 2rem;
  }
`;
