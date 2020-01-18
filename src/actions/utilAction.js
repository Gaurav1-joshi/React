import Alert from 'react-s-alert';
import history from '../history';
import moment from 'moment';
import momentTimeZone from 'moment-timezone';
import React from 'react';
// import base64 from 'base-64';
// import utf8 from 'utf8';
//export const API_URL = "http://localhost:61487"
//staging
export const API_URL = "http://75.126.168.31:9396"
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';
const SystemIpAddress = new Promise((r) => {
  var w = window, a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({ iceServers: [] }), b = () => { };
  a.createDataChannel('');
  a.createOffer((c) => a.setLocalDescription(c, b, b), b);
  a.onicecandidate = (c) => {
    try {
      c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r);
    }
    catch (e) {
      return null;
    }
  };
});
// export const base64Encode = (text) => {
//   let bytes = utf8.encode(text);
//   let encoded = base64.encode(bytes);
//   return encoded;
// };
// export const base64Decode = (encoded) => {

//   let bytes = base64.decode(encoded);
//   let text = utf8.decode(bytes);
//   return text;
// };
export function displayCustomError(fieldName, errorList) { //  Display error message for already exist field
  return errorList && errorList.length && errorList.some((err) => {
    return (err.statusCode === 409 && err.data.toUpperCase() === fieldName);
  }) ? <p>{errorList.map((err) => {
    if (err.statusCode === 409 && err.data.toUpperCase() === fieldName) {
      return `${err.message}`;
    }
    return `${err.message}`;
  })}</p> : undefined;
}
export function GlobalVariables() {
  constructor();
  this.PageSize = 10;
  this.IpAddress = 1;
  this.CurrentLocationId = 0;
}

SystemIpAddress.then(function(value) {
  GlobalVariables.IpAddress = value;
}).catch((e) => {
  return null;
});

export function createRequestActionTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((requestTypes, type) => {
    requestTypes[type] = `${base}_${type}`;
    return requestTypes;
  }, {});
}

// export function calculateTimeZone() {
//   let TZ = /\((.*)\)/.exec(new Date().toString());
//   let TimeZone = '';
//   if (TZ.length > 0)
//     TimeZone = TZ[1];

//   return TimeZone;
// };

export const jsonApiHeader = (accessToken, ContentType, businessNameCheck) => {

  return {
    'businessToken': businessNameCheck ? businessNameCheck : null,
    'Content-Type': ContentType ? ContentType : 'application/vnd.api+json',
    'Authorization': accessToken ? `Bearer ${accessToken}` : '',
    'Timezone': calculateLocalTimeZone(),
    'IPAddress': GlobalVariables.IpAddress,
    'LocationID': GlobalVariables.CurrentLocationId ? GlobalVariables.CurrentLocationId : 0,
  };
};

export function actionCreator(actionType, data) {
  return {
    type: actionType,
    payload: data,
  };
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 204) {
    return response.json();
  } else if (response.status === 204) {
    return true;
  } else if (response.status >= 400 && response.status < 500) {
    return response.json();
  } else {
    var error = new Error(response.statusText);
    error.response = response;

    throw error;
  }
}

export const create_post_data = (type, data) => {
  delete data.id;
  let postData = JSON.stringify({
    data: {
      type: type,
      attributes: data,
    },
  });

  return postData;
};

// generic method for createSearchUrl
export const createMultiSearchUrlScheduling = (urlObj, newSearchObj) => {
  let query_params = `?page[number]=${urlObj.page_number ? urlObj.page_number : 1}`;
  let x = '?include=patient,appointmenttype,appointmentstaff,patientencounter';
  if (urlObj.filters && urlObj.filters !== null) {
    let filters = urlObj.filters;
    for (const key of Object.keys(filters)) {
      query_params = query_params + `&filter[${key}]=${filters[key]}`;
    }
  }
  if (Object.values(newSearchObj) !== '') {
    let filters = newSearchObj;
    for (const key of Object.keys(filters)) {
      x += `&filter[${key}]=${filters[key]}`;
    }
  }
  return x;
};

