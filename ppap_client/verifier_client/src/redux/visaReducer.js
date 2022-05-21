// 액션
const SET_VISA = "SET_VISA";
const UNSET_VISA = "UNSET_VISA";

// 액션 생성 함수
export const setVisa = (data) => {
  return {
    type: SET_VISA,
    data,
  };
};

export const unsetVisa = () => {
  return {
    type: UNSET_VISA,
  };
};

// 초기 상태
const initialState = {
  data: null,
};

// 리듀서 함수
function visaReducer(state = initialState, action) {
  switch (action.type) {
    case SET_VISA:
      return {
        data: action.data,
      };
    case UNSET_VISA:
      return {
        data: null,
      };
    default:
      return state;
  }
}

export default visaReducer;