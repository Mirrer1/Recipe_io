import produce from '../util/produce';

export const initialState = {
  previewImagePaths: null,
  editImagePaths: [],    
  imagePaths: [],
  topPosts: [],
  recentPosts: [],
  singlePost: null,  
  postModalVisible: false, // 게시글 모달창 띄우기
  postDeleteModalVisible: false, // 게시글 삭제 모달창 띄우기
  commentDeleteModalVisible: false, // 댓글 삭제 모달창 띄우기
  deleteCliked: false, // 삭제버튼 클릭
  moveToComment: false, // 댓글창으로 이동
  loadTopPostsLoading: false, // 인기 게시글 불러오기
  loadTopPostsDone: false,
  loadTopPostsError: null,
  loadRecentPostsLoading: false, // 최근 게시글 불러오기
  loadRecentPostsDone: false,
  loadRecentPostsError: null,
  loadPostLoading: false, // 단일 게시글 불러오기
  loadPostDone: false,
  loadPostError: null,
  hasMorePosts: true, // 스크롤 이벤트 게시글 불러오기
  uploadImagesLoading: false, // 이미지 업로드
  uploadImagesDone: false,
  uploadImagesError: null,
  addPostLoading: false, // 게시글 추가 
  addPostDone: false,
  addPostError: null,
  editPostLoading: false, // 게시글 수정
  editPostDone: false,
  editPostError: null,
  editPost: null, // 수정할 게시글
  deletePost: null, // 삭제할 게시글
  removePostLoading: false, // 게시글 제거
  removePostDone: false,
  removePostError: null,  
  likePostLoading: false, // 게시글 좋아요
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false, // 게시글 좋아요 취소
  unLikePostDone: false,
  unLikePostError: null,  
  addCommentLoading: false, // 댓글 추가
  addCommentDone: false,
  addCommentError: null,
  editComment: null, // 수정할 댓글
  editCommentLoading: false, // 댓글 수정
  editCommentDone: false,
  editCommentError: null,
  removeCommentLoading: false, // 댓글 제거
  removeCommentDone: false,
  removeCommentError: null,
  deleteComment: null, // 삭제할 댓글  
  reportInfo: null, // 신고 게시글 또는 댓글정보
  reportModalVisible: false, // 신고 모달창 띄우기
};

export const VISIBLE_POST_MODAL = 'VISIBLE_POST_MODAL';
export const INVISIBLE_POST_MODAL = 'INVISIBLE_POST_MODAL';

export const VISIBLE_POST_DELETE_MODAL = 'VISIBLE_POST_DELETE_MODAL';
export const INVISIBLE_POST_DELETE_MODAL = 'INVISIBLE_POST_DELETE_MODAL';
export const CLICKED_DELETE_BUTTON = 'CLICKED_DELETE_BUTTON';

export const VISIBLE_COMMENT_DELETE_MODAL = 'VISIBLE_COMMENT_DELETE_MODAL';
export const INVISIBLE_COMMENT_DELETE_MODAL = 'INVISIBLE_COMMENT_DELETE_MODAL';

export const MOVE_TO_COMMENT = 'MOVE_TO_COMMENT';
export const RETURN_FROM_COMMENT = 'RETURN_FROM_COMMENT';

export const LOAD_TOP_POSTS_REQUEST = 'LOAD_TOP_POSTS_REQUEST';
export const LOAD_TOP_POSTS_SUCCESS = 'LOAD_TOP_POSTS_SUCCESS';
export const LOAD_TOP_POSTS_FAILURE = 'LOAD_TOP_POSTS_FAILURE';

export const LOAD_RECENT_POSTS_REQUEST = 'LOAD_RECENT_POSTS_REQUEST';
export const LOAD_RECENT_POSTS_SUCCESS = 'LOAD_RECENT_POSTS_SUCCESS';
export const LOAD_RECENT_POSTS_FAILURE = 'LOAD_RECENT_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'LOAD_HASHTAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'LOAD_HASHTAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'LOAD_HASHTAG_POSTS_FAILURE';

