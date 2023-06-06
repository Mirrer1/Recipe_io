import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_ALERT_REQUEST,
  LOAD_MY_ALERT_SUCCESS,
  LOAD_MY_ALERT_FAILURE,
  CHECKED_ALERT_REQUEST,
  CHECKED_ALERT_SUCCESS,
  CHECKED_ALERT_FAILURE,
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  LOAD_LIKED_POSTS_REQUEST,
  LOAD_LIKED_POSTS_SUCCESS,
  LOAD_LIKED_POSTS_FAILURE,
  LOAD_BOARD_POSTS_REQUEST,
  LOAD_BOARD_POSTS_SUCCESS,
  LOAD_BOARD_POSTS_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SEND_AUTH_MAIL_REQUEST,
  SEND_AUTH_MAIL_SUCCESS,
  SEND_AUTH_MAIL_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  NICKNAME_EDIT_REQUEST,
  NICKNAME_EDIT_SUCCESS,
  NICKNAME_EDIT_FAILURE,
} from '../reducers/user';

function loadMyInfoAPI() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyAlertAPI(alertLimit) {
  return axios.get(`/user/alert?alertLimit=${alertLimit || 5}`);
}

function* loadMyAlert(action) {
  try {
    const result = yield call(loadMyAlertAPI, action.alertLimit);
    yield put({
      type: LOAD_MY_ALERT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_ALERT_FAILURE,
      error: err.response.data,
    });
  }
}

function checkedAlertAPI(data) {
  return axios.delete(`/user/${data}/alert`);
}

function* checkedAlert(action) {
  try {
    const result = yield call(checkedAlertAPI, action.data);
    yield put({
      type: CHECKED_ALERT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHECKED_ALERT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserInfoAPI(data) {
  return axios.get(`/user/${data}`);
}

function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.data);
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function loadLikedPostsAPI(likedLimit) {
  return axios.get(`/user/liked?likedLimit=${likedLimit || 6}`);
}

function* loadLikedPosts(action) {
  try {
    const result = yield call(loadLikedPostsAPI, action.likedLimit);
    yield put({
      type: LOAD_LIKED_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_LIKED_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadBoardPostsAPI() {
  return axios.get('/user/board');
}

function* loadBoardPosts() {
  try {
    const result = yield call(loadBoardPostsAPI);
    yield put({
      type: LOAD_BOARD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_BOARD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function sendAuthMailAPI(data) {
  return axios.post('/user/auth', data);
}

function* sendAuthMail(action) {
  try {
    const result = yield call(sendAuthMailAPI, action.data);
    yield put({
      type: SEND_AUTH_MAIL_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SEND_AUTH_MAIL_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function nicknameEditAPI(data) {
  return axios.patch('/user/nickname', data);
}

function* nicknameEdit(action) {
  try {
    const result = yield call(nicknameEditAPI, action.data);
    yield put({
      type: NICKNAME_EDIT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NICKNAME_EDIT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLoadMyAlert() {
  yield takeLatest(LOAD_MY_ALERT_REQUEST, loadMyAlert);
}

function* watchCheckedAlert() {
  yield takeLatest(CHECKED_ALERT_REQUEST, checkedAlert);
}

function* watchLoadUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchLoadLikedPosts() {
  yield takeLatest(LOAD_LIKED_POSTS_REQUEST, loadLikedPosts);
}

function* watchLoadBoardPosts() {
  yield takeLatest(LOAD_BOARD_POSTS_REQUEST, loadBoardPosts);
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSendAuthMail() {
  yield takeLatest(SEND_AUTH_MAIL_REQUEST, sendAuthMail);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchNicknameEdit() {
  yield takeLatest(NICKNAME_EDIT_REQUEST, nicknameEdit);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadMyInfo),
    fork(watchLoadMyAlert),
    fork(watchCheckedAlert),
    fork(watchLoadUserInfo),
    fork(watchLoadLikedPosts),
    fork(watchLoadBoardPosts),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSendAuthMail),
    fork(watchSignUp),
    fork(watchNicknameEdit),
  ]);
}