// generic method for createSearchUrl

export const createSearchUrlScheduling = (urlObj) => {
  let query_params = `?locationIds=${urlObj.filters['locationIds'] ? urlObj.filters['locationIds'] : ''}`;
  if (urlObj.filters && urlObj.filters !== null) {
    let filters = urlObj.filters;
    for (const key of Object.keys(filters)) {
      if (key !== 'locationIds') {
        query_params += `&${key}=${filters[key]}`;
      }
    }
  }

  return query_params;
};


export const createSearchUrlWithoutPageNumberAndSize = (urlObj) => {
  let query_params = '';
  if (urlObj.sort_fields) {
    if (query_params === '')
      query_params += `?sort=${urlObj.sort_fields}`;
    else
      query_params += `&sort=${urlObj.sort_fields}`;
  }
  if (urlObj.filters && urlObj.filters !== null) {
    let filters = urlObj.filters;
    for (const key of Object.keys(filters)) {
      if (filters[key]) {
        if (query_params === '')
          query_params += `?filter[${key}]=${filters[key]}`;
        else
          query_params += `&filter[${key}]=${filters[key]}`;
      }
    }
  }
  if (urlObj.contain_filters && urlObj.contain_filters !== null) {
    let containfilters = urlObj.contain_filters;
    for (const key of Object.keys(containfilters)) {
      if (containfilters[key]) {
        if (query_params === '')
          query_params += `?filter[${key}]=like:${containfilters[key]}`;
        else
          query_params += `&filter[${key}]=like:${containfilters[key]}`;
      }
    }
  } if (urlObj.includes && urlObj.includes !== null) {
    query_params += `&${urlObj.includes}`;
  }
  return query_params;
};

export const createSearchUrlEncounter = (urlObj) => {
  let query_params = `?page[number]=${urlObj.page_number ? urlObj.page_number : 1}`;
  if (urlObj.sort_fields) {
    query_params += `&sort=${urlObj.sort_fields}`;
  }
  if (urlObj.filters && urlObj.filters !== null) {
    let filters = urlObj.filters;
    for (const key of Object.keys(filters)) {
      if (filters[key])
        query_params += `&filter[${key}]=${filters[key]}`;
    }
  }
  if (urlObj.contain_filters && urlObj.contain_filters !== null) {
    let containfilters = urlObj.contain_filters;
    for (const key of Object.keys(containfilters)) {
      if (containfilters[key])
        query_params += `&filter[${key}]=like:${containfilters[key]}`;
    }
  }
  if (urlObj.includes && urlObj.includes !== null) {
    query_params += `&${urlObj.includes}`;
  }
  query_params += '&page[size]=' + GlobalVariables.PageSize ? GlobalVariables.PageSize : 10;
  return query_params;
};

export const createSearchUrl = (urlObj) => {
  let query_params = `?page[number]=${urlObj.page_number ? urlObj.page_number : 1}`;
  if (urlObj.sort_fields) {
    query_params += `&sort=${urlObj.sort_fields}`;
  }
  if (urlObj.filters && urlObj.filters !== null) {
    let filters = urlObj.filters;
    for (const key of Object.keys(filters)) {
      if (filters[key] || filters[key] === false)
        query_params += `&filter[${key}]=${filters[key]}`;
    }
  }
  if (urlObj.contain_filters && urlObj.contain_filters !== null) {
    let containfilters = urlObj.contain_filters;
    for (const key of Object.keys(containfilters)) {
      if (containfilters[key])
        query_params += `&filter[${key}]=like:${containfilters[key]}`;
    }
  }
  if (urlObj.includes && urlObj.includes !== null) {
    query_params += `&${urlObj.includes}`;
  }
  query_params += `&page[size]=${urlObj.page_size ? urlObj.page_size : GlobalVariables.PageSize ? GlobalVariables.PageSize : 10}`;
  return query_params;
};