export const EDIT_POST_UPLOAD_IMAGES = 'EDIT_POST_UPLOAD_IMAGES';
export const CHANGE_EDIT_POST_IMAGES = 'CHANGE_EDIT_POST_IMAGES';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';
export const IMAGES_PREVIEW = 'IMAGES_PREVIEW';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const EDIT_POST_REQUEST = 'EDIT_POST_REQUEST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';

export const MOVE_TO_EDIT_POST = 'MOVE_TO_EDIT_POST';
export const RETURN_FROM_EDIT_POST = 'RETURN_FROM_EDIT_POST';

export const RESET_REMOVE_POST_STATE = 'RESET_REMOVE_POST_STATE';
export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const RESET_LIKE_STATE = 'RESET_LIKE_STATE';
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const RESET_UNLIKE_STATE = 'RESET_UNLIKE_STATE';
export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const RESET_ADD_COMMENT_STATE = 'RESET_ADD_COMMENT_STATE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const VISIBLE_EDIT_COMMENT = 'VISIBLE_EDIT_COMMENT';
export const INVISIBLE_EDIT_COMMENT = 'INVISIBLE_EDIT_COMMENT';

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

export const RESET_REMOVE_COMMENT_STATE = 'RESET_REMOVE_COMMENT_STATE';
export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

export const REPORT_MODAL_VISIBLE = 'REPORT_MODAL_VISIBLE';
export const REPORT_MODAL_INVISIBLE = 'REPORT_MODAL_INVISIBLE';

export const visiblePostModalAction = () => {  
  return {
    type: VISIBLE_POST_MODAL,
  }
};

export const invisiblePostModalAction = () => {  
  return {
    type: INVISIBLE_POST_MODAL,
  }
};

export const visiblePostDeleteModalAction = (data) => {  
  return {
    type: VISIBLE_POST_DELETE_MODAL,
    data,
  }
};

export const invisiblePostDeleteModalAction = () => {  
  return {
    type: INVISIBLE_POST_DELETE_MODAL,
  }
};

export const clickedDeleteButtonAction = () => {  
  return {
    type: CLICKED_DELETE_BUTTON,
  }
};

export const moveToCommentRequestAction = () => {    
  return {
    type: MOVE_TO_COMMENT,    
  } 
};

export const returnFromCommentRequestAction = () => {    
  return {
    type: RETURN_FROM_COMMENT,    
  } 
};

export const loadPostRequestAction = (data) => {  
  return {
    type: LOAD_POST_REQUEST,
    data,
  }
};

export const moveToEditPostRequestAction = (data) => {  
  return {
    type: MOVE_TO_EDIT_POST,
    data,
  }
};

export const removePostRequestAction = (data) => {  
  return {
    type: REMOVE_POST_REQUEST,
    data,
  }
};

export const likePostRequestAction = (data) => {  
  return {
    type: LIKE_POST_REQUEST,
    data,
  }
};

