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
    LOGIN_API,
    loginActionTypes,
    // REFRESH_TOKEN,
    // RESET_PASSWORD_API,
  } from '../constants/ApiConstants';
  import { actionCreator, checkHttpStatus, jsonApiHeader, showErrorMessage,showSuccessMessage, } from '../../../../actions/utilAction';
  


  export const loginAction = (formData) => {
    return (dispatch, getState) => {
      dispatch(actionCreator(loginActionTypes.post_login.REQUEST));
      let requestType = 'POST';
      let idUrl = `${LOGIN_API}`;
 
     // let saveData = JSON.stringify({
      let data = {
        'userName': formData.userName ? formData.userName : null,
        'password': formData.password ? formData.password : null,
        'ipAddress': '123',
      };
 
      let fetchAPI = `${idUrl}`;
 
      fetch(fetchAPI, {
        method: requestType,
        body: JSON.stringify(data),
        headers: jsonApiHeader(getState().login.access_token, 'application/json'),
      })
       .then(checkHttpStatus)
       .then(function(response) {
         //   // .log(response);
         if (response) {
           if (response.statusCode >= 400 && response.statusCode < 500 && response.message) {
             showErrorMessage(response.message);
             dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, {}));
           } else if (response.statusCode >= 200 && response.statusCode < 300) {
             showSuccessMessage(response.message);
             dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, response));
            //  browserHistory.push('/login');            
           }
         }
       })
       .catch(function(error) {
         showErrorMessage('Oops, something went wrong, please try later');
         dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, {}));
         //   // .log('-----f-ds-f-dsf-ds-f-ds-f-dfsdf-serror: ', error);
       });
    };
  };



  // export function loginAction(authData) { 
  //   authData.ipAddress='123';
  //  // var url = $`http://www.pyleaudio.com/siteadmin3/checkloginapi.aspx?username=`authData.userName$`&password=`.urlencode($password).$`&IPAddress=`.$_SERVER['REMOTE_ADDR'];
  //   // authData.businessToken = businessNameCheck;
  //   return (dispatch) => {
  //         dispatch(actionCreator(loginActionTypes.post_login.REQUEST));
  //     fetch(`${LOGIN_API}`, {
  //       method: 'POST',
  //       body: JSON.stringify(authData),
  //       headers: {
  //         'Content-Type': 'application/json',
  //         //'businessToken': businessNameCheck,
  //       },
  //     })
  //       .then(checkHttpStatus)
  //       .then(function(response) {
  //         console.log("response---------",response)
        
  //         if (response.statusCode == '200') {
  //           let errorMessage = 'Invalid username or password';                        
  //           dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, { authenticating: true, errorMessage: errorMessage, access_token: null, loginUserInfo: null, organization: null }));                        
  //           // this.history.pushState(null, 'dashboard');            
  //         }
  //         else {
  //           let errorMessage = 'Invalid username or password';            
  //           dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, { errorMessage: errorMessage, access_token: null, loginUserInfo: null, organization: null }));            
  //         }
  //       }).catch(function(error) {
          
  //         // console.warn('error logs: ', error);
  //         let errorMessage = 'Invalid username or password';
  //         dispatch(actionCreator(loginActionTypes.post_login.FAILURE, { errorMessage: errorMessage, access_token: null, loginUserInfo: null, organization: null }));
  //       });
  //   };
  // }
  
  
//   export function logoutAction() {
//     return (dispatch) => {
//       dispatch(actionCreator(loginActionTypes.logout_user.SUCCESS));
//       handleLogoutRedirect('/login');
//     };
//   }
  
