export const initialState = {
    logInLoading: false, // 로그인 시도중
    logInComplete: false,
    logInError: false,
    logOutLoading: false, // 로그아웃 시도중
    logOutComplete: false,
    logOutError: false,
    signUpLoading: false, // 회원가입 시도중
    signUpComplete: false,
    signUpError: false,
    me: null,
    signUpData: {},
    logInData: {},
}

// type
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const dummyUser = (data)=> ({
    ...data,
    nickname: '승수',
    id:1,
    Posts:[],
    Followings: [],
    Followers: [],
})

// action Creator
// SUCCESS, FAILURE 는 saga에서 호출함.
export const logInRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data,
    };
};

export const logOutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...state,
                logInLoading: true,
                logInError: null,
                logInDone: false,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                logInLoading: false,
                logInComplete: true,
                me: dummyUser(action.data),
            };
        case LOG_IN_FAILURE:
            return {
                ...state,
                logInLoading: false,
                logInError: action.error,
            };
        case LOG_OUT_REQUEST:
            return {
                ...state,
                logOutLoading: true,
                logOutError: null,
                logOutDone: false,
            };
        case LOG_OUT_SUCCESS:
            return {
                ...state,
                logOutLoading: false,
                logOutComplete: true,
                me: null,
            };
        case LOG_OUT_FAILURE:
            return {
                ...state,
                logOutLoading: false,
                logOutError: action.error,
            };
        default:
            return state;
    }
}

export default reducer;