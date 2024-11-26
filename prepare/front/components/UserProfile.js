import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch } from "react-redux";

import { logoutAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="dd">0
          dd
          <br />0
        </div>,
        <div key="ss">
          ss
          <br />0
        </div>,
        <div key="aa">
          aa
          <br />0
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>dd</Avatar>}
        title="승수"
        description={<Button onClick={onLogOut}>로그아웃</Button>}
      />
    </Card>
  );
};

export default UserProfile;