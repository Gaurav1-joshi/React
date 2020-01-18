import { combineReducers } from 'redux';
import setting from '../views/Pages/Login/reducer/LoginReducer';
import upload from '../views/Uploader/reducers'
const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_USER_SUCCESS') {
    state = undefined
  }
  return appReducer(state, action);
};

const appReducer = combineReducers({
    login: setting,
    uploadReducers: upload,

});

export default rootReducer;
