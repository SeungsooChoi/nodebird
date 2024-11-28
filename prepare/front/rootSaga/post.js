import { all, fork, takeLatest, delay, put } from 'redux-saga/effects';
import axios from "axios";

function addPostApi(data) {
  return axios.post('/api/post', data)
}

function* addPost(action){
  try {
    yield delay(1000);
    // const result = yield call(addPostApi, action.data); // call은 동기 함수 호출 , fork는 비동기 함수 호출
    yield put({
      type: 'ADD_POST_SUCCESS',
      // data: result.data,
    })
  } catch (err) {
    yield put({ // dispatch
      type: 'ADD_POST_FAILURE',
      data: err.response.data,
    })
  }
}

function* watchAddPost(){
  yield takeLatest('ADD_POST_REQUEST', addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
  ]);
}