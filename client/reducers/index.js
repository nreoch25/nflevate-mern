import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./AuthReducer";
import groupsReducer from "./GroupsReducer";

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  groups: groupsReducer
});
