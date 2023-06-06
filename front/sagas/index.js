import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import { backUrl } from '../config/config';
import userSaga from './user';
import postSaga from './post';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
