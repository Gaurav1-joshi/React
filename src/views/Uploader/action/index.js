import {
    
    // BUSINESS_NAME_API,
    // checkHttpStatus,
    // FORGOT_PASSWORD_API,
    // handleFirstLoginAfterSignUp,
    // handleLoginRedirect,
    // handleLogoutRedirect,
    // handleRefreshTokenRedirect,
    // handleSecurityQuestionRedirect,
    // jsonApiHeader,
    UPLOAD_API,
    uploadActionTypes,
    // REFRESH_TOKEN,
    // RESET_PASSWORD_API,
  } from '../constants';
  import { GlobalVariables, calculateLocalTimeZone, actionCreator, checkHttpStatus, handleLoginRedirect, handleSecurityQuestionRedirect, handleFirstLoginAfterSignUp, jsonApiHeader, showErrorMessage,showSuccessMessage, } from '../../../actions/utilAction';
  


  export const handleUploadClick = (formData) => { 
    return (dispatch, getState) => {
      dispatch(actionCreator(uploadActionTypes.upload_files.REQUEST));
      let requestType = 'POST';
      let idUrl = `${UPLOAD_API}`;
 
      let fetchAPI = `${idUrl}`;
 
      fetch(fetchAPI, {
        method: requestType,
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'multipart/form-data' }
      })
       .then(checkHttpStatus)
       .then(function(response) {
         //   // .log(response);
         if (response) {
           if (response.statusCode >= 400 && response.statusCode < 500 && response.message) {
             showErrorMessage(response.message);
             dispatch(actionCreator(uploadActionTypes.upload_files.SUCCESS, {}));
           } else if (response.statusCode >= 200 && response.statusCode < 300) {
             showSuccessMessage(response.message);
             dispatch(actionCreator(uploadActionTypes.upload_files.SUCCESS, response));
            //  browserHistory.push('/login');            
           }
         }
       })
       .catch(function(error) {
         showErrorMessage('Oops, something went wrong, please try later');
         dispatch(actionCreator(uploadActionTypes.upload_files.SUCCESS, {}));
         //   // .log('-----f-ds-f-dsf-ds-f-ds-f-dfsdf-serror: ', error);
       });
    };
  };

