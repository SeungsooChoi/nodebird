import { all, call, fork, take } from 'redux-saga/effects';
import axios, { put } from "axios";

function logInApi(data) {
  return axios.post('/api/login', data)
}

function* login(action){
  try {
    const result = yield call(logInApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    })
  }
}

function logOutApi() {
  return axios.post('/api/logout')
}

function* logout(){
  try {
    const result = yield call(logOutApi); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: 'LOG_OUT_SUCCESS',
      data: result.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    })
  }
}

function addPostApi(data) {
  return axios.post('/api/post', data)
}

function* addPost(action){
  try {
    const result = yield call(addPostApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: 'ADD_POST_SUCCESS',
      data: result.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    })
  }
}

function* watchLogin(){
  yield take('LOG_IN_REQUEST', login); // login action이 실행될때까지 기다림
}

function* watchLogout(){
  yield take('LOG_OUT_REQUEST', logout);
}

function* watchAddPost(){
  yield take('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
  yield all([
    fork(watchLogin), // call
    fork(watchLogout),
    fork(watchAddPost),
  ])
}