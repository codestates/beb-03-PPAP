// 액션
const SET_PASSPORT_STATUS = "SET_PASSPORT_STATUS";
const UNSET_PASSPORT_STATUS = "UNSET_PASSPORT_STATUS";

// 액션 생성 함수
export const setPassportStatus = (data: number) => {
  return {
    type: SET_PASSPORT_STATUS,
    data,
  };
};

export const unsetPassportStatus = () => {
  return {
    type: UNSET_PASSPORT_STATUS,
  };
};

// 초기 상태
const initialState = {
  data: null,
};

// 리듀서 함수
function passportStatusReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PASSPORT_STATUS:
      return {
        data: action.data,
      };
    case UNSET_PASSPORT_STATUS:
      return {
        data: null,
      };
    default:
      return state;
  }
}

export default passportStatusReducer;
