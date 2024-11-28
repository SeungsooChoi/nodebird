import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { logoutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
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
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
        description={<Button onClick={onLogOut} loading={isLoggingOut}>로그아웃</Button>}
      />
    </Card>
  );
};

export default UserProfile;
