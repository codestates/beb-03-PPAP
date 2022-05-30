import { combineReducers } from "redux";
import userReducer from "./userReducer";
import passportReducer from "./passportReducer";
import visaReducer from "./visaReducer";
import stampReducer from "./stampReducer";
import immigrationReducer from "./immigrationReducer";

const rootReducer = combineReducers({
  userReducer,
  passportReducer,
  visaReducer,
  stampReducer,
  immigrationReducer
});

export default rootReducer;