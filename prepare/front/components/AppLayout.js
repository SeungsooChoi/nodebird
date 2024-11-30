import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import styled from "styled-components";
import { useSelector } from "react-redux";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const items = [
  {
    label: (
      <Link href="/" legacyBehavior>
        <a>메인</a>
      </Link>
    ),
    key: "main",
  },
  {
    label: (
      <Link href="/profile" legacyBehavior>
        <a>프로필</a>
      </Link>
    ),
    key: "profile",
  },
  {
    label: <SearchInput enterButton />,
    key: "search",
  },
  {
    label: (
      <Link href="/signup" legacyBehavior>
        <a>회원가입</a>
      </Link>
    ),
    key: "signup",
  },
];

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal" items={items} />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.naver.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            네이버
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
