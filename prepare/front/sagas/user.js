import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import axios from "axios";
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS
} from "../reducers/user";

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
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}