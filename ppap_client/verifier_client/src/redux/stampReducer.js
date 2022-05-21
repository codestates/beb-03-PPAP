// 액션
const SET_STAMP = "SET_STAMP";
const UNSET_STAMP = "UNSET_STAMP";

// 액션 생성 함수
export const setStamp = (data) => {
  return {
    type: SET_STAMP,
    data,
  };
};

export const unsetStamp = () => {
  return {
    type: UNSET_STAMP,
  };
};

// 초기 상태
const initialState = {
  data: null,
};

// 리듀서 함수
function stampReducer(state = initialState, action) {
  switch (action.type) {
    case SET_STAMP:
      return {
        data: action.data,
      };
    case UNSET_STAMP:
      return {
        data: null,
      };
    default:
      return state;
  }
}

export default stampReducer;