import React, { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { logOutRequestAction } from "../reducers/user";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logOutRequestAction());
  }, []);

  return (
    <Card
      actions={[
        <div key="dd">0
          dd
          <br />{me.Posts.length}
        </div>,
        <div key="ss">
          ss
          <br />{me.Followings.length}
        </div>,
        <div key="aa">
          aa
          <br />{me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
        description={<Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>}
      />
    </Card>
  );
};

export default UserProfile;
