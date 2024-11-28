import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import axios from "axios";

function logInApi(data) {
  return axios.post('/api/login', data)
}

function* login(action){
  try {
    yield delay(1000);
    // const result = yield call(logInApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data,
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
    yield delay(1000);
    // const result = yield call(logOutApi); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: 'LOG_OUT_SUCCESS',
      // data: result.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    })
  }
}

function* watchLogin(){
  yield takeLatest('LOG_IN_REQUEST', login); // login action이 실행될때까지 기다림, 기존에 진행 중이던 작업이 있다면 취소 처리하고 가장 마지막으로 실행된 작업만 수행한다
}

function* watchLogout(){
  yield takeLatest('LOG_OUT_REQUEST', logout);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
  ]);
}