export const unLikePostRequestAction = (data) => {  
  return {
    type: UNLIKE_POST_REQUEST,
    data,
  }
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {     
      case VISIBLE_POST_MODAL:
        draft.postModalVisible = true;
        break;
      case INVISIBLE_POST_MODAL:
        draft.postModalVisible = false;
        draft.singlePost = null;
        break;
      case VISIBLE_POST_DELETE_MODAL:
        draft.postDeleteModalVisible = true; 
        draft.deletePost = action.data;       
        break;
      case INVISIBLE_POST_DELETE_MODAL:
        draft.postDeleteModalVisible = false;        
        draft.deletePost = null;
        break;
      case VISIBLE_COMMENT_DELETE_MODAL:
        draft.commentDeleteModalVisible = true;
        draft.deleteComment = action.data;       
        break;
      case INVISIBLE_COMMENT_DELETE_MODAL:
        draft.commentDeleteModalVisible = false;
        draft.deleteComment = null;       
        break;
      case CLICKED_DELETE_BUTTON:
        draft.deleteCliked = true;                
        break;
      case MOVE_TO_COMMENT:
        draft.moveToComment = true;
        break;     
      case RETURN_FROM_COMMENT:
        draft.moveToComment = false;        
        break;     
      case LOAD_TOP_POSTS_REQUEST:
        draft.loadTopPostsLoading = true;
        draft.loadTopPostsDone = false;
        draft.loadTopPostsError = null;
        break;
      case LOAD_TOP_POSTS_SUCCESS:
        draft.topPosts = action.data;
        draft.loadTopPostsLoading = false;
        draft.loadTopPostsDone = true;
        break;
      case LOAD_TOP_POSTS_FAILURE:
        draft.loadTopPostsLoading = false;
        draft.loadTopPostsError = action.error;
        break;
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_RECENT_POSTS_REQUEST:
        draft.loadRecentPostsLoading = true;
        draft.loadRecentPostsDone = false;
        draft.loadRecentPostsError = null;
        break;
      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_RECENT_POSTS_SUCCESS:
        draft.recentPosts = draft.recentPosts.concat(action.data);
        draft.hasMorePosts = action.data.length === 10;
        draft.loadRecentPostsLoading = false;
        draft.loadRecentPostsDone = true;
        break;
      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_RECENT_POSTS_FAILURE:
        draft.loadRecentPostsLoading = false;
        draft.loadRecentPostsError = action.error;
        break;              
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.singlePost = action.data;
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;        
      case EDIT_POST_UPLOAD_IMAGES:
        draft.editImagePaths = action.data;
        break;
      case CHANGE_EDIT_POST_IMAGES:
        draft.editImagePaths = action.data;
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:        
        draft.imagePaths = action.data;
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;        
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case IMAGES_PREVIEW:
        const combinePaths = draft?.editImagePaths.concat(draft.imagePaths);
        const result = combinePaths.filter((v) => v.split('.')[0].split('_')[0] === action.data.split('.')[0].split('_')[0]);
        result.length > 1 ? draft.previewImagePaths = result[0] : draft.previewImagePaths = result;        
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:        
        draft.recentPosts.unshift(action.data);
        draft.imagePaths = [];
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case EDIT_POST_REQUEST:
        draft.editPostLoading = true;
        draft.editPostDone = false;
        draft.editPostError = null;
        break;
      case EDIT_POST_SUCCESS:
        draft.editPostLoading = false;
        draft.editPostDone = true;
        break;
      case EDIT_POST_FAILURE:
        draft.editPostLoading = false;
        draft.editPostError = action.error;
        break;
      case MOVE_TO_EDIT_POST:
        draft.editPost = action.data;
        draft.singlePost = null;
        break;        
      case RETURN_FROM_EDIT_POST:
        draft.editPost = null;        
        break;
      case RESET_REMOVE_POST_STATE:
        draft.removePostLoading = false; 
        draft.removePostDone = false;
        draft.removePostError = null; 
        break;      
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS: {
        const topPost = draft.topPosts.find((v) => v.id === action.data.PostId);
        const recentPost = draft.recentPosts.find((v) => v.id === action.data.PostId);                
        if (topPost) draft.topPosts = draft.topPosts.filter((v) => v.id !== action.data.PostId);
        if (recentPost) draft.recentPosts = draft.recentPosts.filter((v) => v.id !== action.data.PostId);                
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.postDeleteModalVisible = false;        
        draft.postModalVisible = false;
        draft.deleteCliked = false;  
      }
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case RESET_LIKE_STATE:
          draft.likePostLoading = false;
          draft.likePostDone = false;
          draft.likePostError = null;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {          
        const topPost = draft.topPosts.find((v) => v.id === action.data.PostId);
        const recentPost = draft.recentPosts.find((v) => v.id === action.data.PostId);                    
        if (topPost) topPost.Likers.push({ id: action.data.UserId });                    
        if (recentPost) recentPost.Likers.push({ id: action.data.UserId });                   
        if (draft.singlePost) draft.singlePost.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case RESET_UNLIKE_STATE:
          draft.unLikePostLoading = false;
          draft.unLikePostDone = false;
          draft.unLikePostError = null;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unLikePostLoading = true;
        draft.unLikePostDone = false;
        draft.unLikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {          
          const topPost = draft.topPosts.find((v) => v.id === action.data.PostId);
          const recentPost = draft.recentPosts.find((v) => v.id === action.data.PostId);                    
          if (topPost) topPost.Likers = topPost.Likers.filter((v) => v.id !== action.data.UserId);
          if (recentPost) recentPost.Likers = recentPost.Likers.filter((v) => v.id !== action.data.UserId);                   
          if (draft.singlePost) draft.singlePost.Likers = draft.singlePost.Likers.filter((v) => v.id !== action.data.UserId);                    
          draft.unLikePostLoading = false;
          draft.unLikePostDone = true;
          break;
        }
      case UNLIKE_POST_FAILURE:
        draft.unLikePostLoading = false;
        draft.unLikePostError = action.error;
        break;
      case RESET_ADD_COMMENT_STATE:
        draft.addCommentLoading = false;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;  
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;   
        break;     
      case ADD_COMMENT_SUCCESS: {
        const topPost = draft.topPosts.find((v) => v.id === action.data.PostId);
        const recentPost = draft.recentPosts.find((v) => v.id === action.data.PostId);                
        if (topPost) topPost.Comments.unshift(action.data);
        if (recentPost) recentPost.Comments.unshift(action.data);      
        if (draft.singlePost) draft.singlePost.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;      
        break;  
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;   
      case VISIBLE_EDIT_COMMENT:
        draft.editComment = action.data;
        break;   
      case INVISIBLE_EDIT_COMMENT:
        draft.editComment = null;
        break;
      case EDIT_COMMENT_REQUEST:
        draft.editCommentLoading = true;
        draft.editCommentDone = false;
        draft.editCommentError = null;
        break;
      case EDIT_COMMENT_SUCCESS: 
        const comment = draft.singlePost.Comments.find((v) => v.id === action.data.id);
        comment.content = action.data.content;
        draft.editCommentLoading = false;
        draft.editCommentDone = true;                
        break;      
      case EDIT_COMMENT_FAILURE:
        draft.editCommentLoading = false;
        draft.editCommentError = action.error;
        break;
      case RESET_REMOVE_COMMENT_STATE:
        draft.removeCommentLoading = false;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
      case REMOVE_COMMENT_REQUEST:
        draft.removeCommentLoading = true;
        draft.removeCommentDone = false;
        draft.removeCommentError = null;
        break;
      case REMOVE_COMMENT_SUCCESS: {
        const topPost = draft.topPosts.find((v) => v.id === action.data.PostId);
        const recentPost = draft.recentPosts.find((v) => v.id === action.data.PostId);                
        if (topPost) topPost.Comments = topPost.Comments.filter((v) => v.id !== action.data.CommentId);
        if (recentPost) recentPost.Comments = recentPost.Comments.filter((v) => v.id !== action.data.CommentId);               
        if (draft.singlePost) draft.singlePost.Comments = draft.singlePost.Comments.filter((v) => v.id !== action.data.CommentId);        
        draft.removeCommentLoading = false;
        draft.removeCommentDone = true;        
        draft.commentDeleteModalVisible = false;                
        draft.deleteCliked = false;  
        break;
      }
      case REMOVE_COMMENT_FAILURE:
        draft.removeCommentLoading = false;
        draft.removeCommentError = action.error;
        break;
      case REPORT_MODAL_VISIBLE:
        draft.reportModalVisible = true;
        draft.reportInfo = action.data;
        break;
      case REPORT_MODAL_INVISIBLE:
        draft.reportModalVisible = false;        
        break;
      default:
        break;
    }
  });
};

export default reducer;