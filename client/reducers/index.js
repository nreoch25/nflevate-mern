import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import gistsReducer from "./GistsReducer";
import authReducer from "./AuthReducer";
import groupsReducer from "./GroupsReducer";

export default combineReducers({
  form: formReducer,
  gists: gistsReducer,
  auth: authReducer,
  groups: groupsReducer
});
