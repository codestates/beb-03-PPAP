import { combineReducers } from "redux";
import userReducer from "./userReducer";
import passportReducer from "./passportReducer";
import visaReducer from "./visaReducer";
import stampReducer from "./stampReducer";

const rootReducer = combineReducers({
  userReducer,
  passportReducer,
  visaReducer,
  stampReducer
});

export default rootReducer;