import produce from '../util/produce';

export const initialState = {
  me: null,
  userInfo: null,  
  userAlert: null,
  likedPosts: [],  
  boardPosts: [],
  loadMyInfoLoading: false, // 로그인 정보 불러오기
  loadMyInfoDone: false,
  loadMyInfoError: null,
  loadMyAlertLoading: false, // 나의 알람 정보 불러오기
  loadMyAlertDone: false,
  loadMyAlertError: null,  
  checkedAlertLoading: false, // 알람 정보 확인
  checkedAlertDone: false,
  checkedAlertError: null,
  loadUserInfoLoading: false, // 사용자 정보 불러오기
  loadUserInfoDone: false,
  loadUserInfoError: null,  
  loadLikedPostLoading: false, // 좋아요 게시글 불러오기
  loadLikedPostDone: false,
  loadLikedPostError: null,
  loadBoardPostLoading: false, // 나의 게시글 불러오기
  loadBoardPostDone: false,
  loadBoardPostError: null,
  logInLoading: false, // 로그인 시도
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도
  logOutDone: false,
  logOutError: null,    
  sendAuthMailLoading: false, // 회원가입 인증메일 전송
  sendAuthMailDone: false,
  sendAuthMailError: null,    
  authCode: null, // 회원가입 인증코드
  signUpLoading: false, // 회원가입 시도
  signUpDone: false,
  signUpError: null,
  nicknameEditLoading: false, // 닉네임수정 시도
  nicknameEditDone: false,
  nicknameEditError: null,
  contactFormVisible: false,  // 컨텍트 모달창 띄우기
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOAD_MY_ALERT_REQUEST = 'LOAD_MY_ALERT_REQUEST';
export const LOAD_MY_ALERT_SUCCESS = 'LOAD_MY_ALERT_SUCCESS';
export const LOAD_MY_ALERT_FAILURE = 'LOAD_MY_ALERT_FAILURE';

export const CHECKED_ALERT_REQUEST = 'CHECKED_ALERT_REQUEST';
export const CHECKED_ALERT_SUCCESS = 'CHECKED_ALERT_SUCCESS';
export const CHECKED_ALERT_FAILURE = 'CHECKED_ALERT_FAILURE';

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';

export const LOAD_LIKED_POSTS_REQUEST = 'LOAD_LIKED_POSTS_REQUEST';
export const LOAD_LIKED_POSTS_SUCCESS = 'LOAD_LIKED_POSTS_SUCCESS';
export const LOAD_LIKED_POSTS_FAILURE = 'LOAD_LIKED_POSTS_FAILURE';

export const LOAD_BOARD_POSTS_REQUEST = 'LOAD_BOARD_POSTS_REQUEST';
export const LOAD_BOARD_POSTS_SUCCESS = 'LOAD_BOARD_POSTS_SUCCESS';
export const LOAD_BOARD_POSTS_FAILURE = 'LOAD_BOARD_POSTS_FAILURE';

export const RESET_LOGIN_STATE = 'RESET_LOGIN_STATE';
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const RESET_LOGOUT_STATE = 'RESET_LOGOUT_STATE';
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SEND_AUTH_MAIL_REQUEST = 'SEND_AUTH_MAIL_REQUEST';
export const SEND_AUTH_MAIL_SUCCESS = 'SEND_AUTH_MAIL_SUCCESS';
export const SEND_AUTH_MAIL_FAILURE = 'SEND_AUTH_MAIL_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const NICKNAME_EDIT_REQUEST = 'NICKNAME_EDIT_REQUEST';
export const NICKNAME_EDIT_SUCCESS = 'NICKNAME_EDIT_SUCCESS';
export const NICKNAME_EDIT_FAILURE = 'NICKNAME_EDIT_FAILURE';

export const REMOVE_POST_OF_MYPAGE = 'REMOVE_POST_OF_MYPAGE';

export const ADD_LIKED_POST_OF_MYPAGE = 'ADD_LIKED_POST_OF_MYPAGE';
export const REMOVE_LIKED_POST_OF_MYPAGE = 'REMOVE_LIKED_POST_OF_MYPAGE';

export const ADD_COMMENT_POST_OF_MYPAGE = 'ADD_COMMENT_POST_OF_MYPAGE';
export const REMOVE_COMMENT_POST_OF_MYPAGE = 'REMOVE_COMMENT_POST_OF_MYPAGE';

export const CONTACT_FORM_VISIBLE = 'CONTACT_FORM_VISIBLE';
export const CONTACT_FORM_INVISIBLE = 'CONTACT_FORM_INVISIBLE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        draft.loadMyInfoLoading = true;
        draft.loadMyInfoDone = false;
        draft.loadMyInfoError = null;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoDone = true;
        draft.me = action.data;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;   
      case LOAD_MY_ALERT_REQUEST:
        draft.loadMyAlertLoading = true;
        draft.loadMyAlertDone = false;
        draft.loadMyAlertError = null;
        break;
      case LOAD_MY_ALERT_SUCCESS:
        draft.loadMyAlertLoading = false;
        draft.loadMyAlertDone = true;
        draft.userAlert = action.data;        
        break;
      case LOAD_MY_ALERT_FAILURE:
        draft.loadMyAlertLoading = false;
        draft.loadMyAlertError = action.error;
        break;
      case CHECKED_ALERT_REQUEST:
        draft.checkedAlertLoading = true;
        draft.checkedAlertDone = false;
        draft.checkedAlertError = null;
        break;
      case CHECKED_ALERT_SUCCESS:
        draft.userAlert = draft.userAlert.filter((v) => v.id !== action.data.id);
        draft.checkedAlertLoading = false;
        draft.checkedAlertDone = true;          
        break;
      case CHECKED_ALERT_FAILURE:
        draft.checkedAlertLoading = false;
        draft.checkedAlertError = action.error;
        break;
      case LOAD_USER_INFO_REQUEST:
        draft.loadUserInfoLoading = true;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = null;
        break;
      case LOAD_USER_INFO_SUCCESS:
        draft.loadUserInfoLoading = false;
        draft.loadUserInfoDone = true;
        draft.userInfo = action.data;
        break;
      case LOAD_USER_INFO_FAILURE:
        draft.loadMyInfoLoading = false;
        draft.loadMyInfoError = action.error;
        break;
      case LOAD_LIKED_POSTS_REQUEST:
        draft.loadLikedPostLoading = true;
        draft.loadLikedPostDone = false;
        draft.loadLikedPostError = null;
        break;
      case LOAD_LIKED_POSTS_SUCCESS:
        draft.loadLikedPostLoading = false;
        draft.loadLikedPostDone = true;
        draft.likedPosts = action.data;
        break;
      case LOAD_LIKED_POSTS_FAILURE:
        draft.loadLikedPostLoading = false;
        draft.loadLikedPostError = action.error;
        break;   
      case LOAD_BOARD_POSTS_REQUEST:
        draft.loadBoardPostLoading = true;
        draft.loadBoardPostDone = false;
        draft.loadBoardPostError = null;
        break;
      case LOAD_BOARD_POSTS_SUCCESS:
        draft.loadBoardPostLoading = false;
        draft.loadBoardPostDone = true;
        draft.boardPosts = action.data;
        break;
      case LOAD_BOARD_POSTS_FAILURE:
        draft.loadBoardPostLoading = false;
        draft.loadBoardPostError = action.error;
        break;  
      case RESET_LOGIN_STATE:
        draft.logInLoading = false;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInDone = false;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case RESET_LOGOUT_STATE:
        draft.logOutLoading = false;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SEND_AUTH_MAIL_REQUEST:
        draft.sendAuthMailLoading = true;
        draft.sendAuthMailDone = false;
        draft.sendAuthMailError = null;
        break;        
      case SEND_AUTH_MAIL_SUCCESS:
        draft.sendAuthMailLoading = false;
        draft.sendAuthMailDone = true;
        draft.authCode = action.data;
        break;        
      case SEND_AUTH_MAIL_FAILURE:
        draft.sendAuthMailLoading = false;
        draft.sendAuthMailError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;        
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;        
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case NICKNAME_EDIT_REQUEST:
        draft.nicknameEditLoading = true;
        draft.nicknameEditDone = false;
        draft.nicknameEditError = null;
        break;      
      case NICKNAME_EDIT_SUCCESS:
        draft.me.nickname = action.data.nickname;
        draft.nicknameEditLoading = false;
        draft.nicknameEditDone = true;
        break;        
      case NICKNAME_EDIT_FAILURE:
        draft.nicknameEditLoading = false;
        draft.nicknameEditError = action.error;
        break;    
      case REMOVE_POST_OF_MYPAGE: {
        const likedPost = draft.likedPosts.find((v) => v.id === action.data.PostId);
        const boardPost = draft.boardPosts.find((v) => v.id === action.data.PostId);
        if (likedPost) draft.likedPosts = draft.likedPosts.filter((v) => v.id !== action.data.PostId);
        if (boardPost) draft.boardPosts = draft.boardPosts.filter((v) => v.id !== action.data.PostId);
        break;
      }
      case ADD_LIKED_POST_OF_MYPAGE: {
        draft.likedPosts.unshift(action.data.Post);
        const likedPost = draft.likedPosts.find((v) => v.id === action.data.PostId);
        const boardPost = draft.boardPosts.find((v) => v.id === action.data.PostId);
        if (likedPost) likedPost.Likers.push({ id: action.data.UserId });
        if (boardPost) boardPost.Likers.push({ id: action.data.UserId });
        break;
      }        
      case REMOVE_LIKED_POST_OF_MYPAGE: {
        draft.likedPosts = draft.likedPosts.filter((v) => v.id !== action.data.PostId);
        const likedPost = draft.likedPosts.find((v) => v.id === action.data.PostId);
        const boardPost = draft.boardPosts.find((v) => v.id === action.data.PostId);
        if (likedPost) likedPost.Likers = likedPost.Likers.filter((v) => v.id !== action.data.UserId);          
        if (boardPost) boardPost.Likers = boardPost.Likers.filter((v) => v.id !== action.data.UserId);          
        break;
      }
      case ADD_COMMENT_POST_OF_MYPAGE: {
        const likedPost = draft.likedPosts.find((v) => v.id === action.data.PostId);
        const boardPost = draft.boardPosts.find((v) => v.id === action.data.PostId);
        if (likedPost) likedPost.Comments.unshift(action.data);
        if (boardPost) boardPost.Comments.unshift(action.data);
        break;
      }
      case REMOVE_COMMENT_POST_OF_MYPAGE: {
        const likedPost = draft.likedPosts.find((v) => v.id === action.data.PostId);
        const boardPost = draft.boardPosts.find((v) => v.id === action.data.PostId);
        if (likedPost) likedPost.Comments = likedPost.Comments.filter((v) => v.id !== action.data.CommentId);        
        if (boardPost) boardPost.Comments = boardPost.Comments.filter((v) => v.id !== action.data.CommentId);        
        break;
      }
      case CONTACT_FORM_VISIBLE:
        draft.contactFormVisible = true;
        break;
      case CONTACT_FORM_INVISIBLE:
        draft.contactFormVisible = false;
        break;
      default:
        break;
    }
  });
};

export default reducer;