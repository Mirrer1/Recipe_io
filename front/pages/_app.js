import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import '../styles/font.css';
import Head from 'next/head';

import wrapper from '../store/configureStore';

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Recipe.io</title>
        <meta name='description' content={'간편하고 다양한 요리 레시피에 접근할 수 있는 레시피 공유 SNS'}/>        
        <meta property='og:title' content={'Recipe.io'} />
        <meta property='og:description' content={'간편하고 다양한 요리 레시피에 접근할 수 있는 레시피 공유 SNS'} />                
        <meta property="og:image" content={'https://recipeio.ga/favicon.ico'} />
        <meta property='og:url' content={'https://recipeio.ga/'} />
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default wrapper.withRedux(App);