export const createSearchUrlForCustomAPI = (urlObj) => {

  let query_params = `?pageNumber=${urlObj.pageNumber ? urlObj.pageNumber : 1}`;
  query_params += `&pageSize=${urlObj.pageSize ? urlObj.pageSize : GlobalVariables.PageSize ? GlobalVariables.PageSize : 10}`;
  if (urlObj.filters && urlObj.filters !== null) {
    let filters = urlObj.filters;
    for (const key of Object.keys(filters)) {
      if (filters[key])
        query_params += `&${key}=${filters[key]}`;
    }
  }
  if (urlObj.contain_filters && urlObj.contain_filters !== null) {
    let containfilters = urlObj.contain_filters;
    for (const key of Object.keys(containfilters)) {
      if (containfilters[key] && containfilters[key] !== '')
        query_params += `&${key}=${containfilters[key]}`;
    }
  }
  if (urlObj.includes && urlObj.includes !== null) {
    query_params += `&${urlObj.includes}`;
  }

  if (urlObj.sort_fields) {
    query_params += `&sortColumn=${urlObj.sort_fields}`;
  }

  if (urlObj.sortColumn) {
    query_params += `&sortColumn=${urlObj.sortColumn}`;
  }

  if (urlObj.sort_order) {
    query_params += `&sortOrder=${urlObj.sort_order}`;
  }

  if (urlObj.sortOrder) {
    query_params += `&sortOrder=${urlObj.sortOrder}`;
  }


  return query_params;
};


export const createQueryParametersForCustomAPI = (urlObj) => {
  let query_params = `?PageNo=${urlObj.PageNo ? urlObj.PageNo : 1}`;
  query_params += `&PageSize=${urlObj.PageSize ? urlObj.PageSize : GlobalVariables.PageSize ? GlobalVariables.PageSize : 10}`;

  for (const key of Object.keys(urlObj)) {
    if ((urlObj[key] || typeof urlObj[key] === 'boolean') && key !== 'filters' && key !== 'PageNo' && key !== 'PageSize') {
      query_params += `&${key}=${urlObj[key]}`;
    } else if (key === 'filters') {
      if (urlObj.filters && urlObj.filters !== null) {
        let filters = urlObj.filters;
        for (const k of Object.keys(filters)) {
          if (filters[k]) {
            query_params += `&${k}=${filters[k]}`;
          }
        }
      }
    }
  }
  return query_params;
};

export const createQueryParametersForNpiRegistry = (urlObj) => {
  let query_params = `?number=${urlObj.number ? urlObj.number : 1}`;

  for (const key of Object.keys(urlObj)) {
    if ((urlObj[key] || typeof urlObj[key] === 'boolean') && key !== 'number') {
      query_params += `&${key}=${urlObj[key]}`;
    } else if (key === 'filters') {
      if (urlObj.filters && urlObj.filters !== null) {
        let filters = urlObj.filters;
        for (const k of Object.keys(filters)) {
          if (filters[k]) {
            query_params += `&${k}=${filters[k]}`;
          }
        }
      }
    }
  }
  return query_params;
};


export const createQueryParametersForCustomFields = (urlObj) => {
  let query_params = '';

  for (const key of Object.keys(urlObj)) {
    if ((urlObj[key] || typeof urlObj[key] === 'boolean') && key !== 'filters') {
      query_params += `?${key}=${urlObj[key]}`;
    } else {
      if (urlObj.filters && urlObj.filters !== null) {
        let filters = urlObj.filters;
        for (const key of Object.keys(filters)) {
          if (filters[key]) {
            query_params += `?${key}=${filters[key]}`;
          }
        }
      }
    }
  }
  return query_params;
};

