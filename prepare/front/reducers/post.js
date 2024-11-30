export const initialState = {
    mainPosts: [{
        id:1,
        User:{
            id:1,
            nickname:'승수',
        },
        content:'첫 번째 게시글 #해시태그 ㅇㅇ',
        Images:[
            { src:'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726' },
            { src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3UA9mvWj116vXtjJlpjHK1_Oqvd6Lze-eQ&s' },
            { src:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg3UA9mvWj116vXtjJlpjHK1_Oqvd6Lze-eQ&s' },
        ],
        Comments:[{
            User:{
                nickname:'승수',
            },
            content:'내용내용',
        }],
    }],
    imagePaths:[],
    addPostLoading: false, // 글 추가 시도중
    addPostComplete: false,
    addPostError: null,
    addCommentLoading: false, // 글 추가 시도중
    addCommentComplete: false,
    addCommentError: null,
}

// action
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPostAction = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addCommentAction = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});


const dummyPost = {
    id:2,
    User:{
        id:1,
        nickname:'승수',
    },
    content:'첫 번째 게시글 #해시태그 ㅇㅇ',
    Images:[],
    Comments:[],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostComplete: false,
                addPostError: null,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts], // 앞에 추가해야 게시글 위에 추가가 됨
                addPostLoading: false,
                addPostComplete: true,
            };
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.payload,
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentComplete: false,
                addCommentError: null,
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentLoading: false,
                addCommentComplete: true,
            };
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.payload,
            }
        default:
            return state;
    }
};

export default reducer;