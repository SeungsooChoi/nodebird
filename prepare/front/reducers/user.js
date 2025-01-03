import { produce } from 'immer';

export const initialState = {
    logInLoading: false, // 로그인 시도중
    logInComplete: false,
    logInError: null,
    logOutLoading: false, // 로그아웃 시도중
    logOutComplete: false,
    logOutError: null,
    signUpLoading: false, // 회원가입 시도중
    signUpComplete: false,
    signUpError: null,
    changeNicknameLoading: false, // 닉네임 변경 시도중
    changeNicknameComplete: false,
    changeNicknameError: null,
    followLoading: false, // 팔로우 시도중
    followError: false,
    followDone: null,
    unFollowLoading: false, // 언팔로우 시도중
    unFollowError: false,
    unFollowDone: null,
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

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

const dummyUser = (data)=> ({
    ...data,
    nickname: '승수',
    id:1,
    Posts:[{ id: 1 }],
    Followings: [{ nickname: '승수1' }, { nickname: '승수3' }],
    Followers: [{ nickname: '승수2' }, { nickname: '승수4' }, { nickname: '승수5' }],
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
    return produce(state, (draft) => {
        switch (action.type) {
            case FOLLOW_REQUEST:
                draft.followLoading = true;
                draft.followError = null;
                draft.followDone = false;
                break;
            case FOLLOW_SUCCESS:
                draft.followLoading = false;
                draft.followComplete = true;
                draft.me.Followings.push({ id: action.data });
                break;
            case FOLLOW_FAILURE:
                draft.followLoading = false;
                draft.followError = action.error;
                break;
            case UNFOLLOW_REQUEST:
                draft.unFollowLoading = true;
                draft.unFollowError = null;
                draft.unFollowDone = false;
                break;
            case UNFOLLOW_SUCCESS:
                draft.unFollowLoading = false;
                draft.unFollowComplete = true;
                draft.me.Followings = draft.me.Followings.filter((v, i) => v.id !== action.data);
                break;
            case UNFOLLOW_FAILURE:
                draft.unFollowLoading = false;
                draft.unFollowError = action.error;
                break;
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS:
                draft.logInLoading = false;
                draft.logInComplete = true;
                draft.me = dummyUser(action.data);
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutError = null;
                draft.logOutDone = false;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutComplete = true;
                draft.me = null;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpError = null;
                draft.signUpDone = false;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpLoading = false;
                draft.signUpComplete = true;
                draft.me = null;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
            case CHANGE_NICKNAME_REQUEST:
                draft.changeNicknameLoading = true;
                draft.changeNicknameError = null;
                draft.changeNicknameDone = false;
                break;
            case CHANGE_NICKNAME_SUCCESS:
                draft.changeNicknameLoading = false;
                draft.changeNicknameComplete = true;
                draft.me = null;
                break;
            case CHANGE_NICKNAME_FAILURE:
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            case ADD_POST_TO_ME:
                draft.me.Posts.unshift({ id: action.data });
                // me: {
                //     ...state.me,
                //     Posts: [{ id: action.data }, ...state.me.Posts],
                // }
                break;
            case REMOVE_POST_OF_ME:
                draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
                // me: {
                //     ...state.me,
                //     Posts: state.me.Posts.filter((v) => v.id !== action.data),
                // }
                break;
            default:
                break;
        }
    });
};

export default reducer;