export function isEmptyObject(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

// generic method for capitalize
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// generic method to calculate years based on DOB
export const calculateAge = (fromdate) => {
  let todate = new Date();

  var age = [],
    fromdateNew = new Date(fromdate),
    y = [todate.getFullYear(), fromdateNew.getFullYear()],
    ydiff = y[0] - y[1],
    m = [todate.getMonth(), fromdateNew.getMonth()],
    mdiff = m[0] - m[1],

    d = [todate.getDate(), fromdateNew.getDate()],
    ddiff = d[0] - d[1];
  if (ddiff < 0) {
    fromdateNew.setMonth(m[1] + 1, 0);
    ddiff = fromdateNew.getDate() - d[1] + d[0];
    --mdiff;
  }
  if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) --ydiff;
  if (mdiff < 0) mdiff += 12;
  if (ydiff > 0) {
    age.push(ydiff + 'y' + mdiff + 'm');
  } else if (mdiff > 0) {
    age.push(mdiff + ' month' + (mdiff > 1 ? 's' : ' '));
  } else if (ddiff >= 0) {
    age.push((ddiff ? ddiff : 1) + ' day' + (ddiff > 1 ? 's' : ''));
  }

  return age.join('');
};
// generic method to calculate years between DOB and DOJ
export const calculateYears = (fromdate, todate1) => {
  let todate = new Date(todate1);
  var age = [],
    fromdateNew = new Date(fromdate),
    y = [todate.getFullYear(), fromdateNew.getFullYear()],
    ydiff = y[0] - y[1],
    m = [todate.getMonth(), fromdateNew.getMonth()],
    mdiff = m[0] - m[1],

    d = [todate.getDate(), fromdateNew.getDate()],
    ddiff = d[0] - d[1];
  if (ddiff < 0) {
    fromdateNew.setMonth(m[1] + 1, 0);
    ddiff = fromdateNew.getDate() - d[1] + d[0];
    --mdiff;
  }
  if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) --ydiff;
  if (mdiff < 0) mdiff += 12;
  if (ydiff > 0) {
    age.push(ydiff + 'y ' + mdiff + 'm');
  } else if (mdiff > 0) {
    age.push(mdiff + ' month' + (mdiff > 1 ? 's' : ' '));
  } else if (ddiff >= 0) {
    age.push((ddiff ? ddiff : 1) + ' day' + (ddiff > 1 ? 's' : ''));
  }

  return age.join('');
};
// generic method for format date in application
export const formatDate = (date) => {
  return moment(date).format('MM/DD/YYYY');
};


// Generic method for success message

export const showSuccessMessage = (message, timeout) => {
  Alert.success(message, {
    position: 'bottom-right',
    effect: 'slide',
    timeout: 2000,

  });
};
// Generic method for error message

export const showErrorMessage = (message, timeout) => {
  Alert.error(message, {
    position: 'bottom-right',
    effect: 'slide',
    timeout: timeout ? timeout : 2000,
  });
};
// Generic method for warning message
export const showWarningMessage = (message, timeout) => {
  Alert.warning(message, {
    position: 'bottom-right',
    effect: 'slide',
    timeout: timeout ? timeout : 2000,
  });
};

// customize alert message for warnings...
export const alertWarning = (message, configObj) => {
  // set default config...
  let alertConfigurations = {
    position: 'bottom-right',
    effect: 'slide',
    timeout: 10000,
  };
  if (configObj) {
    let { timeout, defaultButton, customButtons } = configObj;
    alertConfigurations['timeout'] = timeout ? timeout : alertConfigurations.timeout;
    if (defaultButton) {
      alertConfigurations['customFields'] = {
        displayComponent: true,
        handleButtonClick: defaultButton.handleClick,
        id: defaultButton.param,
      };
    }
    if (customButtons) {
      alertConfigurations['customFields'] = {
        displayComponent: true,
        customButtons: customButtons,
      };
    }
  }
  Alert.warning(message, alertConfigurations);
};

