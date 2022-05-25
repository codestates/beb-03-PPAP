import { combineReducers } from "redux";
import userReducer from "./userReducer";
import spinnerReducer from "./spinnerReducer";
import passportStatusReducer from "./passportStatusReducer";

const rootReducer = combineReducers({
  userReducer,
  spinnerReducer,
  passportStatusReducer,
});

export default rootReducer;
