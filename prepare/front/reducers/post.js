import shortId from "shortid";
import { produce } from "immer";
import { faker } from "@faker-js/faker";
import shortid from "shortid";

export const initialState = {
    // 대문자는 서버에서 주는 값
    mainPosts: [],
    imagePaths:[],
    hasMorePosts: true,
    loadPostLoading: false, // 글 로드 시도중
    loadPostComplete: false,
    loadPostError: null,
    addPostLoading: false, // 글 추가 시도중
    addPostComplete: false,
    addPostError: null,
    removePostLoading: false, // 글 삭제 시도중
    removePostComplete: false,
    removePostError: null,
    addCommentLoading: false, // 글 추가 시도중
    addCommentComplete: false,
    addCommentError: null,
}

faker.seed(123);

export const generateDummyPosts = (number) => Array(number).fill().map((v, i) => ({
    id: shortid.generate(),
    User:{
        id: shortid.generate(),
        nickname: faker.internet.username()
    },
    content: faker.lorem.paragraph(),
    Images:[{
        src: faker.image.url(),
    }],
    Comments:[{
        User: {
            id: shortid.generate(),
            nickname: faker.internet.username()
        },
        content: faker.lorem.sentence(),
    }],
}));

// action
export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostAction = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const removePostAction = (data) => ({
    type: REMOVE_POST_REQUEST,
    data,
});

export const addCommentAction = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});


const dummyPost = (data) => ({
    id:data.id,
    User:{
        id:1,
        nickname:'승수',
    },
    content: data.content,
    Images:[],
    Comments:[],
});

const dummyComment = (data) => ({
    id:shortId.generate(),
    content: data,
    User:{
        id:1,
        nickname:'승수',
    },
});

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수
const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostComplete = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS:
                draft.loadPostLoading = false;
                draft.loadPostComplete = true;
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.hasMorePosts = draft.mainPosts.length <= 50; // 50개만
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.payload;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostComplete = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostComplete = true;
                draft.mainPosts.unshift(dummyPost(action.data));
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.payload;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostComplete = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostComplete = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.payload;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentComplete = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS:{
                const post = draft.mainPosts.find((post) => post.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentComplete = true;
                break;
                // const postIndex = state.mainPosts.findIndex(post => post.id === action.data.postId);
                // const post = {...state.mainPosts[postIndex]};
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
                //
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentComplete: true,
                // };
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.payload;
                break;
            default:
                break;
        }
    });
};

export default reducer;