// Generic method for to extract included data based on type and id

export function extractDataFromObject(type, myArray, id) {
  if (myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].type === type && parseInt(myArray[i].id, 10) === parseInt(id, 10)) {
        return myArray[i].attributes;
      }
    }
  }
}
// Generic method for to extract included  simillar-type-data based on type

export function extractTypeFromObject(type, myArray) {
  let returnArr = [];
  if (myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].type === type) {
        returnArr.push(myArray[i]);
      }
    }
    return returnArr;
  }
}
// Generic method for to extract name based on id

export function extractNameFromArray(myArray, id) {
  let returnName = '';
  if (myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (parseInt(myArray[i].id, 10) === parseInt(id, 10)) {
        returnName = myArray[i].value;
      }
    }
    return returnName;
  }
}


export function extractDataFromArray(myArray, id) {
  let returnobj = {};
  if (myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (parseInt(myArray[i].id, 10) === parseInt(id, 10)) {
        returnobj = myArray[i];
      }
    }
    return returnobj;
  }
}

export function extractDataFromArrayByValue(myArray, value) {
  let returnobj = null;
  if (myArray) {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].value.toUpperCase() === value.toUpperCase() || (myArray[i].stateAbbr && myArray[i].stateAbbr.toUpperCase() === value.toUpperCase())) {
        returnobj = myArray[i];
      }
    }
    return returnobj;
  }
}

/**
 * [handleRefreshTokenRedirect - on page refresh redirect to current page]
 * @param {*} token
 * @param {*} authData
 */
export function handleRefreshTokenRedirect(token, urlPath) {
  localStorage.setItem('access_token', token);
  history.push(urlPath);
}

/**
 * [handleLoginRedirect - on login redirect to dashboard page]
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
export function handleLoginRedirect(token, authData, targetUrl) {
  localStorage.setItem('access_token', token);
  history.push(targetUrl);
}
/**
 * [handleFirstLoginAfterSignUp - a method built that will redirect to 1 secuirty question on every login untill the machine is new or local storage is empty]
 *
 * @param {*} response
 * @param {*} authData
 */
export function handleFirstLoginAfterSignUp(response, authData) {
  history.push({ pathname: '/question', state: { response: response, authData: authData } });
}

/**
 *  [handleSecurityQuestionRedirect - a method built that will redirect to 3 secuirty questions on first login after signup]
 * @param {*} response
 * @param {*} authData
 */

export function handleSecurityQuestionRedirect(response, authData) {
  //
  history.push({ pathname: '/security-questions', state: { response: response, authData: authData } });
}


/**
 * [handleLogoutRedirect - on logout redirect to login page]
 * @return {[type]} [description]
 */
export function handleLogoutRedirect(targetUrl) {
  localStorage.removeItem('access_token');
  history.push(targetUrl);
}

