// 액션
const SET_IMMIGRATION = "SET_IMMIGRATION";
const UNSET_IMMIGRATION = "UNSET_IMMIGRATION";

// 액션 생성 함수
export const setImmigration = (data) => {
  return {
    type: SET_IMMIGRATION,
    data,
  };
};

export const unsetImmigration = () => {
  return {
    type: UNSET_IMMIGRATION,
  };
};

// 초기 상태
const initialState = {
  data: null,
};

// 리듀서 함수
function ImmigrationReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IMMIGRATION:
      return {
        data: action.data,
      };
    case UNSET_IMMIGRATION:
      return {
        data: null,
      };
    default:
      return state;
  }
}

export default ImmigrationReducer;