import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

import wrapper from "../store/configureStore";

// app.js는 전체 페이지의 공통 컴포넌트를 설정할 때 사용
const App = ({ Component }) => {
  // Component에는 index.js에서 설정한 컴포넌트가 담겨있음
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