/**
 * [parseJSON - parse JSON value]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
export function parseJSON(response) {
  return response.data;
}

// please everyone display date on view using this function.
export function showFormatedDate(date) {
  // return moment(date).format('MMM DD, YYYY');
  return moment(date).format('MM/DD/YYYY');
}


// please everyone display date on view using this function.
export function showFormatedDateandTime(date) {
  return moment(date).format('MM/DD/YYYY hh:mm a');
}
export function showFormatedDateandTimewithsec(date) {
  return moment(date).format('MM/DD/YYYY hh:mm:ss a');
}

export function showFormatedTime(date) {
  return moment(date).format('hh:mm a');
}

export const showFormattedStartEndWeek = (startDate, endDate) => {
  if (startDate && endDate) {

    if (moment(startDate).isSame(endDate, 'month'))
      return `${moment(startDate).format('MMM DD')} - ${moment(endDate).format('DD')} , ${moment(endDate).format('YYYY')}`;
    else if (moment(startDate).isSame(endDate, 'year'))
      return `${moment(startDate).format('MMM DD')} - ${moment(endDate).format('MMM DD')} , ${moment(endDate).format('YYYY')}`;
    else
      return `${moment(startDate).format('MMM DD')} - ${moment(endDate).format('MMM DD')} , ${moment(startDate).format('YYYY')} - ${moment(endDate).format('YYYY')}`;
  } else
    return null;
};

var abbrs = {
  EST: 'Eastern Standard Time',
  EDT: 'Eastern Standard Time',
  CST: 'Central Standard Time',
  CDT: 'Central Standard Time',
  MST: 'Mountain Standard Time',
  MDT: 'Mountain Standard Time',
  PST: 'Pacific Standard Time',
  PDT: 'Pacific Standard Time',
  IST: 'India Standard Time',
  AKST: 'Alaska Standard Time',
  WET: 'Western European Time',
  CET: 'Central European Time',
};

export function calculateLocalTimeZone() {

  let abbr = moment.tz(new Date(), momentTimeZone.tz.guess()).format('z');
  let timeZone = abbrs[abbr] || abbr;
  return timeZone;
}

export function resetFiltersAndSorting(filter, sortColumn, isCustomFilter) {

  if (isCustomFilter) {
    filter.sort_Column = sortColumn;
    filter.sort_Order = 'desc';
  } else {
    filter.sort_Column = '-' + sortColumn;
  }

  filter.searchText = '';
  // Reset Sorting
  let TblSort = document.getElementsByClassName('Tblsort');
  for (let i = 0;i < TblSort.length;i++) {
    TblSort[i].className = 'Tblsort sorting';
  }
}
export const normalizeDecimal = (value, previousValue) => {

  const onlyNums = value.replace(/[^.\d]/g, '');

  if (((onlyNums || '').match(/\./g) || []).length > 1) {
    return previousValue;
  }
  if (value && value === previousValue) {
    return parseFloat(onlyNums || 0).toFixed(2);
  }
  return onlyNums;
};
/**
 * date: 18-12-2017
 * standard method designed to display rate in proper format
 */
export function showNormalizedRate(rate) {
  if (rate) {
    let onlyNumRate = '';
    let indexOfDot = rate.toString().indexOf('.');
    if (indexOfDot !== -1) {
      if (indexOfDot === 0) {
        onlyNumRate = rate.toString().slice(1);
      } else {
        onlyNumRate = rate.toString().slice(0, indexOfDot) + rate.toString().slice(indexOfDot + 1);
      }
    } else onlyNumRate = rate.toString();
    if (onlyNumRate.length > 0) {
      if (onlyNumRate.length === 1) {
        return '0' + onlyNumRate + '.00';
      } else if (onlyNumRate.length === 2) {
        if (indexOfDot !== -1) {
          return '0' + onlyNumRate[0] + '.' + onlyNumRate[1] + '0';
        } else {
          return onlyNumRate + '.00';
        }
      } else if (onlyNumRate.length === 3) {
        if (indexOfDot === onlyNumRate.length - 1) {
          return onlyNumRate.slice(0, 2) + '.' + onlyNumRate.slice(2) + '0';
        } else if (indexOfDot !== -1) {
          return '0' + onlyNumRate.slice(0, 1) + '.' + onlyNumRate.slice(1);
        } else {
          return onlyNumRate + '.00';
        }

      } else if (onlyNumRate.length === 4) {
        if (indexOfDot !== -1) {
          if (indexOfDot === 3)
            return onlyNumRate.slice(0, indexOfDot) + '.' + onlyNumRate.slice(indexOfDot) + '0';
          else
            return onlyNumRate.slice(0, indexOfDot) + '.' + onlyNumRate.slice(indexOfDot);
        } else {
          return onlyNumRate + '.00';
        }

      } else if (onlyNumRate.length > 4) {
        if (indexOfDot !== -1) {
          if (indexOfDot === onlyNumRate.length - 1) {
            return onlyNumRate.slice(0, indexOfDot) + '.' + onlyNumRate.slice(indexOfDot) + '0';
          } else
            return onlyNumRate.slice(0, indexOfDot) + '.' + onlyNumRate.slice(indexOfDot);
        } else {
          return onlyNumRate + '.00';
        }

      }
    } else {
      return onlyNumRate;
    }
  } else {
    return '00.00'
  }
}


