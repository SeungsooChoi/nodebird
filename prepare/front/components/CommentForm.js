import React ,{ useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import {useSelector} from "react-redux";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput('');
  const onSubmitConfirm = useCallback(()=>{
    console.log(post.id, commentText);
  }, [commentText]);
  return (
    <Form onFinish={onSubmitConfirm}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
        <Button style={{ marginTop: 5 }} type="primary" htmlType="submit" >얍얍</Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
}

export default CommentForm;