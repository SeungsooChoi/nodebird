import React, {useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {addCommentAction} from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentComplete, addCommentLoading } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if(addCommentComplete){
      setCommentText('');
    }
  }, [addCommentComplete]);

  const onSubmitConfirm = useCallback(()=>{
    dispatch(addCommentAction({ content: commentText, postId: post.id, userId: id }));
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitConfirm}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
        <Button style={{ marginTop: 5 }} type="primary" htmlType="submit" loading={addCommentLoading}>얍얍</Button>
      </Form.Item>
    </Form>
  )
}

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
}

export default CommentForm;