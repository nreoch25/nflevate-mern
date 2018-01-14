import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import gistsReducer from "./GistsReducer";
import authReducer from "./AuthReducer";

export default combineReducers({
  form: formReducer,
  gists: gistsReducer,
  auth: authReducer
});
