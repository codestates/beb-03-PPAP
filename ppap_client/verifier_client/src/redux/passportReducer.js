// 액션
const SET_PASSPORT = "SET_PASSPORT";
const UNSET_PASSPORT = "UNSET_PASSPORT";

// 액션 생성 함수
export const setPassport = (data) => {
  return {
    type: SET_PASSPORT,
    data,
  };
};

export const unsetPassport = () => {
  return {
    type: UNSET_PASSPORT,
  };
};

// 초기 상태
const initialState = {
  data: null,
};

// 리듀서 함수
function passportReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PASSPORT:
      return {
        data: action.data,
      };
    case UNSET_PASSPORT:
      return {
        data: null,
      };
    default:
      return state;
  }
}

export default passportReducer;