//   export function refreshAuthToken(old_token, prevUrl) {
//     return (dispatch) => {
//       dispatch(actionCreator(loginActionTypes.refresh_token.REQUEST));
//       fetch(`${REFRESH_TOKEN}`, {
//         method: 'get',
//         headers: jsonApiHeader(old_token, 'application/json'),
//       })
//         .then(checkHttpStatus)
//         .then(function(response) {
//           if (response.access_token) {
//             if (response.data && response.data.roleName && response.data.roleName.toUpperCase() === 'SUPERADMIN') {
//               let userPermission = response.userPermission;
//               dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, { errorMessage: null, currentLocationId: null, access_token: response.access_token, loginUserInfo: response.data, userPermission: userPermission, isOnlyForAgency: false,organization: response.organization }));
//               if (prevUrl === '/' || prevUrl === '/webadmin') {
//                 handleLoginRedirect(response.access_token, '', '/webadmin/dashboard');
//               } else {
//                 handleRefreshTokenRedirect(response.access_token, prevUrl);
//               }
//             } else if (response.data && response.data.userRoles && response.data.userRoles.roleName.toUpperCase() === 'CLIENT') {
//               let currentLocationId = response.data.locationID;
//               GlobalVariables.CurrentLocationId = currentLocationId;
//               dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, { errorMessage: null, currentLocationId: currentLocationId, access_token: response.access_token, loginUserInfo: response.data, isOnlyForAgency: false, organization: response.organization }));
//               if (prevUrl === '/') {
//                 handleLoginRedirect(response.access_token, '', '/client-dashboard');
//               } else {
//                 handleRefreshTokenRedirect(response.access_token, prevUrl);
//               }
//             } else {
//               let userPermission = response.userPermission;
//               let currentLocationId = response.data.staffLocation[0].locationID;
//               GlobalVariables.CurrentLocationId = currentLocationId;
//               dispatch(actionCreator(loginActionTypes.post_login.SUCCESS, { errorMessage: null, currentLocationId: currentLocationId, access_token: response.access_token, loginUserInfo: response.data, userPermission: userPermission, appConfigurations: response.appConfigurations, isOnlyForAgency: true, userLocationList: response.userLocations, organization: response.organization }));
//               if (prevUrl === '/') {
//                 handleLoginRedirect(response.access_token, '', '/dashboard');
//               } else {
//                 handleRefreshTokenRedirect(response.access_token, prevUrl);
//               }
//             }
//           } else {
//             dispatch(actionCreator(loginActionTypes.post_login.FAILURE, { errorMessage: null, currentLocationId: null, access_token: null, loginUserInfo: null, organization: null }));
//             handleLogoutRedirect('/login');
//           }
//         }).catch(function(error) {
//           let errorMessage = 'Oops, something went wrong, please try later';
//           dispatch(actionCreator(loginActionTypes.post_login.FAILURE, { errorMessage: errorMessage, access_token: null, loginUserInfo: null, organization: null }));
//           handleLogoutRedirect('/login');
//         });
//     };
//   }
  
//   export function forgotPasswordAction(authData, businessNameCheck, clearFields) {
//     return (dispatch) => {
//       if (clearFields === true) {
//         dispatch(actionCreator(loginActionTypes.post_forgotPassword.SUCCESS, { successMessage: null }));
//       } else {
//         dispatch(actionCreator(loginActionTypes.post_forgotPassword.REQUEST));
//         fetch(`${FORGOT_PASSWORD_API}`, {
//           method: 'post',
//           body: JSON.stringify(authData),
//           headers: {
//             'Content-Type': 'application/json',
//             'businessToken': businessNameCheck,
//             'Timezone': calculateLocalTimeZone(),
//             'IPAddress': GlobalVariables.IpAddress,
//           },
//         })
//           .then(checkHttpStatus)
//           .then(function(response) {
//             let message = response.message;
//             if (response.statusCode >= 200 && response.statusCode < 300) {
//               dispatch(actionCreator(loginActionTypes.post_forgotPassword.SUCCESS, { successMessage: message }));
//             } else {
//               dispatch(actionCreator(loginActionTypes.post_forgotPassword.FAILURE, { errorMessage: message }));
//             }
//           }).catch(function(error) {
//             // console.warn('error forgot password....', error);
//           });
//       }
      
//     };
//   }
  
//   export function ResetPasswordAction(authData, businessNameCheck) {
//     return (dispatch) => {
//       // // console.warn("checkBusinessName-----",businessNameCheck)
//       dispatch(actionCreator(loginActionTypes.post_resetPassword.REQUEST));
//       fetch(`${RESET_PASSWORD_API}`, {
//         method: 'post',
//         body: JSON.stringify(authData),
//         headers: {
//           'Content-Type': 'application/json',
//           'businessToken': businessNameCheck,
//           'Timezone': calculateLocalTimeZone(),
//           'IPAddress': GlobalVariables.IpAddress,
//         },
//       })
//         .then(checkHttpStatus)
//         .then(function(response) {
//           let message = response.message;
//           if (response.statusCode >= 200 && response.statusCode < 300) {
//             dispatch(actionCreator(loginActionTypes.post_resetPassword.SUCCESS, { successMessage: message }));
//             history.push('/');
//           } else {
//             dispatch(actionCreator(loginActionTypes.post_resetPassword.FAILURE, { errorMessage: message }));
//           }
//         }).catch(function(error) {
//           // console.warn('error reset password: ', error);
//         });
//     };
//   }
  
//   export const giveClickedModules = (clickedModules, activeTabFromList, removeAddTab) => {
//     return (dispatch) => {
//       dispatch(actionCreator(loginActionTypes.give_clicked_modules.REQUEST));
//       dispatch(actionCreator(loginActionTypes.give_clicked_modules.SUCCESS, { clickedModules: clickedModules, activeTabFromList: activeTabFromList, removeAddTab: removeAddTab }));
//     };
//   };
//   export const giveClickedClientName = (obj, removeAddClientTab) => {
//     return (dispatch) => {
//       dispatch(actionCreator(loginActionTypes.give_clicked_client_name.REQUEST));
//       dispatch(actionCreator(loginActionTypes.give_clicked_client_name.SUCCESS, { obj: obj, removeAddClientTab: removeAddClientTab ? removeAddClientTab : false }));
//     };
//   };
//   export const giveClickedTaskName = (obj, removeAddTab) => {
//     // // console.warn('task clicked name', obj);
//     return (dispatch) => {
//       dispatch(actionCreator(loginActionTypes.give_clicked_task_name.REQUEST));
//       dispatch(actionCreator(loginActionTypes.give_clicked_task_name.SUCCESS, { obj: obj, removeAddTab: removeAddTab }));
//     };
//   };
  
