// 액션
const SET_SPINNER_STATUS = "SET_SPINNER_STATUS";

// 액션 생성 함수
export const setSpinnerStatus = (data) => {
  return {
    type: SET_SPINNER_STATUS,
    data,
  };
};

// 초기 상태
const initialState = {
  data: false,
};

// 리듀서 함수
function spinnerReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SPINNER_STATUS:
      return {
        data: action.data,
      };
    default:
      return state;
  }
}

export default spinnerReducer;
