import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import axios from "axios";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS
} from "../reducers/post";

function addPostApi(data) {
  return axios.post('/api/post', data)
}

function* addPost(action){
  try {
    yield delay(1000);
    // const result = yield call(addPostApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: ADD_POST_FAILURE,
      error: err.response.data,
    })
  }
}

function addCommentApi(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data)
}

function* addComment(action){
  try {
    yield delay(1000);
    // const result = yield call(addCommentApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment(){
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}


export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}