//   export const giveClickedPayerName = (obj, removeAddClientTab) => {
//     return (dispatch) => {
//       dispatch(actionCreator(loginActionTypes.give_clicked_payer_name.REQUEST));
//       dispatch(actionCreator(loginActionTypes.give_clicked_payer_name.SUCCESS, { obj: obj, removeAddClientTab: removeAddClientTab ? removeAddClientTab : false }));
//     };
//   };
  
//   export const giveClickedActiveTab = (obj) => {
//     // // console.warn('user clicked name', obj);
  
    
//     return (dispatch, getState) => {
//       let activeTabs = getState().login.give_clicked_module_tabs || [];
  
//       if ((obj.userKey || '').toLowerCase() === 'client') {
//         let activeTabObj = activeTabs.find((data) => (data.userKey || '').toLowerCase() === 'client' && data.userId === obj.userId);
//         if (activeTabObj) {
//           let objIndex = activeTabs.indexOf(activeTabObj);
//           activeTabs[objIndex] = obj;
//         } else {
//           activeTabs.push(obj);
//         }
//       } else if ((obj.userKey || '').toLowerCase() === 'user') {
//         let activeTabObj = activeTabs.find((data) => (data.userKey || '').toLowerCase() === 'user' && data.userId === obj.userId);
//         if (activeTabObj) {
          
//           let objIndex = activeTabs.indexOf(activeTabObj);
//           // console.warn(activeTabObj, objIndex)
//           activeTabs[objIndex] = obj;
//         } else {
//           activeTabs.push(obj);
//         }
//       } else if ((obj.userKey || '').toLowerCase() === 'appointment') {
//         let activeTabObj = activeTabs.find((data) => (data.userKey || '').toLowerCase() === 'appointment' && data.userId === obj.userId);
//         if (activeTabObj) {
//           let objIndex = activeTabs.indexOf(activeTabObj);
//           activeTabs[objIndex] = obj;
//         } else {
//           activeTabs.push(obj);
//         }
//       }
//       else if ((obj.userKey || '').toLowerCase() === 'payer') {
//         let activeTabObj = activeTabs.find((data) => (data.userKey || '').toLowerCase() === 'payer' && data.userId === obj.userId);
//         if (activeTabObj) {
//           let objIndex = activeTabs.indexOf(activeTabObj);
//           activeTabs[objIndex] = obj;
//         } else {
//           activeTabs.push(obj);
//         }
//       }
//       dispatch(actionCreator(loginActionTypes.give_clicked_active_tab.SUCCESS, activeTabs));
//     };
//   };
//   export const giveClickedUserName = (obj, removeAddUserTab) => {
//     // // console.warn('user clicked name', obj);
//     return (dispatch) => {
//       dispatch(actionCreator(loginActionTypes.give_clicked_user_name.REQUEST));
//       dispatch(actionCreator(loginActionTypes.give_clicked_user_name.SUCCESS, { obj: obj, removeAddUserTab: removeAddUserTab ? removeAddUserTab : false }));
//     };
//   };
//   export const closeLeftMenu = (value) => {
//     // // console.warn('user clicked name', obj);
//     return (dispatch) => {
//       dispatch(actionCreator(loginActionTypes.close_left_menu.REQUEST));
//       dispatch(actionCreator(loginActionTypes.close_left_menu.SUCCESS, value));
//     };
//   };
  
  
//   // localOrSessionStore.js
//   const { localStorage, sessionStorage } = global;
  
//   export default function localOrSessionStore({ key }) {
//     let shouldPersist = localStorage.getItem(key) === 't';
  
//     return {
//       setShouldPersist(persist) {
//         shouldPersist = !!persist;
//         if (persist) {
//           localStorage.setItem(key, 't');
//         } else {
//           localStorage.removeItem(key);
//         }
//       },
  
//       getItem(name) {
//         if (shouldPersist) {
//           return localStorage.getItem(name);
//         }
  
//         return sessionStorage.getItem(name);
//       },
  
//       setItem(name, value) {
//         if (shouldPersist) {
//           return localStorage.setItem(name, value);
//         }
  
//         return sessionStorage.setItem(name, value);
//       },
  
//       removeItem(name) {
//         if (shouldPersist) {
//           return localStorage.removeItem(name);
//         }
  
//         return sessionStorage.removeItem(name);
//       },
//     };
//   }
  