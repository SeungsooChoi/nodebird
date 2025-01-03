import {Button, Form, Input} from "antd";
import React, { useCallback, useRef, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPostAction} from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
  const { imagePaths, addPostComplete, addPostLoading } = useSelector((state) => state.post);
  const imageInput = useRef();
  const dispatch = useDispatch();
  const [text, onChangeText ,setText] = useInput('');

  useEffect(() => {
    if(addPostComplete){
      setText('');
    }
  }, [addPostComplete]);

  const onSubmit = useCallback(()=> {
    dispatch(addPostAction(text));
  }, [text]);

  const onClickImageUpload = useCallback(()=>{
    imageInput.current.click();
  }, [imageInput.current])

  return (
    <Form style={{ margin:'10px 0 20px' }} encType={"multipart/form-data"} onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="텍스트를 입력하세요"
      />
      <div>
        <input type="file" multiple style={{display: 'none'}} ref={imageInput}/>
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right'}} htmlType="submit" loading={addPostLoading}>전송</Button>
      </div>
      <div>
        {imagePaths.map((v)=> (
          <div key={v} style={{display:'inline-block'}}>
            <img src={v} style={{width: '200px'}} alt={v}/>
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  )
};

export default PostForm;