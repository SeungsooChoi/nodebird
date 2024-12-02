import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import axios from "axios";
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS
} from "../reducers/user";

function followApi(data) {
  return axios.post('/api/follow', data)
}

function* follow(action){
  try {
    yield delay(1000);
    // const result = yield call(followApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: FOLLOW_FAILURE,
      error: err.response.data,
    })
  }
}

function unFollowApi(data) {
  return axios.post('/api/unFollow', data)
}

function* unFollow(action){
  try {
    yield delay(1000);
    // const result = yield call(unFollowApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    })
  }
}

function logInApi(data) {
  return axios.post('/api/login', data)
}

function* logIn(action){
  try {
    yield delay(1000);
    // const result = yield call(logInApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: LOG_IN_FAILURE,
      error: err.response.data,
    })
  }
}

function logOutApi() {
  return axios.post('/api/logout')
}

function* logOut(){
  try {
    yield delay(1000);
    // const result = yield call(logOutApi); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  } catch (err) {
    yield put({ // dispatch
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    })
  }
}

function signUpApi() {
  return axios.post('/api/signup')
}

function* signUp(){
  try {
    yield delay(1000);
    // const result = yield call(signUpApi); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: SIGN_UP_SUCCESS,
    })
  } catch (err) {
    yield put({ // dispatch
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    })
  }
}


function* watchFollow(){
  yield takeLatest(FOLLOW_REQUEST, follow); // login action이 실행될때까지 기다림, 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다
}

function* watchUnFollow(){
  yield takeLatest(UNFOLLOW_REQUEST, unFollow); // login action이 실행될때까지 기다림, 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다
}

function* watchLogIn(){
  yield takeLatest(LOG_IN_REQUEST, logIn); // login action이 실행될때까지 기다림, 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다
}

function* watchLogOut(){
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp(){
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}