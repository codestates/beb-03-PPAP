import { combineReducers } from "redux";
import userReducer from "./userReducer";
import passportReducer from "./passportReducer";

const rootReducer = combineReducers({
  userReducer,
  passportReducer
});

export default rootReducer;