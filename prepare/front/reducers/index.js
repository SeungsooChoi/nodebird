import { HYDRATE } from "next-redux-wrapper";
import {combineReducers} from "redux";
import user from "./user";
import post from "./post";

// 이전 상태와 action을 통해 다음 상태를 만들어내는 함수
const rootReducer = combineReducers({
  // HYDRATE를 위해서 index reducer 추가함.(SSR)
  index:(state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log("HYDRATE ::: ", HYDRATE);
        return {...state,...action.payload};
      default:
        return state;
    }
  },
  user,
  post,
})

export default rootReducer;
