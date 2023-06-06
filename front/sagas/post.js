import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOAD_TOP_POSTS_REQUEST,
  LOAD_TOP_POSTS_SUCCESS,
  LOAD_TOP_POSTS_FAILURE,
  LOAD_RECENT_POSTS_REQUEST,
  LOAD_RECENT_POSTS_SUCCESS,
  LOAD_RECENT_POSTS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  EDIT_POST_REQUEST,
  EDIT_POST_SUCCESS,
  EDIT_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
} from '../reducers/post';
import {
  REMOVE_POST_OF_MYPAGE,
  ADD_LIKED_POST_OF_MYPAGE,
  REMOVE_LIKED_POST_OF_MYPAGE,
  ADD_COMMENT_POST_OF_MYPAGE,
  REMOVE_COMMENT_POST_OF_MYPAGE,
} from '../reducers/user';

function loadTopPostsAPI() {
  return axios.get('/posts/top');
}

function* loadTopPosts() {
  try {
    const result = yield call(loadTopPostsAPI);
    yield put({
      type: LOAD_TOP_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TOP_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadRecentPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadRecentPosts(action) {
  try {
    const result = yield call(loadRecentPostsAPI, action.lastId);
    yield put({
      type: LOAD_RECENT_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_RECENT_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadHashtagPostsAPI(data, lastId) {
  return axios.get(
    `/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`
  );
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function editPostAPI(data) {
  return axios.patch(`/post/${data.postId}/edit`, data);
}

function* editPost(action) {
  try {
    const result = yield call(editPostAPI, action.data);
    yield put({
      type: EDIT_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_MYPAGE,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_LIKED_POST_OF_MYPAGE,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function unLikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unLikePost(action) {
  try {
    const result = yield call(unLikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_LIKED_POST_OF_MYPAGE,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_COMMENT_POST_OF_MYPAGE,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function editCommentAPI(data) {
  return axios.patch(`/post/${data.postId}/comment`, data);
}

function* editComment(action) {
  try {
    const result = yield call(editCommentAPI, action.data);
    yield put({
      type: EDIT_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: EDIT_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function removeCommentAPI(data) {
  return axios.delete('/post/comment', {
    data: data,
  });
}

function* removeComment(action) {
  try {
    const result = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_COMMENT_POST_OF_MYPAGE,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadTopPosts() {
  yield takeLatest(LOAD_TOP_POSTS_REQUEST, loadTopPosts);
}

function* watchLoadRecentPosts() {
  yield takeLatest(LOAD_RECENT_POSTS_REQUEST, loadRecentPosts);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchEditPost() {
  yield takeLatest(EDIT_POST_REQUEST, editPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnLikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchEditComment() {
  yield takeLatest(EDIT_COMMENT_REQUEST, editComment);
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadTopPosts),
    fork(watchLoadRecentPosts),
    fork(watchLoadPost),
    fork(watchLoadUserPosts),
    fork(watchLoadHashtagPosts),
    fork(watchUploadImages),
    fork(watchAddPost),
    fork(watchEditPost),
    fork(watchRemovePost),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchAddComment),
    fork(watchEditComment),
    fork(watchRemoveComment),
  ]);
}
