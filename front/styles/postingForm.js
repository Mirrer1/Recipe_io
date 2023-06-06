import { Button, Divider, Form, Input } from 'antd';
import styled from 'styled-components';

export const PostingFormWrapper = styled(Form)`
  && {
    padding: 3em;
  }
`;

export const FormWrapper = styled(Form.Item)`
  && {
    margin-bottom: 1.5em;
  }
`;

export const FormHeader = styled.div`
  && {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
  }
`;

export const HeaderText = styled.h2`
  && {
    font-size: 1.5rem;
    margin-bottom: 0;
  }
`;

export const HeaderBtn = styled(Button)`
  && {
    margin-right: 0.5em;
  }
`;

export const HeaderDiviver = styled(Divider)`
  && {
    margin: 0;
    background-color: #a4a4a4;
  }
`;

export const ImageUploaderText = styled.p`
  && {
    margin-bottom: 0.5em;
  }
`;

export const ImageUploaderWrapper = styled(Form.Item)`
  && {
    text-align: end;
    margin-bottom: 1em;
  }
`;

export const ContentFormWrapper = styled(Form.Item)`
  && {
    margin-bottom: 1.5em;
  }
`;

export const TagsInputWrapper = styled(Input)`
  && {
    border: solid 1px #a4a4a4;
    margin-bottom: 0.5em;
  }
`;