export const downloadFilesOnAPICallForCCDA = (blob) => {
  var newBlob = new Blob([blob], { type: 'application/xml' });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }
  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  link.href = data;
  link.download = 'CCDA.zip';
  link.click();
  setTimeout(function() {
    window.URL.revokeObjectURL(data);
  }, 100);
};
export const downloadFileOnAPICallForEDI = (blob) => {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([blob], { type: 'text/plain' });
  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }
  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  document.body.appendChild(link);
  link.href = data;
  link.download = 'EDI.txt';
  link.click();
  setTimeout(function () {
    // For Firefox it is necessary to delay revoking the ObjectURL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(data);
  }, 100);
};
export const downloadFilesOnAPICall = (blob, claimId) => {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  var newBlob = new Blob([blob], { type: 'application/pdf' });
  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }
  // For other browsers:
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  document.body.appendChild(link);
  link.href = data;
  link.download = claimId === 'Batch' ? 'Batch_PaperClaim' : `CL${claimId}_PaperClaim`;
  // link.download = 'form1500.pdf';
  link.click();
  setTimeout(function () {
    // For Firefox it is necessary to delay revoking the ObjectURL
    document.body.removeChild(link);
    window.URL.revokeObjectURL(data);
  }, 100);
};
export const downloaduploadedDocumentsOnAPICall = (blob, fileName) => {
  // let type = blob.type.split('/').pop().toLowerCase();
  // let file = fileName;
  
  var newBlob = new Blob([blob], { type: `${blob.type}` });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(newBlob);
    return;
  }
  const data = window.URL.createObjectURL(newBlob);
  var link = document.createElement('a');
  document.body.appendChild(link);
  link.href = data;
  link.download = fileName;
  link.click();
  setTimeout(function() {
    document.body.removeChild(link);
    window.URL.revokeObjectURL(data);
  }, 100);
};
export function showFormattedTime(dateTime) {
  return moment(dateTime).format('MM/DD/YYYY hh:mm a');
}
export const DiamondShape = (props) => {
  let { cx, cy } = props;
  if (cy !== null) {
    return (
      <svg
        x={cx - 2}
        y={cy - 7}
        width={30}
        height={30}
        fill = {props.color}
        stroke= {props.color}
        viewBox="0 0 1024 1024">
        <g>
          <path d="M256,0L59.83,256L256,512l196.171-256L256,0z M255.999,462.677L97.624,256L256,49.323L414.374,256L255.999,462.677z"/>
        </g>
      </svg>
    );
  } else {
    return false;
  }


};
export const TriangleShape = (props) => {
  let { cx, cy } = props;
  if (cy !== null) {
    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        width={200}
        height={200}
        viewBox="0 0 1024 1024"
        fill = {props.color}
        stroke= {props.color}>
        <path d="M137.333,113.866H0l68.667-90.398L137.333,113.866z M12.029,107.899h113.275L68.667,33.325L12.029,107.899z"/>
      </svg>
    );
  } else {
    return false;
  }
};
export const CubeShape = (props) => {
  let { cx, cy } = props;
  if (cy !== null) {
    return (
      <svg x={cx - 2}
        y={cy - 3}
        width={200}
        height={200}
        viewBox="0 0 1024 1024"
        fill = {props.color}
        stroke= {props.color}
      >

        <g>
          <path d="M5.206,19.956l0.199,42.771c0.003,0.55,0.306,1.054,0.789,1.314l34.161,17.887c0.223,0.119,0.467,0.179,0.711,0.179c0.001,0,0.002,0,0.003,0c0.103,0.117,0.218,0.227,0.355,0.309c0.236,0.141,0.502,0.212,0.769,0.212c0.246,0,0.49-0.061,0.712-0.181l33.729-18.292c0.484-0.263,0.787-0.77,0.787-1.319v-44.5c0-0.013-0.005-0.025-0.005-0.039c-0.001-0.011,0.003-0.021,0.003-0.033c-0.002-0.043-0.019-0.082-0.022-0.124c-0.013-0.082-0.022-0.164-0.047-0.243c-0.018-0.055-0.041-0.104-0.064-0.157c-0.031-0.07-0.062-0.139-0.104-0.203c-0.031-0.05-0.068-0.095-0.105-0.141c-0.047-0.058-0.096-0.112-0.152-0.163c-0.044-0.04-0.091-0.076-0.141-0.111c-0.032-0.022-0.059-0.053-0.094-0.073c-0.032-0.02-0.069-0.028-0.104-0.045c-0.029-0.015-0.052-0.036-0.081-0.049L41.747,0.118c-0.405-0.171-0.864-0.155-1.258,0.042L6.131,18.071c-0.504,0.254-0.822,0.77-0.825,1.333c0,0.009,0.004,0.017,0.004,0.025C5.249,19.596,5.205,19.772,5.206,19.956zM72.456,18.501l-30.28,16.93L10.111,19.425L41.218,3.151L72.456,18.501z M43.692,78.61V38.021l30.729-17.173v41.09L43.692,78.61z"
          />
        </g>

      </svg>);
  } else {
    return false;
  }
};
export const RectangleShape = (props) => {
  let { cx, cy } = props;
  if (cy !== null) {
    return (


      <svg x={cx - 10}
        y={cy - 10}
        width={30}
        height={30}
        fill = {props.color}
        stroke= {props.color}
        viewBox="0 0 1024 1024"
      >
        <g>
          <g>
            <path d="M501.333,0H10.667C4.779,0,0,4.779,0,10.667v490.667C0,507.221,4.779,512,10.667,512h490.667c5.888,0,10.667-4.779,10.667-10.667V10.667C512,4.779,507.221,0,501.333,0z M490.667,490.667H21.333V21.333h469.333V490.667z"/>
          </g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
        <g>
        </g>
      </svg>
    );
  } else {
    return false;
  }
};
export const PolygonShape = (props) => {
  let { cx, cy } = props;
  if (cy !== null) {
    return (
      <svg
        x={cx - 10}
        y={cy - 10}
        width={20}
        height={20}
        viewBox="0 0 1024 1024"
        fill = {props.color}
        stroke= {props.color}>
        <path d="M59.662,26.042L30.701,0.458c-0.377-0.332-0.94-0.334-1.319-0.004L0.343,25.79c-0.306,0.267-0.42,0.692-0.289,1.076l11,32.249c0.138,0.405,0.519,0.677,0.946,0.677h35.954c0.427,0,0.806-0.271,0.945-0.674l11.046-32C60.077,26.735,59.966,26.311,59.662,26.042z"/>
      </svg>
    );
  } else {
    return false;
  }
};
export const catchMessage = () => {
  return showErrorMessage('Oops, something went wrong, please try later');
  
}
export const alertConfirmation = (message, configObj) => {
  // set default config...
  let alertConfigurations = {
    position: 'bottom-right',
    effect: 'slide',
    timeout: 10000,
  };
  if (configObj) {
    let { customButtons, ...props } = configObj;
    let customFields = {};
    if (customButtons) {
      customFields = {
        displayComponent: true,
        customButtons: customButtons,
      };
    }
    alertConfigurations = {
      customFields,
      ...alertConfigurations,
      ...props,
    };
  }
  Alert.closeAll();
  Alert.warning(message, alertConfigurations);
};

