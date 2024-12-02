import { all, fork, takeLatest, delay, put, throttle } from 'redux-saga/effects';
import axios from "axios";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  generateDummyPosts
} from "../reducers/post";
import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from "../reducers/user";
import shortId from "shortid";

function loadPostApi(data) {
  return axios.get('/api/post', data);
}

function* loadPost(action){
  try {
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPosts(10),
    });
  } catch (err) {
    yield put({ // dispatch
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostApi(data) {
  return axios.post('/api/post', data);
}

function* addPost(action){
  try {
    // const result = yield call(addPostApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield delay(1000);
    const id = shortId.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      }
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({ // dispatch
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostApi(data) {
  return axios.delete('/api/post', data);
}
function* removePost(action){
  try {
    // const result = yield call(removePostApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({ // dispatch
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentApi(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action){
  try {
    yield delay(1000);
    // const result = yield call(addCommentApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({ // dispatch
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost(){
  yield throttle(2000, LOAD_POST_REQUEST, loadPost);
}
function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchRemovePost(){
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchAddComment(){
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}


export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}