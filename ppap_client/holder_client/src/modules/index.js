import { combineReducers } from "redux";
import userReducer from "./userReducer";
import spinnerReducer from "./spinnerReducer";

const rootReducer = combineReducers({
  userReducer,
  spinnerReducer,
});

export default rootReducer;
